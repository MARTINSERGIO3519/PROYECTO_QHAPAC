package com.utp.TPCursoIntegrador.market.domain.service;

import com.utp.TPCursoIntegrador.market.domain.dto.LoginDTO;
import com.utp.TPCursoIntegrador.market.domain.dto.LoginResponseDTO;
import com.utp.TPCursoIntegrador.market.persistence.entity.Credenciales;
import com.utp.TPCursoIntegrador.market.persistence.entity.Usuario;
import com.utp.TPCursoIntegrador.market.domain.repository.CredencialesRepository;
import com.utp.TPCursoIntegrador.market.domain.repository.UsuarioRepository;
import com.google.common.hash.Hashing;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final CredencialesRepository credencialesRepository;
    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;

    @Autowired
    public AuthService(CredencialesRepository credencialesRepository,
                       UsuarioRepository usuarioRepository,
                       JwtService jwtService) {
        this.credencialesRepository = credencialesRepository;
        this.usuarioRepository = usuarioRepository;
        this.jwtService = jwtService;
    }

    public LoginResponseDTO autenticarUsuario(LoginDTO loginDTO) {
        logger.info("Intentando autenticar usuario: {}", loginDTO.getCorreo());

        // Buscar las credenciales por correo
        Optional<Credenciales> credencialesOpt = credencialesRepository.findByCorreo(loginDTO.getCorreo());
        if (credencialesOpt.isEmpty()) {
            logger.warn("Credenciales no encontradas para: {}", loginDTO.getCorreo());
            throw new IllegalArgumentException("Credenciales inválidas");
        }

        Credenciales credenciales = credencialesOpt.get();

        // Hashear la contraseña proporcionada para comparar
        String contraseniaHash = Hashing.sha256()
                .hashString(loginDTO.getContrasenia(), StandardCharsets.UTF_8)
                .toString();

        // Verificar contraseña
        if (!credenciales.getContrasenia().equals(contraseniaHash)) {
            logger.warn("Contraseña incorrecta para: {}", loginDTO.getCorreo());
            throw new IllegalArgumentException("Credenciales inválidas");
        }

        // Obtener el usuario asociado
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(credenciales.getIdUsuario());
        if (usuarioOpt.isEmpty()) {
            logger.error("Usuario no encontrado para credenciales ID: {}", credenciales.getIdUsuario());
            throw new IllegalArgumentException("Usuario no encontrado");
        }

        Usuario usuario = usuarioOpt.get();

        // Verificar que el usuario esté activo
        if (usuario.getIdEstadoUsuario() != 1) {
            logger.warn("Usuario inactivo o bloqueado: {}", usuario.getIdUsuario());
            throw new IllegalArgumentException("Usuario inactivo o bloqueado");
        }

        // Generar token JWT
        String token = jwtService.generateToken(
                loginDTO.getCorreo(),
                usuario.getIdUsuario(),
                usuario.getIdRol()
        );

        logger.info("Autenticación exitosa para usuario ID: {}", usuario.getIdUsuario());

        // Devolver los datos del usuario incluyendo el token JWT
        return new LoginResponseDTO(
                usuario.getIdUsuario(),
                usuario.getNombre(),
                usuario.getApellido(),
                loginDTO.getCorreo(),
                usuario.getIdRol(),
                token
        );
    }
}