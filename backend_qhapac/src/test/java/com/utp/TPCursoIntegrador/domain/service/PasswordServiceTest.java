package com.utp.TPCursoIntegrador.domain.service;

import com.utp.TPCursoIntegrador.market.domain.service.PasswordService;
import com.utp.TPCursoIntegrador.market.persistence.entity.Credenciales;
import com.utp.TPCursoIntegrador.market.domain.repository.CredencialesRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

class PasswordServiceTest {

    @Mock
    private CredencialesRepository credencialesRepository;

    @Mock
    private JavaMailSender mailSender;

    @InjectMocks
    private PasswordService passwordService;

    private Credenciales credenciales;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        credenciales = new Credenciales();
        credenciales.setCorreo("test@correo.com");
        credenciales.setCodigoTemporal("123456");
    }

    @Test
    void testSolicitarRecuperacionPassword_Success() {
        // Simulamos la respuesta del repositorio al buscar el correo
        when(credencialesRepository.findByCorreo("test@correo.com")).thenReturn(Optional.of(credenciales));

        // Ejecutar el método
        passwordService.solicitarRecuperacionPassword("test@correo.com");

        // Verificar interacciones
        verify(credencialesRepository, times(1)).findByCorreo("test@correo.com");
        verify(credencialesRepository, times(1)).save(any(Credenciales.class));

        // No es necesario verificar el código temporal, ya que es generado dinámicamente
    }

    @Test
    void testSolicitarRecuperacionPassword_EmailNotFound() {
        // Simulamos que el correo no se encuentra en la base de datos
        when(credencialesRepository.findByCorreo("test@correo.com")).thenReturn(Optional.empty());

        // Ejecutar el método (no debería hacer nada ya que el correo no existe)
        passwordService.solicitarRecuperacionPassword("test@correo.com");

        // Verificar interacciones
        verify(credencialesRepository, times(1)).findByCorreo("test@correo.com");
        verify(credencialesRepository, times(0)).save(any());
    }

    @Test
    void testResetPassword_Success() {
        // Simulamos que el código temporal existe y no ha expirado
        credenciales.setFechaExpiraCodigo(java.time.LocalDateTime.now().plusMinutes(10));
        when(credencialesRepository.findByCodigoTemporal("123456")).thenReturn(Optional.of(credenciales));

        // Ejecutamos el método para cambiar la contraseña
        boolean result = passwordService.resetPassword("123456", "newPassword123");

        // Verificar que se haya guardado la nueva contraseña
        verify(credencialesRepository, times(1)).save(any(Credenciales.class));

        // Verificar el resultado
        assertTrue(result);
    }

    @Test
    void testResetPassword_CodeExpired() {
        // Simulamos que el código ha expirado
        credenciales.setFechaExpiraCodigo(java.time.LocalDateTime.now().minusMinutes(5));
        when(credencialesRepository.findByCodigoTemporal("123456")).thenReturn(Optional.of(credenciales));

        // Ejecutamos el método para cambiar la contraseña
        boolean result = passwordService.resetPassword("123456", "newPassword123");

        // Verificar que no se haya guardado nada
        verify(credencialesRepository, times(0)).save(any(Credenciales.class));

        // Verificar que el código expirado no permitió el cambio de contraseña
        assertFalse(result);
    }

    @Test
    void testResetPassword_CodeNotFound() {
        // Simulamos que el código temporal no se encuentra
        when(credencialesRepository.findByCodigoTemporal("123456")).thenReturn(Optional.empty());

        // Ejecutamos el método para cambiar la contraseña
        boolean result = passwordService.resetPassword("123456", "newPassword123");

        // Verificar que no se haya guardado nada
        verify(credencialesRepository, times(0)).save(any(Credenciales.class));

        // Verificar que el código no encontrado devuelve false
        assertFalse(result);
    }

    @Test
    void testValidarCodigoTemporal_Valid() {
        // Simulamos que el código es válido y no ha expirado
        credenciales.setFechaExpiraCodigo(java.time.LocalDateTime.now().plusMinutes(10));
        when(credencialesRepository.findByCodigoTemporal("123456")).thenReturn(Optional.of(credenciales));

        // Ejecutamos la validación del código
        boolean result = passwordService.validarCodigoTemporal("123456");

        // Verificar que el código es válido
        assertTrue(result);
    }

    @Test
    void testValidarCodigoTemporal_Expired() {
        // Simulamos que el código ha expirado
        credenciales.setFechaExpiraCodigo(java.time.LocalDateTime.now().minusMinutes(5));
        when(credencialesRepository.findByCodigoTemporal("123456")).thenReturn(Optional.of(credenciales));

        // Ejecutamos la validación del código
        boolean result = passwordService.validarCodigoTemporal("123456");

        // Verificar que el código expirado no es válido
        assertFalse(result);
    }

    @Test
    void testValidarCodigoTemporal_NotFound() {
        // Simulamos que el código no existe
        when(credencialesRepository.findByCodigoTemporal("123456")).thenReturn(Optional.empty());

        // Ejecutamos la validación del código
        boolean result = passwordService.validarCodigoTemporal("123456");

        // Verificar que el código no encontrado no es válido
        assertFalse(result);
    }
}