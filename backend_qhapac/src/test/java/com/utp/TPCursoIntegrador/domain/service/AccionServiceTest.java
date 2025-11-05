package com.utp.TPCursoIntegrador.domain.service;

import com.utp.TPCursoIntegrador.market.domain.repository.AccionRepository;
import com.utp.TPCursoIntegrador.market.persistence.entity.Accion;
import com.utp.TPCursoIntegrador.market.domain.service.AccionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;

public class AccionServiceTest {

    @Mock
    private AccionRepository accionRepository;  // Mock del repositorio

    @InjectMocks
    private AccionService accionService; // Inyecta el mock en el servicio

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);  // Inicializa los mocks
    }

    @Test
    void testObtenerAcciones() {
        // Datos de prueba
        Accion accion1 = new Accion();
        accion1.setDescripcion_Accion("Acción 1");

        Accion accion2 = new Accion();
        accion2.setDescripcion_Accion("Acción 2");

        // Simula el comportamiento del repositorio
        when(accionRepository.findAll()).thenReturn(Arrays.asList(accion1, accion2));

        // Llamada al servicio
        List<Accion> acciones = accionService.obtenerAcciones();

        // Verifica los resultados
        assertNotNull(acciones);
        assertEquals(2, acciones.size());
        assertEquals("Acción 1", acciones.get(0).getDescripcion_Accion());
        assertEquals("Acción 2", acciones.get(1).getDescripcion_Accion());

        // Verifica que el repositorio fue llamado
        verify(accionRepository, times(1)).findAll();
    }
}