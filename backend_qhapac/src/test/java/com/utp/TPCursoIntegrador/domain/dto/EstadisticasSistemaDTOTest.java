package com.utp.TPCursoIntegrador.domain.dto;

import com.utp.TPCursoIntegrador.market.domain.dto.EstadisticasSistemaDTO;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class EstadisticasSistemaDTOTest {

    @Test
    public void testGettersAndSetters() {
        // Crear objeto usando el constructor
        EstadisticasSistemaDTO dto = new EstadisticasSistemaDTO();
        dto.setTotalUsuarios(100L);
        dto.setAdministradores(10L);
        dto.setUsuariosNormales(80L);
        dto.setUsuariosActivos(90L);

        // Verificar valores usando los getters
        assertEquals(100L, dto.getTotalUsuarios());
        assertEquals(10L, dto.getAdministradores());
        assertEquals(80L, dto.getUsuariosNormales());
        assertEquals(90L, dto.getUsuariosActivos());
    }

    @Test
    public void testConstructor() {
        // Crear objeto usando el constructor
        EstadisticasSistemaDTO dto = new EstadisticasSistemaDTO(150L, 20L, 120L, 140L);

        // Verificar los valores asignados a través del constructor
        assertEquals(150L, dto.getTotalUsuarios());
        assertEquals(20L, dto.getAdministradores());
        assertEquals(120L, dto.getUsuariosNormales());
        assertEquals(140L, dto.getUsuariosActivos());
    }

    @Test
    public void testToString() {
        // Crear objeto y asignar valores
        EstadisticasSistemaDTO dto = new EstadisticasSistemaDTO();
        dto.setTotalUsuarios(200L);
        dto.setAdministradores(30L);
        dto.setUsuariosNormales(150L);
        dto.setUsuariosActivos(180L);

        // Verificar que el toString() contiene los valores correctos
        String str = dto.toString();
        assertNotNull(str);
        assertTrue(str.contains("200"));
        assertTrue(str.contains("30"));
        assertTrue(str.contains("150"));
        assertTrue(str.contains("180"));
    }

    @Test
    public void testSettersAndGetters() {
        EstadisticasSistemaDTO dto = new EstadisticasSistemaDTO();

        dto.setTotalUsuarios(300L);
        assertEquals(300L, dto.getTotalUsuarios());

        dto.setAdministradores(50L);
        assertEquals(50L, dto.getAdministradores());

        dto.setUsuariosNormales(200L);
        assertEquals(200L, dto.getUsuariosNormales());

        dto.setUsuariosActivos(250L);
        assertEquals(250L, dto.getUsuariosActivos());
    }
}