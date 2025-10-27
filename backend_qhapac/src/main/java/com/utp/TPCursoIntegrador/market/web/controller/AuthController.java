package com.utp.TPCursoIntegrador.market.web.controller;

import com.utp.TPCursoIntegrador.market.domain.dto.*;
import com.utp.TPCursoIntegrador.market.domain.service.AuthService;
import com.utp.TPCursoIntegrador.market.domain.service.PasswordService;
import com.utp.TPCursoIntegrador.market.persistence.entity.Usuario;
import com.utp.TPCursoIntegrador.market.persistence.entity.Credenciales;
import com.utp.TPCursoIntegrador.market.persistence.repository.UsuarioRepository;
import com.utp.TPCursoIntegrador.market.persistence.repository.CredencialesRepository;
import com.google.common.hash.Hashing;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;
    private final PasswordService passwordService;
    private final UsuarioRepository usuarioRepository;
    private final CredencialesRepository credencialesRepository;

    @Autowired
    public AuthController(AuthService authService,
                          PasswordService passwordService,
                          UsuarioRepository usuarioRepository,
                          CredencialesRepository credencialesRepository) {
        this.authService = authService;
        this.passwordService = passwordService;
        this.usuarioRepository = usuarioRepository;
        this.credencialesRepository = credencialesRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO) {
        try {
            logger.info("Intento de login para: {}", loginDTO.getCorreo());
            LoginResponseDTO response = authService.autenticarUsuario(loginDTO);
            logger.info("Login exitoso para: {}", loginDTO.getCorreo());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            logger.warn("Error en login: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            logger.error("Error interno en login: {}", e.getMessage(), e);
            return new ResponseEntity<>("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // NUEVOS ENDPOINTS PARA RECUPERACIÓN DE CONTRASEÑA
    @PostMapping("/recuperar-password")
    public ResponseEntity<?> recuperarPassword(@RequestBody RecuperarPasswordRequest request) {
        try {
            logger.info("Solicitud de recuperación de contraseña para: {}", request.getCorreo());

            passwordService.solicitarRecuperacionPassword(request.getCorreo());

            // Por seguridad, siempre devolvemos el mismo mensaje
            return ResponseEntity.ok(new MensajeResponse(
                    "Si el correo existe en nuestro sistema, se ha enviado un código de recuperación"
            ));

        } catch (IllegalArgumentException e) {
            logger.warn("Error en recuperación de contraseña: {}", e.getMessage());
            return ResponseEntity.badRequest().body(new MensajeResponse(e.getMessage()));
        } catch (Exception e) {
            logger.error("Error interno en recuperación de contraseña: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MensajeResponse("Error al procesar la solicitud de recuperación"));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            logger.info("Intento de reset de contraseña con código: {}", request.getCodigoTemporal());

            boolean exito = passwordService.resetPassword(
                    request.getCodigoTemporal(),
                    request.getNuevaContrasenia()
            );

            if (exito) {
                logger.info("Contraseña resetada exitosamente para código: {}", request.getCodigoTemporal());
                return ResponseEntity.ok(new MensajeResponse("Contraseña actualizada exitosamente"));
            } else {
                logger.warn("Código inválido o expirado: {}", request.getCodigoTemporal());
                return ResponseEntity.badRequest()
                        .body(new MensajeResponse("Código inválido o expirado"));
            }

        } catch (IllegalArgumentException e) {
            logger.warn("Error en reset de contraseña: {}", e.getMessage());
            return ResponseEntity.badRequest().body(new MensajeResponse(e.getMessage()));
        } catch (Exception e) {
            logger.error("Error interno en reset de contraseña: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MensajeResponse("Error al actualizar la contraseña"));
        }
    }

    // Endpoint opcional para validar código temporal
    @GetMapping("/validar-codigo/{codigo}")
    public ResponseEntity<?> validarCodigo(@PathVariable String codigo) {
        try {
            boolean valido = passwordService.validarCodigoTemporal(codigo);

            if (valido) {
                return ResponseEntity.ok(new MensajeResponse("Código válido"));
            } else {
                return ResponseEntity.badRequest().body(new MensajeResponse("Código inválido o expirado"));
            }

        } catch (Exception e) {
            logger.error("Error validando código: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MensajeResponse("Error al validar el código"));
        }
    }

    // ============================================================
    // ENDPOINTS ESPECIALES PARA ADMINISTRADOR
    // ============================================================

    /**
     * Endpoint de emergencia para crear administrador
     * Solo permite correos que terminen en @qhapac.com
     */
    @PostMapping("/crear-admin-emergencia")
    public ResponseEntity<?> crearAdminEmergencia() {
        try {
            logger.info("=== SOLICITUD DE CREACIÓN DE ADMIN DE EMERGENCIA ===");

            String correoAdmin = "admin@qhapac.com";

            // Verificar si ya existe
            if (credencialesRepository.existsByCorreo(correoAdmin)) {
                logger.warn("El admin de emergencia ya existe: {}", correoAdmin);
                return ResponseEntity.badRequest().body("El admin ya existe");
            }

            // Validar que el correo termine en @qhapac.com
            if (!correoAdmin.endsWith("@qhapac.com")) {
                logger.error("Correo no válido para administrador: {}", correoAdmin);
                return ResponseEntity.badRequest().body("Solo se permiten correos @qhapac.com para administradores");
            }

            // Crear usuario admin
            Usuario usuario = new Usuario();
            usuario.setNombre("Admin");
            usuario.setApellido("Qhapac");
            usuario.setIdRol(1); // Rol de administrador
            usuario.setExperienciaTotal(1000.0f);
            usuario.setExperienciaSemanal(100.0f);
            usuario.setHorasSemanales(40.0f);
            usuario.setFechaRegistro(LocalDateTime.now());
            usuario.setIdEstadoUsuario(1); // Activo

            usuario = usuarioRepository.save(usuario);
            logger.info("Usuario admin creado con ID: {}", usuario.getIdUsuario());

            // Crear credenciales
            String contraseniaHash = Hashing.sha256()
                    .hashString("admin123", StandardCharsets.UTF_8)
                    .toString();

            Credenciales credenciales = new Credenciales();
            credenciales.setIdUsuario(usuario.getIdUsuario());
            credenciales.setCorreo(correoAdmin);
            credenciales.setContrasenia(contraseniaHash);
            credencialesRepository.save(credenciales);

            logger.info("✅ Admin de emergencia creado exitosamente: {}", correoAdmin);
            return ResponseEntity.ok("✅ Admin de emergencia creado: " + correoAdmin + " / admin123");

        } catch (Exception e) {
            logger.error("💥 Error creando admin de emergencia: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    /**
     * Endpoint para debug - verificar hash de contraseñas
     */
    @PostMapping("/debug-hash")
    public ResponseEntity<?> debugHash(@RequestBody LoginDTO loginDTO) {
        try {
            String contraseniaHash = Hashing.sha256()
                    .hashString(loginDTO.getContrasenia(), StandardCharsets.UTF_8)
                    .toString();

            // Hash esperado para "admin123"
            String hashEsperado = "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92";

            return ResponseEntity.ok(new DebugHashResponse(
                    loginDTO.getContrasenia(),
                    contraseniaHash,
                    hashEsperado,
                    contraseniaHash.equals(hashEsperado)
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Endpoint para crear administradores con correo personalizado
     * Solo permite correos @qhapac.com
     */
    @PostMapping("/crear-admin")
    public ResponseEntity<?> crearAdmin(@RequestBody CrearAdminRequest request) {
        try {
            logger.info("=== SOLICITUD DE CREACIÓN DE ADMIN ===");
            logger.info("Correo: {}, Nombre: {}", request.getCorreo(), request.getNombre());

            // Validar que el correo termine en @qhapac.com
            if (!request.getCorreo().endsWith("@qhapac.com")) {
                logger.error("Correo no válido para administrador: {}", request.getCorreo());
                return ResponseEntity.badRequest().body("Solo se permiten correos @qhapac.com para administradores");
            }

            // Verificar si ya existe
            if (credencialesRepository.existsByCorreo(request.getCorreo())) {
                logger.warn("El admin ya existe: {}", request.getCorreo());
                return ResponseEntity.badRequest().body("El admin ya existe");
            }

            // Crear usuario admin
            Usuario usuario = new Usuario();
            usuario.setNombre(request.getNombre());
            usuario.setApellido(request.getApellido());
            usuario.setIdRol(1); // Rol de administrador
            usuario.setExperienciaTotal(1000.0f);
            usuario.setExperienciaSemanal(100.0f);
            usuario.setHorasSemanales(40.0f);
            usuario.setFechaRegistro(LocalDateTime.now());
            usuario.setIdEstadoUsuario(1); // Activo

            usuario = usuarioRepository.save(usuario);
            logger.info("Usuario admin creado con ID: {}", usuario.getIdUsuario());

            // Crear credenciales
            String contraseniaHash = Hashing.sha256()
                    .hashString(request.getContrasenia(), StandardCharsets.UTF_8)
                    .toString();

            Credenciales credenciales = new Credenciales();
            credenciales.setIdUsuario(usuario.getIdUsuario());
            credenciales.setCorreo(request.getCorreo());
            credenciales.setContrasenia(contraseniaHash);
            credencialesRepository.save(credenciales);

            logger.info("✅ Admin creado exitosamente: {}", request.getCorreo());
            return ResponseEntity.ok("✅ Admin creado: " + request.getCorreo());

        } catch (Exception e) {
            logger.error("💥 Error creando admin: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }
}

// ============================================================
// DTOs ADICIONALES NECESARIOS
// ============================================================

/**
 * DTO para crear administradores
 */
class CrearAdminRequest {
    private String nombre;
    private String apellido;
    private String correo;
    private String contrasenia;

    // Getters y Setters
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getContrasenia() { return contrasenia; }
    public void setContrasenia(String contrasenia) { this.contrasenia = contrasenia; }
}

/**
 * DTO para respuesta de debug hash
 */
class DebugHashResponse {
    private String password;
    private String hash;
    private String hashEsperado;
    private boolean match;

    public DebugHashResponse(String password, String hash, String hashEsperado, boolean match) {
        this.password = password;
        this.hash = hash;
        this.hashEsperado = hashEsperado;
        this.match = match;
    }

    // Getters
    public String getPassword() { return password; }
    public String getHash() { return hash; }
    public String getHashEsperado() { return hashEsperado; }
    public boolean isMatch() { return match; }
}
