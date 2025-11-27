package com.utp.TPCursoIntegrador.persistence.entity;

import com.utp.TPCursoIntegrador.market.persistence.entity.Credenciales;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CredencialesTest {

    @Test
    public void testToString() {
        // Crear la instancia de Credenciales
        Credenciales credenciales = new Credenciales();
        credenciales.setIdCredencial(1);
        credenciales.setIdUsuario(101);
        credenciales.setCorreo("prueba@utp.edu.pe");
        credenciales.setContrasenia("secreta123");
        credenciales.setCodigoTemporal("123456");
        credenciales.setFechaExpiraCodigo(java.time.LocalDateTime.now().plusHours(1));

        // Verificar el resultado de toString
        String expectedToString = "Credenciales{idCredencial=1, idUsuario=101, correo='prueba@utp.edu.pe', contrasenia='secreta123', codigoTemporal='123456', fechaExpiraCodigo=" + credenciales.getFechaExpiraCodigo() + "}";
        assertEquals(expectedToString, credenciales.toString(), "El método toString() no devuelve el formato esperado.");
    }
}