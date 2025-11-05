package com.utp.TPCursoIntegrador.persistence.mapper;

import com.utp.TPCursoIntegrador.market.domain.dto.UsuarioRegistroDTO;
import com.utp.TPCursoIntegrador.market.domain.dto.UsuarioResponseDTO;
import com.utp.TPCursoIntegrador.market.domain.service.ConfiguracionService;
import com.utp.TPCursoIntegrador.market.persistence.entity.Usuario;
import com.utp.TPCursoIntegrador.market.persistence.entity.Credenciales;
import com.utp.TPCursoIntegrador.market.persistence.mapper.UsuarioMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class UsuarioMapperTest {

    @InjectMocks
    private UsuarioMapper usuarioMapper;

    @Mock
    private ConfiguracionService configuracionService;

    private UsuarioRegistroDTO usuarioRegistroDTO;

    @BeforeEach
    void setUp() {
        // Inicializamos los mocks
        MockitoAnnotations.openMocks(this);

        // Creamos el objeto UsuarioRegistroDTO de prueba
        usuarioRegistroDTO = new UsuarioRegistroDTO();
        usuarioRegistroDTO.setNombre("Juan");
        usuarioRegistroDTO.setApellido("Pérez");
        usuarioRegistroDTO.setCorreo("juan.perez@mail.com");
        usuarioRegistroDTO.setHorasSemanales(40.0f);  // Usando Float aquí
    }

    @Test
    void testToUsuarioEntity() {
        // Mock de las dependencias
        when(configuracionService.getRolPorDefecto()).thenReturn(1);
        when(configuracionService.getEstadoUsuarioPorDefecto()).thenReturn(1);

        // Llamamos al método a probar
        Usuario usuario = usuarioMapper.toUsuarioEntity(usuarioRegistroDTO);

        // Validamos los resultados
        assertNotNull(usuario);
        assertEquals("Juan", usuario.getNombre());
        assertEquals("Pérez", usuario.getApellido());
        assertEquals(1, usuario.getIdRol());
        assertEquals(40.0f, usuario.getHorasSemanales());  // Usando Float aquí
        assertNotNull(usuario.getFechaRegistro());
    }

    @Test
    void testToCredencialesEntity() {
        // Datos de prueba
        Integer usuarioId = 1;
        String contraseniaHash = "hash_contrasenia";

        // Llamamos al método a probar
        Credenciales credenciales = usuarioMapper.toCredencialesEntity(usuarioRegistroDTO, usuarioId, contraseniaHash);

        // Validamos los resultados
        assertNotNull(credenciales);
        assertEquals(usuarioId, credenciales.getIdUsuario());
        assertEquals("juan.perez@mail.com", credenciales.getCorreo());
        assertEquals(contraseniaHash, credenciales.getContrasenia());
    }

    @Test
    void testToUsuarioResponseDTO() {
        // Creamos un objeto Usuario para probar
        Usuario usuario = new Usuario();
        usuario.setIdUsuario(1);
        usuario.setNombre("Juan");
        usuario.setApellido("Pérez");
        usuario.setFechaRegistro(LocalDateTime.now());

        // Llamamos al método a probar
        UsuarioResponseDTO responseDTO = usuarioMapper.toUsuarioResponseDTO(usuario, "juan.perez@mail.com");

        // Validamos los resultados
        assertNotNull(responseDTO);
        assertEquals(1, responseDTO.getIdUsuario());
        assertEquals("Juan", responseDTO.getNombre());
        assertEquals("Pérez", responseDTO.getApellido());
        assertEquals("juan.perez@mail.com", responseDTO.getCorreo());
    }
}