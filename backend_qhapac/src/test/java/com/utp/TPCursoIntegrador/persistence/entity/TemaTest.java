package com.utp.TPCursoIntegrador.persistence.entity;


import com.utp.TPCursoIntegrador.market.persistence.entity.Periodo;
import com.utp.TPCursoIntegrador.market.persistence.entity.Tema;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TemaTest {

    private Tema tema;
    private Periodo periodo;

    @BeforeEach
    void setUp() {
        // Inicializamos el Periodo
        periodo = new Periodo();
        periodo.setId_Periodo(1);
        periodo.setNombre_Periodo("2023-2024");

        // Inicializamos el Tema
        tema = new Tema();
        tema.setIdTema(1);
        tema.setNombreTema("Matemáticas");
        tema.setPeriodo(periodo);
    }

    @Test
    void testGettersAndSetters() {
        // Verificar getter y setter para idTema
        assertEquals(1, tema.getIdTema(), "El ID del tema debe ser 1");

        // Verificar getter y setter para nombreTema
        assertEquals("Matemáticas", tema.getNombreTema(), "El nombre del tema debe ser 'Matemáticas'");

        // Verificar getter y setter para periodo
        assertEquals(periodo, tema.getPeriodo(), "El periodo debe ser el esperado");
    }

    @Test
    void testToString() {
        String expectedToString = "Tema{" +
                "idTema=" + tema.getIdTema() +
                ", nombreTema='" + tema.getNombreTema() + '\'' +
                ", periodo=" + tema.getPeriodo() +
                '}';

        assertEquals(expectedToString, tema.toString(), "El método toString de Tema no devuelve la cadena esperada");
    }
}