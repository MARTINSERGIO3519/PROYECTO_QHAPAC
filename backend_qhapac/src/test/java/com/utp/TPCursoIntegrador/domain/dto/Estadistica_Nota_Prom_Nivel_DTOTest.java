package com.utp.TPCursoIntegrador.domain.dto;

import com.utp.TPCursoIntegrador.market.domain.dto.Estadistica_Nota_Prom_Nivel_DTO;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class Estadistica_Nota_Prom_Nivel_DTOTest {

    @Test
    public void testConstructorAndGetters() {
        // Crear una instancia de la clase usando el constructor
        Estadistica_Nota_Prom_Nivel_DTO estadistica = new Estadistica_Nota_Prom_Nivel_DTO("Nivel 1", 85);

        // Verificar que los valores se asignaron correctamente
        assertEquals("Nivel 1", estadistica.getNombre_Nivel());
        assertEquals(85, estadistica.getNota_Promedio_Por_Nivel());
    }

    @Test
    public void testSetters() {
        // Crear una instancia de la clase usando el constructor vacío
        Estadistica_Nota_Prom_Nivel_DTO estadistica = new Estadistica_Nota_Prom_Nivel_DTO("", 0);

        // Establecer valores usando los setters
        estadistica.setNombre_Nivel("Nivel 2");
        estadistica.setNota_Promedio_Por_Nivel(90);

        // Verificar que los valores fueron establecidos correctamente
        assertEquals("Nivel 2", estadistica.getNombre_Nivel());
        assertEquals(90, estadistica.getNota_Promedio_Por_Nivel());
    }

    @Test
    public void testToString() {
        // Crear una instancia de la clase
        Estadistica_Nota_Prom_Nivel_DTO estadistica = new Estadistica_Nota_Prom_Nivel_DTO("Nivel 3", 95);

        // Comprobar que el resultado del toString es el esperado
        String expected = "Estadistica_Nota_Prom_Nivel_DTO{nombre_Nivel='Nivel 3', nota_Promedio_Por_Nivel=95}";
        assertEquals(expected, estadistica.toString());
    }
}