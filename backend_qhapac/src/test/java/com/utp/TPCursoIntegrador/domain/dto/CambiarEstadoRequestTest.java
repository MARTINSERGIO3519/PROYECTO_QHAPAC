package com.utp.TPCursoIntegrador.domain.dto;

import com.utp.TPCursoIntegrador.market.domain.dto.CambiarEstadoRequest;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CambiarEstadoRequestTest {

    @Test
    public void testGettersAndSetters() {
        CambiarEstadoRequest dto = new CambiarEstadoRequest();

        dto.setIdUsuario(1);
        dto.setNuevoEstado(2);

        assertEquals(1, dto.getIdUsuario());
        assertEquals(2, dto.getNuevoEstado());
    }

    @Test
    public void testConstructor() {
        CambiarEstadoRequest dto = new CambiarEstadoRequest(1, 2);

        assertEquals(1, dto.getIdUsuario());
        assertEquals(2, dto.getNuevoEstado());
    }

    @Test
    public void testToString() {
        CambiarEstadoRequest dto = new CambiarEstadoRequest(1, 2);

        String str = dto.toString();
        assertNotNull(str);
        assertTrue(str.contains("1") || str.contains("2"));
    }
}