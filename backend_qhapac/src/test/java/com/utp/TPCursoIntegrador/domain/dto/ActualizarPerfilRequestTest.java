package com.utp.TPCursoIntegrador.domain.dto;

import com.utp.TPCursoIntegrador.market.domain.dto.ActualizarPerfilRequest;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ActualizarPerfilRequestTest {

    @Test
    public void testGettersAndSetters() {
        ActualizarPerfilRequest dto = new ActualizarPerfilRequest();

        dto.setIdUsuario(1);
        dto.setNombre("Juan");
        dto.setApellido("Perez");

        assertEquals(1, dto.getIdUsuario());
        assertEquals("Juan", dto.getNombre());
        assertEquals("Perez", dto.getApellido());
    }

    @Test
    public void testToString() {
        ActualizarPerfilRequest dto = new ActualizarPerfilRequest();
        dto.setIdUsuario(1);
        dto.setNombre("Juan");
        dto.setApellido("Perez");

        String str = dto.toString();
        assertNotNull(str);
        assertTrue(str.contains("1") || str.contains("Juan") || str.contains("Perez"));
    }
}

