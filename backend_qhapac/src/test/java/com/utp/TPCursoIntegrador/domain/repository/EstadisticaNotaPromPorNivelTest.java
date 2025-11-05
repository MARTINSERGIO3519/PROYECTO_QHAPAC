package com.utp.TPCursoIntegrador.domain.repository;

import com.utp.TPCursoIntegrador.market.domain.repository.EstadisticaNotaPromPorNivel;
import com.utp.TPCursoIntegrador.market.persistence.entity.Estadistica_Nivel;
import com.utp.TPCursoIntegrador.market.domain.dto.Estadistica_Nota_Prom_Nivel_DTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class) // Esta anotación habilita el uso de Mockito con JUnit 5
public class EstadisticaNotaPromPorNivelTest {

    @Mock
    private EstadisticaNotaPromPorNivel estadisticaNotaPromPorNivelRepository;  // Mock del repositorio

    private Estadistica_Nivel estadisticaNivel;

    @BeforeEach
    public void setup() {
        // Creamos la instancia de Estadistica_Nivel que será utilizada en los tests
        estadisticaNivel = new Estadistica_Nivel();
        estadisticaNivel.setId_Estadistica_Nivel(1);
        estadisticaNivel.setNota_Promedio(85);
        estadisticaNivel.setPartidas_Jugadas(10);
        estadisticaNivel.setFecha(java.time.LocalDate.now()); // Usamos la fecha actual
    }

    @Test
    public void testObtenerNotasPromedioPorNivel() {
        // Simulamos el comportamiento de obtenerNotasPromedioPorNivel
        Estadistica_Nota_Prom_Nivel_DTO dto = new Estadistica_Nota_Prom_Nivel_DTO("Nivel 1", 85);
        when(estadisticaNotaPromPorNivelRepository.obtenerNotasPromedioPorNivel())
                .thenReturn(Arrays.asList(dto));  // Simulamos que el método devuelve una lista con el DTO

        // Llamamos al método del repositorio
        List<Estadistica_Nota_Prom_Nivel_DTO> result = estadisticaNotaPromPorNivelRepository.obtenerNotasPromedioPorNivel();

        // Verificamos que el repositorio fue llamado una vez
        verify(estadisticaNotaPromPorNivelRepository, times(1)).obtenerNotasPromedioPorNivel();

        // Comprobamos que el resultado no es nulo
        assertNotNull(result);
        // Comprobamos que el tamaño de la lista es 1
        assertEquals(1, result.size());
        // Comprobamos que el DTO contiene los valores esperados
        assertEquals("Nivel 1", result.get(0).getNombre_Nivel());
    }
}