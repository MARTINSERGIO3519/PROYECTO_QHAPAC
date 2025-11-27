package com.utp.TPCursoIntegrador.persistence.entity;

import com.utp.TPCursoIntegrador.market.persistence.entity.Accion;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AccionTest {

    private Accion accion;

    @BeforeEach
    void setUp() {
        accion = new Accion();
        accion.setId_Accion(1);
        accion.setDescripcion_Accion("Acción de prueba");
    }

    @Test
    void testGettersAndSetters() {
        // Verificar getter y setter para id_Accion
        assertEquals(1, accion.getId_Accion());

        // Verificar getter y setter para descripcion_Accion
        assertEquals("Acción de prueba", accion.getDescripcion_Accion());
    }

    @Test
    void testToString() {
        // Esperado: "Accion{id_Accion=1, descripcion_Accion='Acción de prueba'}"
        String expectedToString = "Accion{id_Accion=1, descripcion_Accion='Acción de prueba'}";

        // Verificar el resultado del toString
        assertEquals(expectedToString, accion.toString());
    }
}