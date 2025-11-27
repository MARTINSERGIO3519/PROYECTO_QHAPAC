package com.utp.TPCursoIntegrador.domain.service;

import com.utp.TPCursoIntegrador.market.domain.dto.LoginDTO;
import com.utp.TPCursoIntegrador.market.domain.dto.LoginResponseDTO;
import com.utp.TPCursoIntegrador.market.domain.service.AuthService;
import com.utp.TPCursoIntegrador.market.persistence.entity.Credenciales;
import com.utp.TPCursoIntegrador.market.persistence.entity.Usuario;
import com.utp.TPCursoIntegrador.market.domain.repository.CredencialesRepository;
import com.utp.TPCursoIntegrador.market.domain.repository.UsuarioRepository;
import com.google.common.hash.Hashing;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class AuthServiceTest {

    @Mock
    private CredencialesRepository credencialesRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private AuthService authService;

    private Credenciales credenciales;
    private Usuario usuario;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Inicializamos los objetos de prueba
        credenciales = new Credenciales();
        credenciales.setIdUsuario(1);
        credenciales.setCorreo("juan.perez@example.com");
        credenciales.setContrasenia(Hashing.sha256()
                .hashString("password123", StandardCharsets.UTF_8)
                .toString());

        usuario = new Usuario();
        usuario.setIdUsuario(1);
        usuario.setNombre("Juan");
        usuario.setApellido("Pérez");
        usuario.setIdEstadoUsuario(1); // Activo
        usuario.setIdRol(1);
    }

    @Test
    void testAutenticarUsuario_Success() {
        // Simulamos la búsqueda de las credenciales y el usuario
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setCorreo("juan.perez@example.com");
        loginDTO.setContrasenia("password123");

        when(credencialesRepository.findByCorreo(loginDTO.getCorreo())).thenReturn(Optional.of(credenciales));
        when(usuarioRepository.findById(credenciales.getIdUsuario())).thenReturn(Optional.of(usuario));

        // Llamamos al método
        LoginResponseDTO response = authService.autenticarUsuario(loginDTO);

        // Verificamos que los métodos fueron llamados
        verify(credencialesRepository, times(1)).findByCorreo(loginDTO.getCorreo());
        verify(usuarioRepository, times(1)).findById(credenciales.getIdUsuario());

        // Validamos la respuesta
        assertNotNull(response);
        assertEquals(usuario.getNombre(), response.getNombre());
        assertEquals(usuario.getApellido(), response.getApellido());
        assertEquals(loginDTO.getCorreo(), response.getCorreo());
        assertEquals(usuario.getIdRol(), response.getIdRol());
    }

    @Test
    void testAutenticarUsuario_InvalidCredentials() {
        // Simulamos un caso donde el correo no se encuentra
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setCorreo("wrong.email@example.com");
        loginDTO.setContrasenia("wrongpassword");

        when(credencialesRepository.findByCorreo(loginDTO.getCorreo())).thenReturn(Optional.empty());

        // Verificamos que se lance la excepción
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            authService.autenticarUsuario(loginDTO);
        });

        assertEquals("Credenciales inválidas", exception.getMessage());
    }

    @Test
    void testAutenticarUsuario_UserInactive() {
        // Simulamos que el usuario está inactivo
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setCorreo("juan.perez@example.com");
        loginDTO.setContrasenia("password123");

        credenciales.setIdUsuario(1);
        usuario.setIdEstadoUsuario(0); // Inactivo

        when(credencialesRepository.findByCorreo(loginDTO.getCorreo())).thenReturn(Optional.of(credenciales));
        when(usuarioRepository.findById(credenciales.getIdUsuario())).thenReturn(Optional.of(usuario));

        // Verificamos que se lance la excepción
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            authService.autenticarUsuario(loginDTO);
        });

        assertEquals("Usuario inactivo o bloqueado", exception.getMessage());
    }

    @Test
    void testAutenticarUsuario_WrongPassword() {
        // Simulamos un caso donde la contraseña es incorrecta
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setCorreo("juan.perez@example.com");
        loginDTO.setContrasenia("wrongpassword");

        credenciales.setIdUsuario(1);

        when(credencialesRepository.findByCorreo(loginDTO.getCorreo())).thenReturn(Optional.of(credenciales));

        // Verificamos que se lance la excepción
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            authService.autenticarUsuario(loginDTO);
        });

        assertEquals("Credenciales inválidas", exception.getMessage());
    }
}