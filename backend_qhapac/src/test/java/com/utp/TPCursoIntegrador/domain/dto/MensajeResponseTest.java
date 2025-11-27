package com.utp.TPCursoIntegrador.domain.dto;

import com.utp.TPCursoIntegrador.market.domain.dto.MensajeResponse;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class MensajeResponseTest {

    @Test
    public void testMensajeResponse() {
        // Crear una instancia de MensajeResponse
        MensajeResponse mensajeResponse = new MensajeResponse("Mensaje de prueba");

        // Verificar que el mensaje se estableció correctamente en el constructor
        assertEquals("Mensaje de prueba", mensajeResponse.getMensaje(), "El mensaje debería ser 'Mensaje de prueba'");

        // Cambiar el mensaje usando el setter
        mensajeResponse.setMensaje("Nuevo mensaje");

        // Verificar que el mensaje fue actualizado correctamente
        assertEquals("Nuevo mensaje", mensajeResponse.getMensaje(), "El mensaje debería ser 'Nuevo mensaje'");
    }

    @Test
    public void testMensajeResponseConstructorVacio() {
        // Crear una instancia de MensajeResponse sin mensaje inicial
        MensajeResponse mensajeResponse = new MensajeResponse();

        // Verificar que el mensaje esté vacío por defecto
        assertNull(mensajeResponse.getMensaje(), "El mensaje debería ser null por defecto");

        // Establecer un mensaje usando el setter
        mensajeResponse.setMensaje("Mensaje seteado");

        // Verificar que el mensaje se haya establecido correctamente
        assertEquals("Mensaje seteado", mensajeResponse.getMensaje(), "El mensaje debería ser 'Mensaje seteado'");
    }
}