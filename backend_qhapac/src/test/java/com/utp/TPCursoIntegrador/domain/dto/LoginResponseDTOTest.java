package com.utp.TPCursoIntegrador.domain.dto;

import com.utp.TPCursoIntegrador.market.domain.dto.LoginResponseDTO;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class LoginResponseDTOTest {

    @Test
    public void testGettersAndSetters() {
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        loginResponseDTO.setUsuarioId(1);
        loginResponseDTO.setNombre("Juan");
        loginResponseDTO.setApellido("Perez");
        loginResponseDTO.setCorreo("juan.perez@example.com");
        loginResponseDTO.setIdRol(2);

        assertEquals(1, loginResponseDTO.getUsuarioId());
        assertEquals("Juan", loginResponseDTO.getNombre());
        assertEquals("Perez", loginResponseDTO.getApellido());
        assertEquals("juan.perez@example.com", loginResponseDTO.getCorreo());
        assertEquals(2, loginResponseDTO.getIdRol());
    }

    @Test
    public void testConstructor() {
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO(1, "Juan", "Perez", "juan.perez@example.com", 2);

        assertEquals(1, loginResponseDTO.getUsuarioId());
        assertEquals("Juan", loginResponseDTO.getNombre());
        assertEquals("Perez", loginResponseDTO.getApellido());
        assertEquals("juan.perez@example.com", loginResponseDTO.getCorreo());
        assertEquals(2, loginResponseDTO.getIdRol());
    }

    @Test
    public void testToString() {
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO(1, "Juan", "Perez", "juan.perez@example.com", 2);

        // Verificar que el toString() devuelve la cadena correcta
        String expectedString = "LoginResponseDTO{" +
                "usuarioId=1" +
                ", nombre='Juan'" +
                ", apellido='Perez'" +
                ", correo='juan.perez@example.com'" +
                ", idRol=2" +
                '}';
        assertEquals(expectedString, loginResponseDTO.toString());
    }
}