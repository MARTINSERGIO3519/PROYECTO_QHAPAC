package com.utp.TPCursoIntegrador.persistence.entity;

import com.utp.TPCursoIntegrador.market.persistence.entity.Preguntas;
import com.utp.TPCursoIntegrador.market.persistence.entity.Respuestas;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class RespuestasTest {

    @Test
    void testGettersAndSetters() {
        Respuestas respuesta = new Respuestas();
        respuesta.setIdRespuesta(1);
        respuesta.setTexto("Respuesta correcta");
        respuesta.setEsCorrecta(true);

        // Crear un objeto Preguntas para asociar
        Preguntas pregunta = new Preguntas();
        pregunta.setIdPregunta(1); // Asignamos un ID de pregunta
        respuesta.setPregunta(pregunta);

        // Verificar que los valores se asignan correctamente
        assertEquals(1, respuesta.getIdRespuesta());
        assertEquals("Respuesta correcta", respuesta.getTexto());
        assertTrue(respuesta.getEsCorrecta());
        assertEquals(1, respuesta.getPregunta().getIdPregunta()); // Verificamos la relación
    }

    @Test
    void testToString() {
        // Crear una instancia de Respuestas
        Respuestas respuesta = new Respuestas();
        respuesta.setIdRespuesta(1);
        respuesta.setTexto("Respuesta correcta");
        respuesta.setEsCorrecta(true);

        // Crear un objeto Preguntas para asociar
        Preguntas pregunta = new Preguntas();
        pregunta.setIdPregunta(1); // Asignamos un ID de pregunta
        respuesta.setPregunta(pregunta);

        // Verificar que el toString() funcione correctamente
        String expected = "Respuestas{idRespuesta=1, texto='Respuesta correcta', esCorrecta=true, pregunta=" +
                "Preguntas{idPregunta=1, enunciado='null', nivel='null', fechaCreacion=null, tema=null, respuestas=null}}";

        // Verificar si el toString de Respuestas contiene la cadena esperada
        assertTrue(respuesta.toString().contains("Respuestas"));
        assertTrue(respuesta.toString().contains("idRespuesta=1"));
        assertTrue(respuesta.toString().contains("texto='Respuesta correcta'"));
        assertTrue(respuesta.toString().contains("esCorrecta=true"));

        // Verificar si el toString de Respuestas contiene la cadena esperada de Preguntas (ya que Preguntas está asociado)
        assertTrue(respuesta.toString().contains("pregunta=" + pregunta.toString())); // Verificamos si el toString de Preguntas está en el de Respuestas
    }
}