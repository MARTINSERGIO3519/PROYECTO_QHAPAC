package com.utp.TPCursoIntegrador.market.web.controller;

import com.utp.TPCursoIntegrador.market.domain.dto.UserDTO;
import com.utp.TPCursoIntegrador.market.domain.service.EmailService;
import com.utp.TPCursoIntegrador.market.domain.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.HashMap;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final EmailService emailService;

    public UserController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }

    @GetMapping("/all")
    public List<UserDTO> getAll() {
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<UserDTO> getById(@PathVariable Integer id) {
        return userService.getById(id);
    }

    @PostMapping("/add")
    public UserDTO add(@RequestBody UserDTO user) {
        return userService.save(user);
    }

    @PutMapping("/update")
    public UserDTO update(@RequestBody UserDTO user) {
        return userService.save(user);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id) {
        userService.delete(id);
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> datos) {
        String correo = datos.get("correo");
        String contrasena = datos.get("contrasena");

        boolean loginExitoso = userService.login(correo, contrasena);

        Map<String, Object> respuesta = new HashMap<>();
        if (loginExitoso) {
            respuesta.put("success", true);
            respuesta.put("message", "✅ Bienvenido " + correo);
        } else {
            respuesta.put("success", false);
            respuesta.put("message", "❌ Credenciales incorrectas");
        }

        return respuesta;
    }

    @PostMapping("/recover")
    public Map<String, Object> recuperarContraseña(@RequestBody Map<String, String> datos) {
        String correo = datos.get("correo");
        Map<String, Object> respuesta = new HashMap<>();

        if (correo == null || correo.trim().isEmpty()) {
            respuesta.put("success", false);
            respuesta.put("message", "Correo inválido");
            return respuesta;
        }

        try {
            Optional<String> tempOpt = userService.generarCodigoTemporal(correo);
            if (tempOpt.isPresent()) {
                String tempCodigo = tempOpt.get();
                try {
                    emailService.enviarCorreo(
                            correo,
                            "Recuperación de contraseña",
                            "Tu código temporal es: " + tempCodigo + "\nCámbiala después de iniciar sesión."
                    );
                    respuesta.put("success", true);
                    respuesta.put("message", "Se ha enviado un correo de recuperación a " + correo);
                } catch (Exception mailEx) {
                    mailEx.printStackTrace();
                    respuesta.put("success", false);
                    respuesta.put("message", "Se generó el código, pero falló el envío del correo: " + mailEx.getMessage());
                }
            } else {
                respuesta.put("success", false);
                respuesta.put("message", "Correo no registrado");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            respuesta.put("success", false);
            respuesta.put("message", "Error interno: " + ex.getMessage());
        }

        return respuesta;
    }

    @PostMapping("/change-password")
    public Map<String, Object> cambiarContrasena(@RequestBody Map<String, String> datos) {
        String correo = datos.get("correo");
        String codigo = datos.get("codigo");
        String nueva = datos.get("nuevaContrasena");
        String confirmar = datos.get("confirmarContrasena");

        Map<String, Object> respuesta = new HashMap<>();

        if (correo == null || codigo == null || nueva == null || confirmar == null) {
            respuesta.put("success", false);
            respuesta.put("message", "Todos los campos son obligatorios");
            return respuesta;
        }

        if (!nueva.equals(confirmar)) {
            respuesta.put("success", false);
            respuesta.put("message", "Las contraseñas no coinciden");
            return respuesta;
        }

        boolean ok = userService.cambiarContrasenaConCodigo(correo, codigo, nueva);

        if (ok) {
            respuesta.put("success", true);
            respuesta.put("message", "✅ Contraseña cambiada correctamente");
        } else {
            respuesta.put("success", false);
            respuesta.put("message", "❌ Código inválido o expirado");
        }

        return respuesta;
    }
}

