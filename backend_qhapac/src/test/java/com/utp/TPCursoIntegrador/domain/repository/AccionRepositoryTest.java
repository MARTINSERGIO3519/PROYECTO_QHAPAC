package com.utp.TPCursoIntegrador.domain.repository;

import com.utp.TPCursoIntegrador.market.domain.repository.AccionRepository;
import com.utp.TPCursoIntegrador.market.persistence.entity.Accion;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(MockitoExtension.class) // Esto asegura que se inyecten los mocks correctamente
public class AccionRepositoryTest {

    @Mock
    private AccionRepository accionRepository;  // Simulamos el repositorio

    private Accion accion1;
    private Accion accion2;

    @BeforeEach
    public void setup() {
        // Creamos las instancias de Accion
        accion1 = new Accion();
        accion1.setDescripcion_Accion("Acción 1");

        accion2 = new Accion();
        accion2.setDescripcion_Accion("Acción 2");
    }

    @Test
    public void testFindAll() {
        // Simulamos que el repositorio devuelva una lista de acciones
        when(accionRepository.findAll()).thenReturn(Arrays.asList(accion1, accion2));

        // Obtenemos las acciones
        List<Accion> acciones = accionRepository.findAll();

        // Verificamos que findAll fue llamado
        verify(accionRepository, times(1)).findAll();

        // Verificamos el contenido
        assertNotNull(acciones);
        assertEquals(2, acciones.size());
        assertEquals("Acción 1", acciones.get(0).getDescripcion_Accion());
        assertEquals("Acción 2", acciones.get(1).getDescripcion_Accion());
    }

    @Test
    public void testSave() {
        // Simulamos la acción a guardar
        when(accionRepository.save(accion1)).thenReturn(accion1);

        // Guardamos la acción
        Accion savedAccion = accionRepository.save(accion1);

        // Verificamos que el repositorio guardó la acción
        verify(accionRepository, times(1)).save(accion1);

        // Comprobamos que la acción guardada es la misma
        assertNotNull(savedAccion);
        assertEquals("Acción 1", savedAccion.getDescripcion_Accion());
    }
}