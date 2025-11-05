package com.utp.TPCursoIntegrador.persistence.entity;

import com.utp.TPCursoIntegrador.market.persistence.entity.Estadistica_Nivel;
import com.utp.TPCursoIntegrador.market.persistence.entity.Nivel;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class Estadistica_NivelTest {

    private Estadistica_Nivel estadisticaNivel;
    private Nivel nivel;

    @BeforeEach
    void setUp() {
        // Inicializamos la entidad Nivel
        nivel = new Nivel();
        nivel.setId_Nivel(1);
        nivel.setNombre_Nivel("Nivel 1");
        nivel.setDesripcion_Nivel("Descripción del Nivel 1");

        // Inicializamos la entidad Estadistica_Nivel
        estadisticaNivel = new Estadistica_Nivel();
        estadisticaNivel.setId_Estadistica_Nivel(1);
        estadisticaNivel.setNivel(nivel);  // Asociamos el nivel
        estadisticaNivel.setNota_Promedio(85);
        estadisticaNivel.setFecha(LocalDate.of(2023, 10, 29));
        estadisticaNivel.setPartidas_Jugadas(100);
    }

    @Test
    void testGettersAndSetters() {
        // Verificar getter y setter para id_Estadistica_Nivel
        assertEquals(1, estadisticaNivel.getId_Estadistica_Nivel(), "El ID de estadística debería ser 1");

        // Verificar getter y setter para nivel
        assertEquals(nivel, estadisticaNivel.getNivel(), "El nivel debería ser el que hemos asignado");

        // Verificar getter y setter para nota_Promedio
        assertEquals(85, estadisticaNivel.getNota_Promedio(), "La nota promedio debería ser 85");

        // Verificar getter y setter para fecha
        assertEquals(LocalDate.of(2023, 10, 29), estadisticaNivel.getFecha(), "La fecha debería ser 2023-10-29");

        // Verificar getter y setter para partidas_Jugadas
        assertEquals(100, estadisticaNivel.getPartidas_Jugadas(), "El número de partidas jugadas debería ser 100");
    }

    @Test
    void testToString() {
        // Esperado: "Estadistica_Nivel{id_Estadistica_Nivel=1, nivel=Nivel{id_Nivel=1, nombre_Nivel='Nivel 1', desripcion_Nivel='Descripción del Nivel 1', periodo=null}, nota_Promedio=85, fecha=2023-10-29, partidas_Jugadas=100}"
        String expectedToString = "Estadistica_Nivel{" +
                "id_Estadistica_Nivel=" + estadisticaNivel.getId_Estadistica_Nivel() +
                ", nivel=" + estadisticaNivel.getNivel() +
                ", nota_Promedio=" + estadisticaNivel.getNota_Promedio() +
                ", fecha=" + estadisticaNivel.getFecha() +
                ", partidas_Jugadas=" + estadisticaNivel.getPartidas_Jugadas() +
                '}';

        // Verificar el resultado del toString
        assertEquals(expectedToString, estadisticaNivel.toString(), "El método toString no retorna la cadena esperada");
    }
}