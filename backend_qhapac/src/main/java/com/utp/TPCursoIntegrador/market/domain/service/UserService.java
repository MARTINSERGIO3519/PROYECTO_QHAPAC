package com.utp.TPCursoIntegrador.market.domain.service;

import com.google.common.hash.Hashing; // Guava se usa para generar hash SHA-256
import com.utp.TPCursoIntegrador.market.domain.dto.UserDTO;
import com.utp.TPCursoIntegrador.market.domain.repository.UserRepository;
import com.utp.TPCursoIntegrador.market.persistance.entity.Users;
import com.utp.TPCursoIntegrador.market.persistance.mapper.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public UserService(UserRepository userRepository, UserMapper userMapper,
                       PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    // Listar todos los usuarios
    public List<UserDTO> getAll() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Buscar usuario por id
    public Optional<UserDTO> getById(Integer id) {
        return userRepository.findById(id).map(userMapper::toDTO);
    }

    // Guardar o actualizar usuario (contraseña con PasswordEncoder)
    public UserDTO save(UserDTO dto) {
        Users user = userMapper.toEntity(dto);
        Integer idUsuario = user.getIdUsuario();

        if (idUsuario == null) {
            // nuevo usuario: encriptamos la contraseña con PasswordEncoder
            String raw = user.getContrasena();
            if (raw != null && !raw.isEmpty()) {
                user.setContrasena(passwordEncoder.encode(raw));
            }
        } else {
            // actualización: mantenemos hash existente si no cambia
            userRepository.findById(idUsuario).ifPresent(existing -> {
                String nuevaContrasena = user.getContrasena();
                String hashExistente = existing.getContrasena();

                if (nuevaContrasena == null || nuevaContrasena.isEmpty()) {
                    user.setContrasena(hashExistente);
                } else if (nuevaContrasena.equals(hashExistente)) {
                    user.setContrasena(hashExistente);
                } else if (passwordEncoder.matches(nuevaContrasena, hashExistente)) {
                    user.setContrasena(hashExistente);
                } else {
                    user.setContrasena(passwordEncoder.encode(nuevaContrasena));
                }
            });
        }

        return userMapper.toDTO(userRepository.save(user));
    }

    // Eliminar usuario
    public void delete(Integer id) {
        userRepository.deleteById(id);
    }

    // Login: validación de contraseña con PasswordEncoder
    public boolean login(String correo, String contrasena) {
        return userRepository.findByCorreo(correo)
                .map(user -> passwordEncoder.matches(contrasena, user.getContrasena()))
                .orElse(false);
    }

    // Generar contraseña temporal aleatoria (para código temporal o recuperación)
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

    // Generar código temporal y guardarlo en BD con hash Guava + expiración
    public Optional<String> generarCodigoTemporal(String correo) {
        return userRepository.findByCorreo(correo).map(user -> {
            String codigo = generarContrasenaTemporal(8);

            // Uso de Guava para crear hash SHA-256 del código temporal
            String hashCodigo = Hashing.sha256()
                    .hashString(codigo, StandardCharsets.UTF_8)
                    .toString();

            user.setCodigoTemporal(hashCodigo); // guardamos hash en BD
            user.setFechaExpiraCodigo(LocalDateTime.now().plusMinutes(15)); // expiración en 15 min
            userRepository.save(user);

            return codigo; // retornamos el código sin hash para enviar por correo
        });
    }

    // Cambiar contraseña usando código temporal
    public boolean cambiarContrasenaConCodigo(String correo, String codigo, String nuevaContrasena) {
        Optional<Users> optUser = userRepository.findByCorreo(correo);
        if (optUser.isEmpty()) return false;

        Users user = optUser.get();

        // Validar expiración del código temporal
        if (user.getFechaExpiraCodigo() == null || user.getFechaExpiraCodigo().isBefore(LocalDateTime.now())) {
            return false;
        }

        // Validar código temporal comparando hash con Guava
        String hashCodigo = Hashing.sha256()
                .hashString(codigo, StandardCharsets.UTF_8)
                .toString();

        if (!hashCodigo.equals(user.getCodigoTemporal())) {
            return false;
        }

        // Actualizar contraseña real (PasswordEncoder) y limpiar código temporal
        user.setContrasena(passwordEncoder.encode(nuevaContrasena));
        user.setCodigoTemporal(null);
        user.setFechaExpiraCodigo(null);
        userRepository.save(user);

        return true;
    }
}

