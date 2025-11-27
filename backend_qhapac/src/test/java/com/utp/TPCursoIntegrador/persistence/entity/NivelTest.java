package com.utp.TPCursoIntegrador.persistence.entity;

import com.utp.TPCursoIntegrador.market.persistence.entity.Nivel;
import com.utp.TPCursoIntegrador.market.persistence.entity.Periodo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class NivelTest {

    private Nivel nivel;
    private Periodo periodo;

    @BeforeEach
    void setUp() {
        // Inicialización del objeto Periodo
        periodo = new Periodo();
        periodo.setId_Periodo(1);
        periodo.setNombre_Periodo("2023-2024");

        // Inicialización del objeto Nivel
        nivel = new Nivel();
        nivel.setId_Nivel(1);
        nivel.setNombre_Nivel("Nivel 1");
        nivel.setDesripcion_Nivel("Descripción del Nivel 1");
        nivel.setPeriodo(periodo);
    }

    @Test
    void testGettersAndSetters() {
        // Verificar getter y setter para id_Nivel
        assertEquals(1, nivel.getId_Nivel(), "El ID del nivel debería ser 1");

        // Verificar getter y setter para nombre_Nivel
        assertEquals("Nivel 1", nivel.getNombre_Nivel(), "El nombre del nivel debería ser 'Nivel 1'");

        // Verificar getter y setter para desripcion_Nivel
        assertEquals("Descripción del Nivel 1", nivel.getDesripcion_Nivel(), "La descripción del nivel debería ser 'Descripción del Nivel 1'");

        // Verificar getter y setter para periodo
        assertEquals(periodo, nivel.getPeriodo(), "El periodo debería ser el mismo que el asignado");
    }

    @Test
    void testToString() {
        // Esperado: "Nivel{id_Nivel=1, nombre_Nivel='Nivel 1', desripcion_Nivel='Descripción del Nivel 1', periodo=Periodo{id_Periodo=1, nombre_Periodo='2023-2024'}}"
        String expectedToString = "Nivel{" +
                "id_Nivel=" + nivel.getId_Nivel() +
                ", nombre_Nivel='" + nivel.getNombre_Nivel() + '\'' +
                ", desripcion_Nivel='" + nivel.getDesripcion_Nivel() + '\'' +
                ", periodo=" + nivel.getPeriodo() +
                '}';

        // Verificar el resultado del toString
        assertEquals(expectedToString, nivel.toString(), "El método toString no retorna la cadena esperada");
    }
}