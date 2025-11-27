package com.utp.TPCursoIntegrador.domain.dto;

import com.utp.TPCursoIntegrador.market.domain.dto.GestionUsuarioRequest;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class GestionUsuarioRequestTest {

    @Test
    public void testGettersAndSetters() {
        // Crear objeto usando el constructor
        GestionUsuarioRequest request = new GestionUsuarioRequest();
        request.setNombre("Juan");
        request.setApellido("Perez");
        request.setCorreo("juan.perez@example.com");
        request.setContrasenia("password123");
        request.setIdRol(1);
        request.setHorasSemanales(40.0f);

        // Verificar los valores usando los getters
        assertEquals("Juan", request.getNombre());
        assertEquals("Perez", request.getApellido());
        assertEquals("juan.perez@example.com", request.getCorreo());
        assertEquals("password123", request.getContrasenia());
        assertEquals(1, request.getIdRol());
        assertEquals(40.0f, request.getHorasSemanales());
    }

    @Test
    public void testConstructor() {
        // Crear objeto usando el constructor
        GestionUsuarioRequest request = new GestionUsuarioRequest("Juan", "Perez",
                "juan.perez@example.com",
                "password123", 1, 40.0f);

        // Verificar los valores asignados a través del constructor
        assertEquals("Juan", request.getNombre());
        assertEquals("Perez", request.getApellido());
        assertEquals("juan.perez@example.com", request.getCorreo());
        assertEquals("password123", request.getContrasenia());
        assertEquals(1, request.getIdRol());
        assertEquals(40.0f, request.getHorasSemanales());
    }

    @Test
    public void testToString() {
        // Crear objeto y asignar valores
        GestionUsuarioRequest request = new GestionUsuarioRequest();
        request.setNombre("Juan");
        request.setApellido("Perez");
        request.setCorreo("juan.perez@example.com");
        request.setContrasenia("password123");
        request.setIdRol(1);
        request.setHorasSemanales(40.0f);

        // Verificar que el toString() contiene los valores correctos
        String str = request.toString();
        assertNotNull(str);
        assertTrue(str.contains("Juan"));
        assertTrue(str.contains("Perez"));
        assertTrue(str.contains("juan.perez@example.com"));
        assertTrue(str.contains("password123"));
        assertTrue(str.contains("1"));
        assertTrue(str.contains("40.0"));
    }

    @Test
    public void testSettersAndGetters() {
        GestionUsuarioRequest request = new GestionUsuarioRequest();

        request.setNombre("Carlos");
        assertEquals("Carlos", request.getNombre());

        request.setApellido("Lopez");
        assertEquals("Lopez", request.getApellido());

        request.setCorreo("carlos.lopez@example.com");
        assertEquals("carlos.lopez@example.com", request.getCorreo());

        request.setContrasenia("newpassword");
        assertEquals("newpassword", request.getContrasenia());

        request.setIdRol(2);
        assertEquals(2, request.getIdRol());

        request.setHorasSemanales(35.0f);
        assertEquals(35.0f, request.getHorasSemanales());
    }
}