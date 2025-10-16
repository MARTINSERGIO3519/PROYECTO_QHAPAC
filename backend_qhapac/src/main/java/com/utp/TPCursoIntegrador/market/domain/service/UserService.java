package com.utp.TPCursoIntegrador.market.domain.service;

import com.utp.TPCursoIntegrador.market.domain.dto.UserDTO;
import com.utp.TPCursoIntegrador.market.domain.repository.UserRepository;
import com.utp.TPCursoIntegrador.market.persistance.entity.Users;
import com.utp.TPCursoIntegrador.market.persistance.mapper.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public UserService(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public List<UserDTO> getAll() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<UserDTO> getById(Integer id) {
        return userRepository.findById(id).map(userMapper::toDTO);
    }

    /**
     * Guardar o actualizar usuario.
     * - Si es nuevo (idUsuario == null): encripta la contraseña.
     * - Si es existente: solo encripta si la contraseña fue cambiada.
     */
    public UserDTO save(UserDTO dto) {
        Users user = userMapper.toEntity(dto);

        Integer idUsuario = user.getIdUsuario(); // usa el getter correcto

        if (idUsuario == null) {
            // Nuevo usuario → siempre encriptamos la contraseña que vienen en texto plano
            String raw = user.getContrasena();
            if (raw != null && !raw.isEmpty()) {
                user.setContrasena(passwordEncoder.encode(raw));
            }
        } else {
            // Usuario existente → revisamos la contraseña actual en BD
            userRepository.findById(idUsuario).ifPresent(existing -> {
                String nuevaContrasena = user.getContrasena();
                String hashExistente = existing.getContrasena();

                if (nuevaContrasena == null || nuevaContrasena.isEmpty()) {
                    // No se envió contraseña nueva → mantener la actual
                    user.setContrasena(hashExistente);
                } else if (nuevaContrasena.equals(hashExistente)) {
                    // El DTO trae exactamente el hash existente → mantenerlo
                    user.setContrasena(hashExistente);
                } else if (passwordEncoder.matches(nuevaContrasena, hashExistente)) {
                    // El DTO trajo la misma contraseña en texto plano que ya está guardada → mantener el hash
                    user.setContrasena(hashExistente);
                } else {
                    // Contraseña realmente nueva en texto plano → encriptar y guardar
                    user.setContrasena(passwordEncoder.encode(nuevaContrasena));
                }
            });
        }

        return userMapper.toDTO(userRepository.save(user));
    }

    public void delete(Integer id) {
        userRepository.deleteById(id);
    }

    // Login con comparación segura usando PasswordEncoder
    public boolean login(String correo, String contrasena) {
        return userRepository.findByCorreo(correo)
                .map(user -> passwordEncoder.matches(contrasena, user.getContrasena()))
                .orElse(false);
    }

    //Recuperar contraseña
    public String generarContrasenaTemporal(int longitud) {
        final String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < longitud; i++) {
            int index = random.nextInt(chars.length());
            sb.append(chars.charAt(index));
        }

        return sb.toString();
    }

    public Optional<String> recuperarContrasena(String correo) {
        return userRepository.findByCorreo(correo).map(user -> {
            // generar temporal
            String temporal = generarContrasenaTemporal(8);
            // encriptar y guardar
            user.setContrasena(passwordEncoder.encode(temporal));
            userRepository.save(user);
            // devolver la temporal para que el controlador la envíe por correo
            return temporal;
        });
    }
}
