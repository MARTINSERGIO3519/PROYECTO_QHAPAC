package com.utp.TPCursoIntegrador.web.controller;

import com.utp.TPCursoIntegrador.market.domain.dto.*;
import com.utp.TPCursoIntegrador.market.domain.service.AdminService;
import com.utp.TPCursoIntegrador.market.web.controller.AdminController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;

public class AdminControllerTest {

    @InjectMocks
    private AdminController adminController; // El controlador que estamos probando

    @Mock
    private AdminService adminService; // Servicio que es utilizado por el controlador

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this); // Inicializa los mocks
    }

    // Test para obtener todos los usuarios
    @Test
    public void testObtenerTodosUsuarios() {
        // Crear datos de prueba
        UsuarioAdminDTO usuario1 = new UsuarioAdminDTO();
        usuario1.setIdUsuario(1);
        usuario1.setNombre("Juan");
        usuario1.setApellido("Perez");

        UsuarioAdminDTO usuario2 = new UsuarioAdminDTO();
        usuario2.setIdUsuario(2);
        usuario2.setNombre("Maria");
        usuario2.setApellido("Lopez");

        List<UsuarioAdminDTO> usuarios = Arrays.asList(usuario1, usuario2);

        // Simula la respuesta del servicio
        when(adminService.obtenerTodosUsuarios()).thenReturn(usuarios);

        // Llamamos al método del controlador
        ResponseEntity<?> response = adminController.obtenerTodosUsuarios();

        // Verificar que la respuesta tiene un código 200 OK y la lista de usuarios esperada
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, ((List<UsuarioAdminDTO>) response.getBody()).size());
        assertEquals("Juan", ((List<UsuarioAdminDTO>) response.getBody()).get(0).getNombre());
    }

    // Test para crear un nuevo usuario
    @Test
    public void testCrearUsuario() {
        GestionUsuarioRequest request = new GestionUsuarioRequest();
        request.setCorreo("juan@example.com");
        request.setNombre("Juan");
        request.setApellido("Perez");
        request.setIdRol(2);

        UsuarioResponseDTO usuarioCreado = new UsuarioResponseDTO();
        usuarioCreado.setIdUsuario(1);
        usuarioCreado.setNombre("Juan");
        usuarioCreado.setCorreo("juan@example.com");

        // Simula la respuesta del servicio
        when(adminService.crearUsuario(request)).thenReturn(usuarioCreado);

        // Llamamos al método del controlador
        ResponseEntity<?> response = adminController.crearUsuario(request);

        // Verificar que la respuesta tiene un código 201 CREATED
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(usuarioCreado, response.getBody());
    }

    // Test para cambiar rol de usuario
    @Test
    public void testCambiarRolUsuario() {
        CambiarRolRequest request = new CambiarRolRequest();
        request.setIdUsuario(1);
        request.setNuevoRol(2);

        // Llamamos al método del controlador
        ResponseEntity<?> response = adminController.cambiarRolUsuario(request);

        // Verificar que la respuesta tiene un código 200 OK
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody() instanceof MensajeResponse);
        assertEquals("Rol de usuario actualizado exitosamente", ((MensajeResponse) response.getBody()).getMensaje());
    }

    // Test para cambiar estado de usuario
    @Test
    public void testCambiarEstadoUsuario() {
        CambiarEstadoRequest request = new CambiarEstadoRequest();
        request.setIdUsuario(1);
        request.setNuevoEstado(1);

        // Llamamos al método del controlador
        ResponseEntity<?> response = adminController.cambiarEstadoUsuario(request);

        // Verificar que la respuesta tiene un código 200 OK
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody() instanceof MensajeResponse);
        assertEquals("Estado de usuario actualizado exitosamente", ((MensajeResponse) response.getBody()).getMensaje());
    }
}