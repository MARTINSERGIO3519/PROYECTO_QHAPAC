package com.utp.TPCursoIntegrador.domain.dto;

import com.utp.TPCursoIntegrador.market.domain.dto.ResetPasswordRequest;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ResetPasswordRequestTest {

    @Test
    public void testResetPasswordRequest() {
        // Crear una instancia de ResetPasswordRequest
        ResetPasswordRequest request = new ResetPasswordRequest();

        // Establecer valores para los atributos
        String codigoTemporal = "ABC123";
        String nuevaContrasenia = "nuevaContrasenia123";
        request.setCodigoTemporal(codigoTemporal);
        request.setNuevaContrasenia(nuevaContrasenia);

        // Verificar que los valores se asignaron correctamente
        assertEquals(codigoTemporal, request.getCodigoTemporal(), "El código temporal no se asignó correctamente.");
        assertEquals(nuevaContrasenia, request.getNuevaContrasenia(), "La nueva contraseña no se asignó correctamente.");
    }

    @Test
    public void testToString() {
        // Crear una instancia de ResetPasswordRequest con valores establecidos
        ResetPasswordRequest request = new ResetPasswordRequest();
        String codigoTemporal = "ABC123";
        String nuevaContrasenia = "nuevaContrasenia123";
        request.setCodigoTemporal(codigoTemporal);
        request.setNuevaContrasenia(nuevaContrasenia);

        // Verificar que el método toString() devuelve la cadena esperada
        String expectedToString = "ResetPasswordRequest{codigoTemporal='ABC123', nuevaContrasenia='nuevaContrasenia123'}";
        assertEquals(expectedToString, request.toString(), "El método toString() no devuelve la cadena esperada.");
    }

    @Test
    public void testToStringConValoresNulos() {
        // Crear una instancia de ResetPasswordRequest sin valores
        ResetPasswordRequest request = new ResetPasswordRequest();

        // Verificar que el método toString() maneja correctamente los valores nulos
        String expectedToString = "ResetPasswordRequest{codigoTemporal='null', nuevaContrasenia='null'}";
        assertEquals(expectedToString, request.toString(), "El método toString() no maneja correctamente los valores null.");
    }
}