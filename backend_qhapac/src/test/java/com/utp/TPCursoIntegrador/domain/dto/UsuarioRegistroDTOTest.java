package com.utp.TPCursoIntegrador.domain.dto;

import com.utp.TPCursoIntegrador.market.domain.dto.UsuarioRegistroDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class UsuarioRegistroDTOTest {

    private UsuarioRegistroDTO usuarioDTO1;
    private UsuarioRegistroDTO usuarioDTO2;
    private UsuarioRegistroDTO usuarioDTO3;

    @BeforeEach
    public void setUp() {
        // Configuración de los objetos para las pruebas
        usuarioDTO1 = new UsuarioRegistroDTO("Juan", "Pérez", "juan.perez@example.com", "password123", 20.0f);
        usuarioDTO2 = new UsuarioRegistroDTO("Juan", "Pérez", "juan.perez@example.com", "password123", 20.0f);
        usuarioDTO3 = new UsuarioRegistroDTO("Pedro", "Gómez", "pedro.gomez@example.com", "password456", 30.0f);
    }

    @Test
    public void testEquals_SameObject() {
        // Compara el mismo objeto
        assertEquals(usuarioDTO1, usuarioDTO1);
    }

    @Test
    public void testEquals_DifferentObjectSameData() {
        // Compara dos objetos con los mismos datos
        assertEquals(usuarioDTO1, usuarioDTO2);
    }

    @Test
    public void testEquals_DifferentObjectDifferentData() {
        // Compara dos objetos con diferentes datos
        assertNotEquals(usuarioDTO1, usuarioDTO3);
    }

    @Test
    public void testHashCode_SameData() {
        // Compara los hashCodes de dos objetos con los mismos datos
        assertEquals(usuarioDTO1.hashCode(), usuarioDTO2.hashCode());
    }

    @Test
    public void testHashCode_DifferentData() {
        // Compara los hashCodes de dos objetos con datos diferentes
        assertNotEquals(usuarioDTO1.hashCode(), usuarioDTO3.hashCode());
    }

    @Test
    public void testToString() {
        // Verifica que el método toString genera la cadena correcta
        String expectedToString = "UsuarioRegistroDTO{nombre=Juan, apellido=Pérez, correo=juan.perez@example.com, horasSemanales=20.0}";
        assertEquals(expectedToString, usuarioDTO1.toString());
    }

    @Test
    public void testGettersAndSetters() {
        // Verifica los getters y setters
        usuarioDTO1.setNombre("Carlos");
        usuarioDTO1.setApellido("Martínez");
        usuarioDTO1.setCorreo("carlos.martinez@example.com");
        usuarioDTO1.setContrasenia("newpassword123");
        usuarioDTO1.setHorasSemanales(25.0f);

        assertEquals("Carlos", usuarioDTO1.getNombre());
        assertEquals("Martínez", usuarioDTO1.getApellido());
        assertEquals("carlos.martinez@example.com", usuarioDTO1.getCorreo());
        assertEquals("newpassword123", usuarioDTO1.getContrasenia());
        assertEquals(25.0f, usuarioDTO1.getHorasSemanales());
    }
}