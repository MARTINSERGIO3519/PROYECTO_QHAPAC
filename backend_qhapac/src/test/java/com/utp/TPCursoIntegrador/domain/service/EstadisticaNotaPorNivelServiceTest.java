package com.utp.TPCursoIntegrador.domain.service;

import com.utp.TPCursoIntegrador.market.domain.dto.Estadistica_Nota_Prom_Nivel_DTO;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class EstadisticaNotaPorNivelServiceTest {

    @Test
    void testToString() {
        // Crear una instancia de Estadistica_Nota_Prom_Nivel_DTO
        Estadistica_Nota_Prom_Nivel_DTO estadistica = new Estadistica_Nota_Prom_Nivel_DTO("Nivel 1", 85);

        // Verificar que el toString() funcione correctamente
        String expected = "Estadistica_Nota_Prom_Nivel_DTO{nombre_Nivel='Nivel 1', nota_Promedio_Por_Nivel=85}";
        assertEquals(expected, estadistica.toString());
    }

    @Test
    void testGettersAndSetters() {
        // Crear una instancia de Estadistica_Nota_Prom_Nivel_DTO
        Estadistica_Nota_Prom_Nivel_DTO estadistica = new Estadistica_Nota_Prom_Nivel_DTO("Nivel 2", 90);

        // Verificar los getters
        assertEquals("Nivel 2", estadistica.getNombre_Nivel());
        assertEquals(90, estadistica.getNota_Promedio_Por_Nivel());

        // Usar los setters
        estadistica.setNombre_Nivel("Nivel 3");
        estadistica.setNota_Promedio_Por_Nivel(95);

        // Verificar que los setters actualicen los valores correctamente
        assertEquals("Nivel 3", estadistica.getNombre_Nivel());
        assertEquals(95, estadistica.getNota_Promedio_Por_Nivel());
    }
}