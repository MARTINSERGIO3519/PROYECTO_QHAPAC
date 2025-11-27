package com.utp.TPCursoIntegrador.web.controller;

import com.utp.TPCursoIntegrador.market.domain.service.AccionService;
import com.utp.TPCursoIntegrador.market.web.controller.AccionController;
import com.utp.TPCursoIntegrador.market.persistence.entity.Accion;
import com.utp.TPCursoIntegrador.market.domain.repository.AccionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AccionControllerTest {

    @InjectMocks
    private AccionController accionController;

    @Mock
    private AccionService accionService;

    @Mock
    private AccionRepository accionRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testObtenerAcciones() {
        // Crear los datos manualmente
        Accion accion1 = new Accion();
        accion1.setId_Accion(1);
        accion1.setDescripcion_Accion("Acción 1");

        Accion accion2 = new Accion();
        accion2.setId_Accion(2);
        accion2.setDescripcion_Accion("Acción 2");

        // Agregar los objetos a una lista
        List<Accion> acciones = Arrays.asList(accion1, accion2);

        // Simular el comportamiento del servicio
        when(accionService.obtenerAcciones()).thenReturn(acciones);

        // Llamar al método del controlador
        List<Accion> resultado = accionController.obtenerAcciones();

        // Verificar que el resultado es el esperado
        assertEquals(2, resultado.size());
        assertEquals(1, resultado.get(0).getId_Accion());
        assertEquals("Acción 1", resultado.get(0).getDescripcion_Accion());
        assertEquals(2, resultado.get(1).getId_Accion());
        assertEquals("Acción 2", resultado.get(1).getDescripcion_Accion());
    }
}