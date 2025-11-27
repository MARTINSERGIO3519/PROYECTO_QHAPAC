package com.utp.TPCursoIntegrador.domain.dto;

import com.utp.TPCursoIntegrador.market.domain.dto.UserDTO;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class UserDTOTest {

    @Test
    public void testToString() {
        // Crear una instancia de UserDTO
        UserDTO user = new UserDTO();
        user.setIdUsuario(1);
        user.setNombre("Juan Pérez");
        user.setCorreo("juan.perez@email.com");
        user.setRol("Admin");
        user.setContrasena("password123");

        // Obtener la salida de toString
        String expectedString = "UserDTO{idUsuario=1, nombre='Juan Pérez', correo='juan.perez@email.com', rol='Admin', contrasena='********'}";
        String actualString = user.toString();

        // Comprobar que la salida de toString es la esperada
        assertEquals(expectedString, actualString);
    }
}