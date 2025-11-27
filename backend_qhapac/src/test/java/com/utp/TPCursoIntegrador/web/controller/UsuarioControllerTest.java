package com.utp.TPCursoIntegrador.web.controller;

import com.utp.TPCursoIntegrador.market.domain.dto.*;
import com.utp.TPCursoIntegrador.market.domain.service.UsuarioService;
import com.utp.TPCursoIntegrador.market.web.controller.UsuarioController;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class UsuarioControllerTest {

    @InjectMocks
    private UsuarioController usuarioController; // El controlador que estamos probando

    @Mock
    private UsuarioService usuarioService; // Mock del servicio UsuarioService

    @Mock
    private HttpServletRequest request; // Mock de la solicitud HTTP

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this); // Inicializa los mocks
    }

    // Test para el endpoint de registro de usuario
    @Test
    public void testRegistrarUsuarioSuccess() {
        // Datos de entrada
        UsuarioRegistroDTO registroDTO = new UsuarioRegistroDTO();
        registroDTO.setCorreo("test@correo.com");

        UsuarioResponseDTO usuarioResponseDTO = new UsuarioResponseDTO();
        usuarioResponseDTO.setCorreo("test@correo.com");

        // Simular que el servicio crea al usuario
        when(usuarioService.registrarUsuario(registroDTO)).thenReturn(usuarioResponseDTO);

        // Llamar al controlador
        ResponseEntity<?> response = usuarioController.registrarUsuario(registroDTO, request);

        // Verificar que la respuesta sea correcta
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    // Test para el health check
    @Test
    public void testHealthCheck() {
        // Llamar al health check
        ResponseEntity<String> response = usuarioController.healthCheck(request);

        // Verificar que la respuesta sea OK con el mensaje correcto
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Backend funcionando correctamente", response.getBody());
    }
}