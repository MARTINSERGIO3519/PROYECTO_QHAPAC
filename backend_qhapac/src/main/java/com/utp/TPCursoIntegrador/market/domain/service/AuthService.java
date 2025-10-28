package com.utp.TPCursoIntegrador.market.domain.service;

import com.utp.TPCursoIntegrador.market.domain.dto.LoginDTO;
import com.utp.TPCursoIntegrador.market.domain.dto.LoginResponseDTO;
import com.utp.TPCursoIntegrador.market.persistence.entity.Credenciales;
import com.utp.TPCursoIntegrador.market.persistence.entity.Usuario;
import com.utp.TPCursoIntegrador.market.domain.repository.CredencialesRepository;
import com.utp.TPCursoIntegrador.market.domain.repository.UsuarioRepository;
import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Service
public class AuthService {

    private final CredencialesRepository credencialesRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public AuthService(CredencialesRepository credencialesRepository, UsuarioRepository usuarioRepository) {
        this.credencialesRepository = credencialesRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public LoginResponseDTO autenticarUsuario(LoginDTO loginDTO) {
        // Buscar las credenciales por correo
        Optional<Credenciales> credencialesOpt = credencialesRepository.findByCorreo(loginDTO.getCorreo());
        if (credencialesOpt.isEmpty()) {
            throw new IllegalArgumentException("Credenciales inválidas");
        }

        Credenciales credenciales = credencialesOpt.get();

        // Hashear la contraseña proporcionada para comparar
        String contraseniaHash = Hashing.sha256()
                .hashString(loginDTO.getContrasenia(), StandardCharsets.UTF_8)
                .toString();

        // Verificar contraseña
        if (!credenciales.getContrasenia().equals(contraseniaHash)) {
            throw new IllegalArgumentException("Credenciales inválidas");
        }

        // Obtener el usuario asociado
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(credenciales.getIdUsuario());
        if (usuarioOpt.isEmpty()) {
            throw new IllegalArgumentException("Usuario no encontrado");
        }

        Usuario usuario = usuarioOpt.get();

        // Verificar que el usuario esté activo - CORREGIDO
        if (usuario.getIdEstadoUsuario() != 1) { // ← getIdEstadoUsuario() no getId_Estado_Usuario()
            throw new IllegalArgumentException("Usuario inactivo o bloqueado");
        }

        // Devolver los datos del usuario INCLUYENDO EL ROL - CORREGIDO
        return new LoginResponseDTO(
                usuario.getIdUsuario(),
                usuario.getNombre(),
                usuario.getApellido(),
                loginDTO.getCorreo(),
                usuario.getIdRol()  // ← Solo 5 parámetros
        );
    }
}
