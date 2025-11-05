package com.utp.TPCursoIntegrador.domain.service;

import com.utp.TPCursoIntegrador.market.domain.repository.UsuarioRepository;
import com.utp.TPCursoIntegrador.market.domain.repository.CredencialesRepository;
import com.utp.TPCursoIntegrador.market.domain.service.AdminService;
import com.utp.TPCursoIntegrador.market.persistence.mapper.UsuarioMapper;
import com.utp.TPCursoIntegrador.market.persistence.entity.Usuario;
import com.utp.TPCursoIntegrador.market.persistence.entity.Credenciales;
import com.utp.TPCursoIntegrador.market.domain.dto.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class AdminServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private CredencialesRepository credencialesRepository;

    @Mock
    private UsuarioMapper usuarioMapper;

    @InjectMocks
    private AdminService adminService;

    private Usuario usuario;
    private Credenciales credenciales;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Inicializamos objetos de prueba
        usuario = new Usuario();
        usuario.setIdUsuario(1);
        usuario.setNombre("Juan");
        usuario.setApellido("Pérez");
        usuario.setIdRol(1);
        usuario.setIdEstadoUsuario(1); // Activo

        credenciales = new Credenciales();
        credenciales.setIdUsuario(1);
        credenciales.setCorreo("juan.perez@example.com");
        credenciales.setContrasenia("hashedPassword");
    }

    @Test
    void testObtenerTodosUsuarios() {
        // Simulamos la respuesta de los repositorios
        when(usuarioRepository.findAll()).thenReturn(Arrays.asList(usuario));
        when(credencialesRepository.findByIdUsuario(1)).thenReturn(Optional.of(credenciales));

        // Llamamos al método a testear
        List<UsuarioAdminDTO> usuariosDTO = adminService.obtenerTodosUsuarios();

        // Verificamos que el repositorio fue llamado
        verify(usuarioRepository, times(1)).findAll();
        verify(credencialesRepository, times(1)).findByIdUsuario(1);

        // Validamos que la lista no sea vacía
        assertNotNull(usuariosDTO);
        assertFalse(usuariosDTO.isEmpty());
    }

    @Test
    void testCrearUsuario() {
        // Simulamos la creación de usuario
        GestionUsuarioRequest request = new GestionUsuarioRequest();
        request.setNombre("Carlos");
        request.setApellido("Gomez");
        request.setCorreo("carlos.gomez@example.com");
        request.setContrasenia("1234");
        request.setHorasSemanales(10.0f);
        request.setIdRol(2);

        when(credencialesRepository.existsByCorreo(request.getCorreo())).thenReturn(false);
        when(usuarioMapper.toUsuarioEntity(any(UsuarioRegistroDTO.class))).thenReturn(usuario);
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);
        when(usuarioMapper.toCredencialesEntity(any(UsuarioRegistroDTO.class), anyInt(), anyString())).thenReturn(credenciales);
        when(credencialesRepository.save(any(Credenciales.class))).thenReturn(credenciales);
        when(usuarioMapper.toUsuarioResponseDTO(any(Usuario.class), anyString())).thenReturn(new UsuarioResponseDTO());

        // Llamamos al método
        UsuarioResponseDTO response = adminService.crearUsuario(request);

        // Verificamos que los repositorios hayan sido llamados
        verify(credencialesRepository, times(1)).existsByCorreo(request.getCorreo());
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
        verify(credencialesRepository, times(1)).save(any(Credenciales.class));

        // Comprobamos que el DTO de respuesta no sea null
        assertNotNull(response);
    }

    @Test
    void testCambiarRolUsuario() {
        CambiarRolRequest request = new CambiarRolRequest();
        request.setIdUsuario(1);
        request.setNuevoRol(2);

        when(usuarioRepository.findById(1)).thenReturn(Optional.of(usuario));

        // Llamamos al método
        adminService.cambiarRolUsuario(request);

        // Verificamos que el rol se haya actualizado
        assertEquals(2, usuario.getIdRol());
        verify(usuarioRepository, times(1)).save(usuario);
    }

    @Test
    void testObtenerEstadisticasSistema() {
        // Simulamos que el repositorio cuente los usuarios
        when(usuarioRepository.count()).thenReturn(10L);
        when(usuarioRepository.countByIdRol(1)).thenReturn(2L);
        when(usuarioRepository.countByIdRol(2)).thenReturn(8L);
        when(usuarioRepository.countByIdEstadoUsuario(1)).thenReturn(8L);

        // Llamamos al método
        EstadisticasSistemaDTO stats = adminService.obtenerEstadisticasSistema();

        // Verificamos los valores de las estadísticas
        assertNotNull(stats);
        assertEquals(10L, stats.getTotalUsuarios());
        assertEquals(2L, stats.getAdministradores());
        assertEquals(8L, stats.getUsuariosNormales());
        assertEquals(8L, stats.getUsuariosActivos());
    }
}