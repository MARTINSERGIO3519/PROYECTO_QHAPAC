package com.utp.TPCursoIntegrador.domain.dto;

import com.utp.TPCursoIntegrador.market.domain.dto.UsuarioResponseDTO;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class UsuarioResponseDTOTest {

    @Test
    public void testGettersYSetters() {
        // Crear una instancia de UsuarioResponseDTO
        UsuarioResponseDTO usuario = new UsuarioResponseDTO();

        // Establecer valores para los atributos
        Integer idUsuario = 1;
        String nombre = "Juan";
        String apellido = "Pérez";
        String correo = "juan.perez@ejemplo.com";
        LocalDateTime fechaRegistro = LocalDateTime.of(2023, 10, 28, 10, 30, 0, 0);

        usuario.setIdUsuario(idUsuario);
        usuario.setNombre(nombre);
        usuario.setApellido(apellido);
        usuario.setCorreo(correo);
        usuario.setFechaRegistro(fechaRegistro);

        // Verificar que los valores se asignaron correctamente
        assertEquals(idUsuario, usuario.getIdUsuario(), "El ID del usuario no se asignó correctamente.");
        assertEquals(nombre, usuario.getNombre(), "El nombre no se asignó correctamente.");
        assertEquals(apellido, usuario.getApellido(), "El apellido no se asignó correctamente.");
        assertEquals(correo, usuario.getCorreo(), "El correo no se asignó correctamente.");
        assertEquals(fechaRegistro, usuario.getFechaRegistro(), "La fecha de registro no se asignó correctamente.");
    }

    @Test
    public void testToString() {
        // Crear una instancia de UsuarioResponseDTO con valores establecidos
        UsuarioResponseDTO usuario = new UsuarioResponseDTO(1, "Juan", "Pérez", "juan.perez@ejemplo.com", LocalDateTime.of(2023, 10, 28, 10, 30, 0, 0));

        // Verificar que el método toString() devuelve la cadena esperada
        String expectedToString = "UsuarioResponseDTO{idUsuario=1, nombre=Juan, apellido=Pérez, correo=juan.perez@ejemplo.com, fechaRegistro=2023-10-28T10:30}";
        assertEquals(expectedToString, usuario.toString(), "El método toString() no devuelve la cadena esperada.");
    }

    @Test
    public void testEqualsYHashCode() {
        // Crear dos instancias de UsuarioResponseDTO con el mismo idUsuario
        UsuarioResponseDTO usuario1 = new UsuarioResponseDTO(1, "Juan", "Pérez", "juan.perez@ejemplo.com", LocalDateTime.of(2023, 10, 28, 10, 30, 0, 0));
        UsuarioResponseDTO usuario2 = new UsuarioResponseDTO(1, "Juan", "Pérez", "juan.perez@ejemplo.com", LocalDateTime.of(2023, 10, 28, 10, 30, 0, 0));

        // Verificar que los objetos son iguales por idUsuario
        assertTrue(usuario1.equals(usuario2), "Los usuarios no son iguales cuando deberían serlo.");
        assertEquals(usuario1.hashCode(), usuario2.hashCode(), "Los hashCodes no coinciden para objetos iguales.");

        // Cambiar idUsuario en uno de los objetos y verificar que ya no son iguales
        usuario2.setIdUsuario(2);
        assertFalse(usuario1.equals(usuario2), "Los usuarios son iguales cuando no deberían serlo.");
    }
}