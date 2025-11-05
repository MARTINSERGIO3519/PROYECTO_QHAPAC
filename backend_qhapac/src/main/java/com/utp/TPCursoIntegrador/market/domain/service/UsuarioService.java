package com.utp.TPCursoIntegrador.market.domain.service;

import com.utp.TPCursoIntegrador.market.domain.dto.*;
import com.utp.TPCursoIntegrador.market.persistence.mapper.UsuarioMapper;
import com.utp.TPCursoIntegrador.market.persistence.entity.Usuario;
import com.utp.TPCursoIntegrador.market.persistence.entity.Credenciales;
import com.utp.TPCursoIntegrador.market.domain.repository.UsuarioRepository;
import com.utp.TPCursoIntegrador.market.domain.repository.CredencialesRepository;
import com.google.common.base.Preconditions;
import com.google.common.hash.Hashing;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Service
public class UsuarioService {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioService.class);

    private final UsuarioRepository usuarioRepository;
    private final CredencialesRepository credencialesRepository;
    private final UsuarioMapper usuarioMapper;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository,
                          CredencialesRepository credencialesRepository,
                          UsuarioMapper usuarioMapper) {
        this.usuarioRepository = usuarioRepository;
        this.credencialesRepository = credencialesRepository;
        this.usuarioMapper = usuarioMapper;
    }

    @Transactional
    public UsuarioResponseDTO registrarUsuario(UsuarioRegistroDTO registroDTO) {
        logger.info("Iniciando registro de usuario para: {}", registroDTO.getCorreo());

        try {
            Preconditions.checkNotNull(registroDTO, "Los datos de registro no pueden ser nulos");

            // Validaciones adicionales
            Preconditions.checkArgument(registroDTO.getHorasSemanales() != null,
                    "Las horas semanales son obligatorias");

            // Validar que el correo no esté registrado
            logger.info("Verificando si el correo ya existe: {}", registroDTO.getCorreo());
            if (credencialesRepository.existsByCorreo(registroDTO.getCorreo())) {
                logger.warn("El correo ya está registrado: {}", registroDTO.getCorreo());
                throw new IllegalArgumentException("El correo ya está registrado");
            }

            // Hashear contraseña con Google Guava
            String contraseniaHash = Hashing.sha256()
                    .hashString(registroDTO.getContrasenia(), StandardCharsets.UTF_8)
                    .toString();

            logger.info("Creando entidad Usuario...");
            // Crear y guardar usuario
            Usuario usuario = usuarioMapper.toUsuarioEntity(registroDTO);
            usuario = usuarioRepository.save(usuario);
            logger.info("Usuario guardado con ID: {}", usuario.getIdUsuario());

            // Crear y guardar credenciales
            Credenciales credenciales = usuarioMapper.toCredencialesEntity(
                    registroDTO, usuario.getIdUsuario(), contraseniaHash);
            credencialesRepository.save(credenciales);
            logger.info("Credenciales guardadas para usuario ID: {}", usuario.getIdUsuario());

            return usuarioMapper.toUsuarioResponseDTO(usuario, registroDTO.getCorreo());

        } catch (IllegalArgumentException e) {
            // Relanza la excepción para que el controller la capture
            throw e;
        } catch (DataIntegrityViolationException e) {
            logger.error("Error de integridad de datos: {}", e.getMessage(), e);
            throw new RuntimeException("Error de integridad de datos: " + e.getMostSpecificCause().getMessage());
        } catch (Exception e) {
            logger.error("Error inesperado al registrar usuario: {}", e.getMessage(), e);
            throw new RuntimeException("Error interno del servidor: " + e.getMessage());
        }
    }

    // NUEVO MÉTODO: Actualizar perfil
    @Transactional
    public void actualizarPerfil(ActualizarPerfilRequest request) {
        logger.info("Actualizando perfil para usuario ID: {}", request.getIdUsuario());

        try {
            Preconditions.checkNotNull(request, "La solicitud de actualización no puede ser nula");
            Preconditions.checkNotNull(request.getIdUsuario(), "El ID de usuario es obligatorio");

            // Buscar el usuario
            Optional<Usuario> usuarioOpt = usuarioRepository.findById(request.getIdUsuario());
            if (usuarioOpt.isEmpty()) {
                logger.warn("Usuario no encontrado con ID: {}", request.getIdUsuario());
                throw new IllegalArgumentException("Usuario no encontrado");
            }

            Usuario usuario = usuarioOpt.get();

            // Actualizar campos
            if (request.getNombre() != null && !request.getNombre().trim().isEmpty()) {
                usuario.setNombre(request.getNombre().trim());
            }

            if (request.getApellido() != null && !request.getApellido().trim().isEmpty()) {
                usuario.setApellido(request.getApellido().trim());
            }

            // Guardar cambios
            usuarioRepository.save(usuario);
            logger.info("✅ Perfil actualizado exitosamente para usuario ID: {}", request.getIdUsuario());

        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Error inesperado al actualizar perfil: {}", e.getMessage(), e);
            throw new RuntimeException("Error interno del servidor al actualizar perfil: " + e.getMessage());
        }
    }

    // NUEVO MÉTODO: Cambiar contraseña
    @Transactional
    public boolean cambiarContrasenia(CambiarContraseniaRequest request) {
        logger.info("Cambiando contraseña para usuario ID: {}", request.getIdUsuario());

        try {
            Preconditions.checkNotNull(request, "La solicitud de cambio de contraseña no puede ser nula");
            Preconditions.checkNotNull(request.getIdUsuario(), "El ID de usuario es obligatorio");
            Preconditions.checkNotNull(request.getContraseniaActual(), "La contraseña actual es obligatoria");
            Preconditions.checkNotNull(request.getNuevaContrasenia(), "La nueva contraseña es obligatoria");

            // Buscar las credenciales del usuario
            Optional<Credenciales> credencialesOpt = credencialesRepository.findByIdUsuario(request.getIdUsuario());
            if (credencialesOpt.isEmpty()) {
                logger.warn("Credenciales no encontradas para usuario ID: {}", request.getIdUsuario());
                throw new IllegalArgumentException("Credenciales no encontradas");
            }

            Credenciales credenciales = credencialesOpt.get();

            // Verificar contraseña actual
            String contraseniaActualHash = Hashing.sha256()
                    .hashString(request.getContraseniaActual(), StandardCharsets.UTF_8)
                    .toString();

            if (!credenciales.getContrasenia().equals(contraseniaActualHash)) {
                logger.warn("Contraseña actual incorrecta para usuario ID: {}", request.getIdUsuario());
                return false;
            }

            // Hashear nueva contraseña
            String nuevaContraseniaHash = Hashing.sha256()
                    .hashString(request.getNuevaContrasenia(), StandardCharsets.UTF_8)
                    .toString();

            // Actualizar contraseña
            credenciales.setContrasenia(nuevaContraseniaHash);
            credencialesRepository.save(credenciales);

            logger.info("✅ Contraseña cambiada exitosamente para usuario ID: {}", request.getIdUsuario());
            return true;

        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Error inesperado al cambiar contraseña: {}", e.getMessage(), e);
            throw new RuntimeException("Error interno del servidor al cambiar contraseña: " + e.getMessage());
        }
    }
}