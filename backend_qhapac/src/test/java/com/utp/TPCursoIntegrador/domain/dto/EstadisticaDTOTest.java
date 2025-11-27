package com.utp.TPCursoIntegrador.domain.dto;

import com.utp.TPCursoIntegrador.market.domain.dto.EstadisticaDTO;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class EstadisticaDTOTest {

    @Test
    public void testToString() {
        // Crear una instancia de EstadisticaDTO
        EstadisticaDTO estadistica = new EstadisticaDTO();
        estadistica.setNombreUsuario("Juan Pérez");
        estadistica.setPromedioPuntaje(85.5);
        estadistica.setPreguntasAcertadas(15);
        estadistica.setPreguntasFalladas(5);
        estadistica.setPartidasJugadas(10);

        // Obtener la salida de toString
        String expectedString = "EstadisticaDTO{" +
                "nombreUsuario='Juan Pérez'" +
                ", promedioPuntaje=85.5" +
                ", preguntasAcertadas=15" +
                ", preguntasFalladas=5" +
                ", partidasJugadas=10" +
                '}';

        String actualString = estadistica.toString();

        // Comprobar que la salida de toString es la esperada
        assertEquals(expectedString, actualString);
    }
}