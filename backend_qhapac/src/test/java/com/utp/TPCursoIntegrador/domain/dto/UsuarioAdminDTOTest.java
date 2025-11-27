package com.utp.TPCursoIntegrador.domain.dto;

import com.utp.TPCursoIntegrador.market.domain.dto.UsuarioAdminDTO;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

public class UsuarioAdminDTOTest {

    @Test
    public void testUsuarioAdminDTOGettersAndSetters() {
        // Crear una instancia de UsuarioAdminDTO
        UsuarioAdminDTO usuarioAdminDTO = new UsuarioAdminDTO();

        // Establecer valores usando los setters
        usuarioAdminDTO.setIdUsuario(1);
        usuarioAdminDTO.setNombre("Juan");
        usuarioAdminDTO.setApellido("Perez");
        usuarioAdminDTO.setEmail("juan.perez@example.com");
        usuarioAdminDTO.setIdRol(2);
        usuarioAdminDTO.setExperiencia_Total(100);
        usuarioAdminDTO.setExperiencia_Semanal(10);
        usuarioAdminDTO.setHoras_Semanales(40.0f);
        usuarioAdminDTO.setFecha_Registro(LocalDateTime.of(2023, 10, 1, 12, 0));
        usuarioAdminDTO.setId_Estado_Usuario(1);

        // Verificar que los valores establecidos se obtienen correctamente
        assertEquals(1, usuarioAdminDTO.getIdUsuario());
        assertEquals("Juan", usuarioAdminDTO.getNombre());
        assertEquals("Perez", usuarioAdminDTO.getApellido());
        assertEquals("juan.perez@example.com", usuarioAdminDTO.getEmail());
        assertEquals(2, usuarioAdminDTO.getIdRol());
        assertEquals(100, usuarioAdminDTO.getExperiencia_Total());
        assertEquals(10, usuarioAdminDTO.getExperiencia_Semanal());
        assertEquals(40.0f, usuarioAdminDTO.getHoras_Semanales());
        assertEquals(LocalDateTime.of(2023, 10, 1, 12, 0), usuarioAdminDTO.getFecha_Registro());
        assertEquals(1, usuarioAdminDTO.getId_Estado_Usuario());
    }

    @Test
    public void testToString() {
        // Crear una instancia de UsuarioAdminDTO
        UsuarioAdminDTO usuarioAdminDTO = new UsuarioAdminDTO();
        usuarioAdminDTO.setIdUsuario(1);
        usuarioAdminDTO.setNombre("Juan");
        usuarioAdminDTO.setApellido("Perez");
        usuarioAdminDTO.setEmail("juan.perez@example.com");
        usuarioAdminDTO.setIdRol(2);
        usuarioAdminDTO.setExperiencia_Total(100);
        usuarioAdminDTO.setExperiencia_Semanal(10);
        usuarioAdminDTO.setHoras_Semanales(40.0f);
        usuarioAdminDTO.setFecha_Registro(LocalDateTime.of(2023, 10, 1, 12, 0));
        usuarioAdminDTO.setId_Estado_Usuario(1);

        // Verificar que el método toString() genera la salida esperada
        String expected = "UsuarioAdminDTO{idUsuario=1, nombre='Juan', apellido='Perez', email='juan.perez@example.com', idRol=2, experiencia_Total=100, experiencia_Semanal=10, horas_Semanales=40.0, fecha_Registro=2023-10-01T12:00, id_Estado_Usuario=1}";
        assertEquals(expected, usuarioAdminDTO.toString());
    }
}