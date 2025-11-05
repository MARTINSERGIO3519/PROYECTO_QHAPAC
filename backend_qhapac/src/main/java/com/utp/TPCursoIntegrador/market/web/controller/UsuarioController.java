package com.utp.TPCursoIntegrador.market.web.controller;

import com.utp.TPCursoIntegrador.market.domain.dto.*;
import com.utp.TPCursoIntegrador.market.domain.service.UsuarioService;
import com.google.common.base.Preconditions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000") // Agregar esta anotación
public class UsuarioController {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioController.class);
    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // Manejo explícito de OPTIONS para CORS
    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> handleOptions() {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@Valid @RequestBody UsuarioRegistroDTO registroDTO,
                                              HttpServletRequest request) {
        try {
            logger.info("=== SOLICITUD DE REGISTRO RECIBIDA ===");
            logger.info("Origin: {}", request.getHeader("Origin"));
            logger.info("Registro para: {}", registroDTO.getCorreo());

            Preconditions.checkNotNull(registroDTO, "Los datos de registro son obligatorios");

            UsuarioResponseDTO usuarioCreado = usuarioService.registrarUsuario(registroDTO);
            logger.info("✅ Usuario registrado exitosamente: {}", registroDTO.getCorreo());

            return new ResponseEntity<>(usuarioCreado, HttpStatus.CREATED);

        } catch (IllegalArgumentException e) {
            logger.warn("❌ Error de validación en registro: {}", e.getMessage());
            // Devuelve un 400 BAD_REQUEST con el mensaje específico
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            logger.error("💥 Error interno en registro: {}", e.getMessage(), e);
            // En desarrollo, podemos mostrar más detalles
            String errorMessage = "Error interno del servidor: " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // NUEVO ENDPOINT: Actualizar perfil
    @PutMapping("/actualizar-perfil")
    public ResponseEntity<?> actualizarPerfil(@RequestBody ActualizarPerfilRequest request) {
        try {
            logger.info("=== SOLICITUD DE ACTUALIZACIÓN DE PERFIL ===");
            logger.info("Actualizando perfil para usuario ID: {}", request.getIdUsuario());

            Preconditions.checkNotNull(request, "Los datos de actualización son obligatorios");
            Preconditions.checkNotNull(request.getIdUsuario(), "El ID de usuario es obligatorio");

            usuarioService.actualizarPerfil(request);
            logger.info("✅ Perfil actualizado exitosamente para usuario ID: {}", request.getIdUsuario());

            return ResponseEntity.ok(new MensajeResponse("Perfil actualizado exitosamente"));

        } catch (IllegalArgumentException e) {
            logger.warn("❌ Error de validación en actualización de perfil: {}", e.getMessage());
            return new ResponseEntity<>(new MensajeResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            logger.error("💥 Error interno en actualización de perfil: {}", e.getMessage(), e);
            return new ResponseEntity<>(
                    new MensajeResponse("Error interno del servidor: " + e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // NUEVO ENDPOINT: Cambiar contraseña
    @PutMapping("/cambiar-contrasenia")
    public ResponseEntity<?> cambiarContrasenia(@RequestBody CambiarContraseniaRequest request) {
        try {
            logger.info("=== SOLICITUD DE CAMBIO DE CONTRASEÑA ===");
            logger.info("Cambiando contraseña para usuario ID: {}", request.getIdUsuario());

            Preconditions.checkNotNull(request, "Los datos de cambio de contraseña son obligatorios");
            Preconditions.checkNotNull(request.getIdUsuario(), "El ID de usuario es obligatorio");
            Preconditions.checkNotNull(request.getContraseniaActual(), "La contraseña actual es obligatoria");
            Preconditions.checkNotNull(request.getNuevaContrasenia(), "La nueva contraseña es obligatoria");

            boolean exito = usuarioService.cambiarContrasenia(request);

            if (exito) {
                logger.info("✅ Contraseña cambiada exitosamente para usuario ID: {}", request.getIdUsuario());
                return ResponseEntity.ok(new MensajeResponse("Contraseña actualizada exitosamente"));
            } else {
                logger.warn("❌ Contraseña actual incorrecta para usuario ID: {}", request.getIdUsuario());
                return new ResponseEntity<>(
                        new MensajeResponse("La contraseña actual es incorrecta"),
                        HttpStatus.BAD_REQUEST
                );
            }

        } catch (IllegalArgumentException e) {
            logger.warn("❌ Error de validación en cambio de contraseña: {}", e.getMessage());
            return new ResponseEntity<>(new MensajeResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            logger.error("💥 Error interno en cambio de contraseña: {}", e.getMessage(), e);
            return new ResponseEntity<>(
                    new MensajeResponse("Error interno del servidor: " + e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck(HttpServletRequest request) {
        return new ResponseEntity<>("Backend funcionando correctamente", HttpStatus.OK);
    }
}