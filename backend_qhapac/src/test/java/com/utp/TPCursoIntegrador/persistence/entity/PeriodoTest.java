package com.utp.TPCursoIntegrador.persistence.entity;

import com.utp.TPCursoIntegrador.market.persistence.entity.Periodo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PeriodoTest {

    private Periodo periodo;

    @BeforeEach
    void setUp() {
        // Inicialización del objeto Periodo
        periodo = new Periodo();
        periodo.setId_Periodo(1);  // Establecer un valor para id_Periodo
        periodo.setNombre_Periodo("2023-2024");  // Establecer un valor para nombre_Periodo
    }

    @Test
    void testGettersAndSetters() {
        // Verificar getter y setter para id_Periodo
        assertEquals(1, periodo.getId_Periodo(), "El ID del periodo debería ser 1");

        // Verificar getter y setter para nombre_Periodo
        assertEquals("2023-2024", periodo.getNombre_Periodo(), "El nombre del periodo debería ser '2023-2024'");
    }

    @Test
    void testToString() {
        // Esperado: "Periodo{id_Periodo=1, nombre_Periodo='2023-2024'}"
        String expectedToString = "Periodo{" +
                "id_Periodo=" + periodo.getId_Periodo() +
                ", nombre_Periodo='" + periodo.getNombre_Periodo() + '\'' +
                '}';

        // Verificar el resultado del toString
        assertEquals(expectedToString, periodo.toString(), "El método toString no retorna la cadena esperada");
    }
}