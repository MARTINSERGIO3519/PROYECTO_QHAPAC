package com.utp.TPCursoIntegrador.web.controller;

import com.utp.TPCursoIntegrador.market.domain.dto.Estadistica_Nota_Prom_Nivel_DTO;
import com.utp.TPCursoIntegrador.market.domain.service.EstadisticaNotaPorNivelService;
import com.utp.TPCursoIntegrador.market.web.controller.Estadistica_Nivel_Controller;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class Estadistica_Nivel_ControllerTest {

    @InjectMocks
    private Estadistica_Nivel_Controller estadisticaNivelController; // El controlador que estamos probando

    @Mock
    private EstadisticaNotaPorNivelService estPorNivel; // Servicio que es utilizado por el controlador

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this); // Inicializa los mocks
    }

    // Test para obtener las notas promedio por nivel
    @Test
    public void testObtenerNotasPromedioPorNivel() {
        // Crear datos de prueba
        Estadistica_Nota_Prom_Nivel_DTO estadistica1 = new Estadistica_Nota_Prom_Nivel_DTO("Nivel 1", 75);
        Estadistica_Nota_Prom_Nivel_DTO estadistica2 = new Estadistica_Nota_Prom_Nivel_DTO("Nivel 2", 85);

        List<Estadistica_Nota_Prom_Nivel_DTO> estadisticas = Arrays.asList(estadistica1, estadistica2);

        // Simula la respuesta del servicio
        when(estPorNivel.obtenerNotasPromedioPorNivel()).thenReturn(estadisticas);

        // Llamamos al método del controlador
        List<Estadistica_Nota_Prom_Nivel_DTO> resultado = estadisticaNivelController.obtenerNotasPromedioPorNivel();

        // Verificar que el resultado tiene el tamaño esperado
        assertEquals(2, resultado.size());
        assertEquals("Nivel 1", resultado.get(0).getNombre_Nivel());
        assertEquals(75, resultado.get(0).getNota_Promedio_Por_Nivel());
        assertEquals("Nivel 2", resultado.get(1).getNombre_Nivel());
        assertEquals(85, resultado.get(1).getNota_Promedio_Por_Nivel());
    }

    // Test para exportar las notas promedio a un archivo Excel
    @Test
    public void testExportarPromedio() throws IOException {
        // Llamamos al método del controlador
        estadisticaNivelController.exportarPromedio();

        // Verificamos que el servicio 'exportarNotasExcel' fue llamado con el parámetro esperado
        verify(estPorNivel, times(1)).exportarNotasExcel("notas.xlsx");
    }

    // Test para el caso de que haya una excepción en la exportación (simular IOException)
    @Test
    public void testExportarPromedioConError() throws IOException {
        doThrow(new IOException("Error al exportar")).when(estPorNivel).exportarNotasExcel("notas.xlsx");

        // Verificamos que al llamar al controlador se lanza la excepción
        assertThrows(IOException.class, () -> estadisticaNivelController.exportarPromedio());
    }
}