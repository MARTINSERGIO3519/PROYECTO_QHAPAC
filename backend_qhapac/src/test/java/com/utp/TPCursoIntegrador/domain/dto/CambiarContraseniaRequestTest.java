package com.utp.TPCursoIntegrador.domain.dto;


import com.utp.TPCursoIntegrador.market.domain.dto.CambiarContraseniaRequest;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CambiarContraseniaRequestTest {

    @Test
    public void testGettersAndSetters() {
        CambiarContraseniaRequest dto = new CambiarContraseniaRequest();

        dto.setIdUsuario(1);
        dto.setContraseniaActual("oldPassword123");
        dto.setNuevaContrasenia("newPassword123");

        assertEquals(1, dto.getIdUsuario());
        assertEquals("oldPassword123", dto.getContraseniaActual());
        assertEquals("newPassword123", dto.getNuevaContrasenia());
    }

    @Test
    public void testToString() {
        CambiarContraseniaRequest dto = new CambiarContraseniaRequest();
        dto.setIdUsuario(1);
        dto.setContraseniaActual("oldPassword123");
        dto.setNuevaContrasenia("newPassword123");

        String str = dto.toString();
        assertNotNull(str);
        assertTrue(str.contains("1") || str.contains("oldPassword123") || str.contains("newPassword123"));
    }
}