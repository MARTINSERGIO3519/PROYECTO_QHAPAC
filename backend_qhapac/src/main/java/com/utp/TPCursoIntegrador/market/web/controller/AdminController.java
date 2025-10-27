
package com.utp.TPCursoIntegrador.market.web.controller;

import com.utp.TPCursoIntegrador.market.domain.dto.*;
import com.utp.TPCursoIntegrador.market.domain.service.AdminService;
import com.google.common.base.Preconditions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);
    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // Obtener todos los usuarios
    @GetMapping("/usuarios")
    public ResponseEntity<?> obtenerTodosUsuarios() {
        try {
            logger.info("=== SOLICITUD DE OBTENCIÓN DE TODOS LOS USUARIOS ===");
            List<UsuarioAdminDTO> usuarios = adminService.obtenerTodosUsuarios();
            return ResponseEntity.ok(usuarios);
        } catch (Exception e) {
            logger.error("💥 Error al obtener usuarios: {}", e.getMessage(), e);
            return new ResponseEntity<>(
                    new MensajeResponse("Error al obtener usuarios: " + e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Crear nuevo usuario (admin o normal)
    @PostMapping("/usuarios")
    public ResponseEntity<?> crearUsuario(@RequestBody GestionUsuarioRequest request) {
        try {
            logger.info("=== SOLICITUD DE CREACIÓN DE USUARIO POR ADMIN ===");
            Preconditions.checkNotNull(request, "Los datos del usuario son obligatorios");

            UsuarioResponseDTO usuarioCreado = adminService.crearUsuario(request);
            logger.info("✅ Usuario creado exitosamente: {}", request.getCorreo());

            return new ResponseEntity<>(usuarioCreado, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            logger.warn("❌ Error de validación en creación de usuario: {}", e.getMessage());
            return new ResponseEntity<>(new MensajeResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            logger.error("💥 Error interno en creación de usuario: {}", e.getMessage(), e);
            return new ResponseEntity<>(
                    new MensajeResponse("Error interno del servidor: " + e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Cambiar rol de usuario
    @PutMapping("/usuarios/cambiar-rol")
    public ResponseEntity<?> cambiarRolUsuario(@RequestBody CambiarRolRequest request) {
        try {
            logger.info("=== SOLICITUD DE CAMBIO DE ROL ===");
            Preconditions.checkNotNull(request, "Los datos de cambio de rol son obligatorios");

            adminService.cambiarRolUsuario(request);
            return ResponseEntity.ok(new MensajeResponse("Rol de usuario actualizado exitosamente"));
        } catch (IllegalArgumentException e) {
            logger.warn("❌ Error en cambio de rol: {}", e.getMessage());
            return new ResponseEntity<>(new MensajeResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            logger.error("💥 Error interno en cambio de rol: {}", e.getMessage(), e);
            return new ResponseEntity<>(
                    new MensajeResponse("Error interno del servidor: " + e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Cambiar estado de usuario
    @PutMapping("/usuarios/cambiar-estado")
    public ResponseEntity<?> cambiarEstadoUsuario(@RequestBody CambiarEstadoRequest request) {
        try {
            logger.info("=== SOLICITUD DE CAMBIO DE ESTADO ===");
            Preconditions.checkNotNull(request, "Los datos de cambio de estado son obligatorios");

            adminService.cambiarEstadoUsuario(request);
            return ResponseEntity.ok(new MensajeResponse("Estado de usuario actualizado exitosamente"));
        } catch (IllegalArgumentException e) {
            logger.warn("❌ Error en cambio de estado: {}", e.getMessage());
            return new ResponseEntity<>(new MensajeResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            logger.error("💥 Error interno en cambio de estado: {}", e.getMessage(), e);
            return new ResponseEntity<>(
                    new MensajeResponse("Error interno del servidor: " + e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Obtener estadísticas del sistema
    @GetMapping("/estadisticas")
    public ResponseEntity<?> obtenerEstadisticasSistema() {
        try {
            logger.info("=== SOLICITUD DE ESTADÍSTICAS DEL SISTEMA ===");
            EstadisticasSistemaDTO estadisticas = adminService.obtenerEstadisticasSistema();
            return ResponseEntity.ok(estadisticas);
        } catch (Exception e) {
            logger.error("💥 Error al obtener estadísticas: {}", e.getMessage(), e);
            return new ResponseEntity<>(
                    new MensajeResponse("Error al obtener estadísticas: " + e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
