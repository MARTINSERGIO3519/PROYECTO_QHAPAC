package com.utp.TPCursoIntegrador.persistence.entity;

import com.utp.TPCursoIntegrador.market.persistence.entity.Preguntas;
import com.utp.TPCursoIntegrador.market.persistence.entity.Tema;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class PreguntasTest {

    private Preguntas pregunta;
    private Tema tema;

    @BeforeEach
    void setUp() {
        // Inicializamos el Tema
        tema = new Tema();
        tema.setIdTema(1);
        tema.setNombreTema("Matemáticas");

        // Inicializamos la Pregunta
        pregunta = new Preguntas();
        pregunta.setIdPregunta(1);
        pregunta.setEnunciado("¿Cuál es la raíz cuadrada de 16?");
        pregunta.setNivel("Fácil");
        pregunta.setFechaCreacion(LocalDateTime.of(2023, 10, 29, 10, 0));
        pregunta.setTema(tema);
    }

    @Test
    void testGettersAndSetters() {
        // Verificar getter y setter para idPregunta
        assertEquals(1, pregunta.getIdPregunta(), "El ID de la pregunta debe ser 1");

        // Verificar getter y setter para enunciado
        assertEquals("¿Cuál es la raíz cuadrada de 16?", pregunta.getEnunciado(), "El enunciado debe ser el correcto");

        // Verificar getter y setter para nivel
        assertEquals("Fácil", pregunta.getNivel(), "El nivel debe ser 'Fácil'");

        // Verificar getter y setter para fechaCreacion
        assertEquals(LocalDateTime.of(2023, 10, 29, 10, 0), pregunta.getFechaCreacion(), "La fecha de creación debe ser la correcta");

        // Verificar getter y setter para tema
        assertEquals(tema, pregunta.getTema(), "El tema debe ser el que hemos asignado");
    }

    @Test
    void testToString() {
        String expectedToString = "Preguntas{" +
                "idPregunta=" + pregunta.getIdPregunta() +
                ", enunciado='" + pregunta.getEnunciado() + '\'' +
                ", nivel='" + pregunta.getNivel() + '\'' +
                ", fechaCreacion=" + pregunta.getFechaCreacion() +
                ", tema=" + pregunta.getTema() +
                ", respuestas=null" + // Como aún no hemos asignado respuestas
                '}';

        assertEquals(expectedToString, pregunta.toString(), "El método toString de Preguntas no devuelve la cadena esperada");
    }
}