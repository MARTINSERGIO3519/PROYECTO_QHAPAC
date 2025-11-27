package com.utp.TPCursoIntegrador.persistence.entity;

import com.utp.TPCursoIntegrador.market.persistence.entity.Usuario;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

class UsuarioTest {

    @Test
    void testGettersAndSetters() {
        // Crear una instancia de Usuario
        Usuario usuario = new Usuario();
        usuario.setIdUsuario(1);
        usuario.setIdRol(2);
        usuario.setNombre("Juan");
        usuario.setApellido("Pérez");
        usuario.setExperienciaTotal(500f);
        usuario.setExperienciaSemanal(50f);
        usuario.setHorasSemanales(10f);
        usuario.setFechaRegistro(LocalDateTime.now());
        usuario.setIdEstadoUsuario(1);

        // Verificar que los valores se han asignado correctamente
        assertEquals(1, usuario.getIdUsuario());
        assertEquals(2, usuario.getIdRol());
        assertEquals("Juan", usuario.getNombre());
        assertEquals("Pérez", usuario.getApellido());
        assertEquals(500f, usuario.getExperienciaTotal());
        assertEquals(50f, usuario.getExperienciaSemanal());
        assertEquals(10f, usuario.getHorasSemanales());
        assertNotNull(usuario.getFechaRegistro());
        assertEquals(1, usuario.getIdEstadoUsuario());
    }

    @Test
    void testToString() {
        // Crear una instancia de Usuario
        Usuario usuario = new Usuario();
        usuario.setIdUsuario(1);
        usuario.setIdRol(2);
        usuario.setNombre("Juan");
        usuario.setApellido("Pérez");
        usuario.setExperienciaTotal(500f);
        usuario.setExperienciaSemanal(50f);
        usuario.setHorasSemanales(10f);
        usuario.setFechaRegistro(LocalDateTime.now());
        usuario.setIdEstadoUsuario(1);

        // Verificar que el toString() funcione correctamente
        String expected = "Usuario{idUsuario=1, idRol=2, nombre='Juan', apellido='Pérez', experienciaTotal=500.0, experienciaSemanal=50.0, horasSemanales=10.0, fechaRegistro=" + usuario.getFechaRegistro() + ", idEstadoUsuario=1}";
        assertTrue(usuario.toString().contains("Usuario"));
        assertTrue(usuario.toString().contains("Juan"));
    }
}