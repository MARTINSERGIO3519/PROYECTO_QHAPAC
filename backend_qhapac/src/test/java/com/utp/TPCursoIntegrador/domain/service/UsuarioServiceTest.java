package com.utp.TPCursoIntegrador.domain.service;

import com.utp.TPCursoIntegrador.market.domain.dto.*;
import com.utp.TPCursoIntegrador.market.domain.service.UsuarioService;
import com.utp.TPCursoIntegrador.market.persistence.entity.Credenciales;
import com.utp.TPCursoIntegrador.market.persistence.entity.Usuario;
import com.utp.TPCursoIntegrador.market.domain.repository.CredencialesRepository;
import com.utp.TPCursoIntegrador.market.domain.repository.UsuarioRepository;
import com.utp.TPCursoIntegrador.market.persistence.mapper.UsuarioMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private CredencialesRepository credencialesRepository;

    @Mock
    private UsuarioMapper usuarioMapper;

    @InjectMocks
    private UsuarioService usuarioService;

    private UsuarioRegistroDTO usuarioRegistroDTO;
    private CambiarContraseniaRequest cambiarContraseniaRequest;
    private ActualizarPerfilRequest actualizarPerfilRequest;
    private Usuario usuario;
    private Credenciales credenciales;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Inicializar DTO y entidades
        usuarioRegistroDTO = new UsuarioRegistroDTO();
        usuarioRegistroDTO.setCorreo("test@correo.com");
        usuarioRegistroDTO.setContrasenia("testPassword");
        usuarioRegistroDTO.setNombre("John");
        usuarioRegistroDTO.setApellido("Doe");

        cambiarContraseniaRequest = new CambiarContraseniaRequest();
        cambiarContraseniaRequest.setIdUsuario(1);
        cambiarContraseniaRequest.setContraseniaActual("testPassword");
        cambiarContraseniaRequest.setNuevaContrasenia("newPassword");

        actualizarPerfilRequest = new ActualizarPerfilRequest();
        actualizarPerfilRequest.setIdUsuario(1);
        actualizarPerfilRequest.setNombre("Jane");
        actualizarPerfilRequest.setApellido("Doe");

        usuario = new Usuario();
        usuario.setIdUsuario(1);
        usuario.setNombre("John");
        usuario.setApellido("Doe");

        credenciales = new Credenciales();
        credenciales.setIdUsuario(1);
        credenciales.setContrasenia("hashedPassword");
    }

    @Test
    void testActualizarPerfil_Success() {
        // Simulamos la búsqueda del usuario
        when(usuarioRepository.findById(1)).thenReturn(java.util.Optional.of(usuario));

        // Ejecutar el método
        usuarioService.actualizarPerfil(actualizarPerfilRequest);

        // Verificar la actualización y la interacción con el repositorio
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
        assertEquals("Jane", usuario.getNombre());
        assertEquals("Doe", usuario.getApellido());
    }

    @Test
    void testActualizarPerfil_UserNotFound() {
        // Simulamos que el usuario no se encuentra en la base de datos
        when(usuarioRepository.findById(1)).thenReturn(java.util.Optional.empty());

        // Ejecutar el método
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            usuarioService.actualizarPerfil(actualizarPerfilRequest);
        });

        // Verificar el mensaje de error
        assertEquals("Usuario no encontrado", exception.getMessage());
    }

    @Test
    void testCambiarContrasenia_IncorrectCurrentPassword() {
        // Simulamos que las credenciales existen, pero la contraseña actual es incorrecta
        credenciales.setContrasenia("incorrectPasswordHash");
        when(credencialesRepository.findByIdUsuario(1)).thenReturn(java.util.Optional.of(credenciales));

        // Ejecutar el método
        boolean result = usuarioService.cambiarContrasenia(cambiarContraseniaRequest);

        // Verificar que la contraseña no se cambió
        verify(credencialesRepository, times(0)).save(any(Credenciales.class));
        assertFalse(result);
    }
}