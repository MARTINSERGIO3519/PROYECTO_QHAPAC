package com.utp.TPCursoIntegrador.domain.dto;

import com.utp.TPCursoIntegrador.market.domain.dto.RecuperarPasswordRequest;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class RecuperarPasswordRequestTest {

    @Test
    public void testToString() {
        // Crear una instancia de RecuperarPasswordRequest
        RecuperarPasswordRequest request = new RecuperarPasswordRequest();

        // Establecer un correo
        String correo = "usuario@ejemplo.com";
        request.setCorreo(correo);

        // Verificar que el método toString() devuelve la cadena esperada
        String expectedToString = "RecuperarPasswordRequest{correo='usuario@ejemplo.com'}";
        assertEquals(expectedToString, request.toString(), "El método toString() no devuelve la cadena esperada.");
    }

    @Test
    public void testToStringConCorreoNulo() {
        // Crear una instancia de RecuperarPasswordRequest sin correo
        RecuperarPasswordRequest request = new RecuperarPasswordRequest();

        // Verificar que el método toString() devuelve la cadena esperada cuando el correo es null
        String expectedToString = "RecuperarPasswordRequest{correo='null'}";
        assertEquals(expectedToString, request.toString(), "El método toString() no maneja correctamente el valor null.");
    }
}