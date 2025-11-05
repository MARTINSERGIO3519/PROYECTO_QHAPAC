package com.utp.TPCursoIntegrador.market.domain.service;

import com.google.common.base.Strings;
import com.google.common.hash.Hashing;
import com.utp.TPCursoIntegrador.market.persistence.entity.Credenciales;
import com.utp.TPCursoIntegrador.market.domain.repository.CredencialesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class PasswordService {

    private static final Logger logger = LoggerFactory.getLogger(PasswordService.class);

    @Autowired
    private CredencialesRepository credencialesRepository;

    @Autowired
    private JavaMailSender mailSender;

    // Tiempo de expiración en minutos (15 minutos)
    private static final int EXPIRACION_MINUTOS = 15;

    public void solicitarRecuperacionPassword(String correo) {
        // Validar que el correo no esté vacío usando Guava
        if (Strings.isNullOrEmpty(correo)) {
            throw new IllegalArgumentException("El correo no puede estar vacío");
        }

        Optional<Credenciales> credencialesOpt = credencialesRepository.findByCorreo(correo.trim().toLowerCase());

        if (credencialesOpt.isPresent()) {
            Credenciales credenciales = credencialesOpt.get();

            // Generar código temporal usando Guava para el hash
            String codigoTemporal = generarCodigoTemporal();

            // Establecer fecha de expiración
            LocalDateTime fechaExpiracion = LocalDateTime.now().plusMinutes(EXPIRACION_MINUTOS);

            // Guardar en base de datos
            credenciales.setCodigoTemporal(codigoTemporal);
            credenciales.setFechaExpiraCodigo(fechaExpiracion);
            credencialesRepository.save(credenciales);

            // Enviar email
            enviarEmailRecuperacion(correo, codigoTemporal);

            logger.info("Código de recuperación enviado a: {}", correo);
        } else {
            // Por seguridad, no revelamos si el email existe o no
            logger.warn("Intento de recuperación para email no registrado: {}", correo);
        }
    }

    public boolean resetPassword(String codigoTemporal, String nuevaContrasenia) {
        // Validaciones con Guava
        if (Strings.isNullOrEmpty(codigoTemporal)) {
            throw new IllegalArgumentException("El código temporal no puede estar vacío");
        }
        if (Strings.isNullOrEmpty(nuevaContrasenia)) {
            throw new IllegalArgumentException("La nueva contraseña no puede estar vacía");
        }

        Optional<Credenciales> credencialesOpt = credencialesRepository.findByCodigoTemporal(codigoTemporal.trim());

        if (credencialesOpt.isPresent()) {
            Credenciales credenciales = credencialesOpt.get();

            // Verificar que el código no haya expirado
            if (credenciales.getFechaExpiraCodigo() != null &&
                    credenciales.getFechaExpiraCodigo().isAfter(LocalDateTime.now())) {

                // Encriptar nueva contraseña usando Guava para el hash
                String contraseniaEncriptada = encriptarContrasenia(nuevaContrasenia);

                // Actualizar contraseña y limpiar código temporal
                credenciales.setContrasenia(contraseniaEncriptada);
                credenciales.setCodigoTemporal(null);
                credenciales.setFechaExpiraCodigo(null);
                credencialesRepository.save(credenciales);

                logger.info("Contraseña actualizada para usuario ID: {}", credenciales.getIdUsuario());
                return true;
            } else {
                logger.warn("Código temporal expirado: {}", codigoTemporal);
            }
        } else {
            logger.warn("Código temporal no encontrado: {}", codigoTemporal);
        }
        return false;
    }

    private String generarCodigoTemporal() {
        // Generar código de 6 dígitos usando ThreadLocalRandom (más eficiente)
        int codigo = ThreadLocalRandom.current().nextInt(100000, 1000000);
        return String.valueOf(codigo);
    }

    private void enviarEmailRecuperacion(String correo, String codigoTemporal) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(correo);
            message.setSubject("Código de recuperación de contraseña - Qhapac");
            message.setText(
                    "Hola,\n\n" +
                            "Has solicitado recuperar tu contraseña en Qhapac. Tu código de verificación es:\n\n" +
                            "🔐 " + codigoTemporal + "\n\n" +
                            "Este código expirará en " + EXPIRACION_MINUTOS + " minutos.\n\n" +
                            "Si no solicitaste este cambio, puedes ignorar este mensaje.\n\n" +
                            "Saludos,\nEquipo Qhapac"
            );

            mailSender.send(message);
            logger.info("Email de recuperación enviado exitosamente a: {}", correo);
        } catch (Exception e) {
            logger.error("Error al enviar email de recuperación a {}: {}", correo, e.getMessage(), e);
            throw new RuntimeException("Error al enviar el email de recuperación: " + e.getMessage());
        }
    }

    private String encriptarContrasenia(String contrasenia) {
        // Usar Guava para crear un hash SHA-256 (igual que tu sistema actual)
        return Hashing.sha256()
                .hashString(contrasenia, StandardCharsets.UTF_8)
                .toString();
    }

    // Método para verificar si un código temporal es válido
    public boolean validarCodigoTemporal(String codigoTemporal) {
        if (Strings.isNullOrEmpty(codigoTemporal)) {
            return false;
        }

        Optional<Credenciales> credencialesOpt = credencialesRepository.findByCodigoTemporal(codigoTemporal.trim());

        if (credencialesOpt.isPresent()) {
            Credenciales credenciales = credencialesOpt.get();
            return credenciales.getFechaExpiraCodigo() != null &&
                    credenciales.getFechaExpiraCodigo().isAfter(LocalDateTime.now());
        }

        return false;
    }
}