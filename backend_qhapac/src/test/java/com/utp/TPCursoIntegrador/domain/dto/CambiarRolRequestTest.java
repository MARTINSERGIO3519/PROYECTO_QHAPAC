package com.utp.TPCursoIntegrador.domain.dto;

import com.utp.TPCursoIntegrador.market.domain.dto.CambiarRolRequest;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CambiarRolRequestTest {

    @Test
    public void testGettersAndSetters() {
        CambiarRolRequest dto = new CambiarRolRequest();

        dto.setIdUsuario(1);
        dto.setNuevoRol(2);

        assertEquals(1, dto.getIdUsuario());
        assertEquals(2, dto.getNuevoRol());
    }

    @Test
    public void testConstructor() {
        CambiarRolRequest dto = new CambiarRolRequest(1, 2);

        assertEquals(1, dto.getIdUsuario());
        assertEquals(2, dto.getNuevoRol());
    }

    @Test
    public void testToString() {
        CambiarRolRequest dto = new CambiarRolRequest(1, 2);

        String str = dto.toString();
        assertNotNull(str);
        assertTrue(str.contains("1") || str.contains("2"));
    }
}