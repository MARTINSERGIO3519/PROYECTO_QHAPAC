package com.utp.TPCursoIntegrador.domain.dto;

import com.utp.TPCursoIntegrador.market.domain.dto.LoginDTO;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class LoginDTOTest {

    @Test
    public void testGettersAndSetters() {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setCorreo("juan.perez@example.com");
        loginDTO.setContrasenia("password123");

        assertEquals("juan.perez@example.com", loginDTO.getCorreo());
        assertEquals("password123", loginDTO.getContrasenia());
    }

    @Test
    public void testConstructor() {
        LoginDTO loginDTO = new LoginDTO("juan.perez@example.com", "password123");

        assertEquals("juan.perez@example.com", loginDTO.getCorreo());
        assertEquals("password123", loginDTO.getContrasenia());
    }

    @Test
    public void testToString() {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setCorreo("juan.perez@example.com");
        loginDTO.setContrasenia("password123");

        // Verificar que el toString() devuelve los valores correctos
        String expectedString = "LoginDTO{correo='juan.perez@example.com', contrasenia='password123'}";
        assertEquals(expectedString, loginDTO.toString());
    }

    @Test
    public void testValidation() {
        LoginDTO loginDTO = new LoginDTO();

        loginDTO.setCorreo("");
        assertFalse(validateLoginDTO(loginDTO));

        loginDTO.setContrasenia("");
        assertFalse(validateLoginDTO(loginDTO));

        loginDTO.setCorreo("juan.perez@example.com");
        loginDTO.setContrasenia("password123");
        assertTrue(validateLoginDTO(loginDTO));
    }

    private boolean validateLoginDTO(LoginDTO loginDTO) {
        return loginDTO.getCorreo() != null && !loginDTO.getCorreo().isEmpty() &&
                loginDTO.getContrasenia() != null && !loginDTO.getContrasenia().isEmpty();
    }
}