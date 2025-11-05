package com.utp.TPCursoIntegrador.domain.repository;

import com.utp.TPCursoIntegrador.market.domain.repository.CredencialesRepository;
import com.utp.TPCursoIntegrador.market.persistence.entity.Credenciales;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class CredencialesRepositoryTest {

    @Mock
    private CredencialesRepository credencialesRepository;  // Simulamos el repositorio

    private Credenciales credenciales;

    @BeforeEach
    public void setup() {
        // Creamos la instancia de Credenciales
        credenciales = new Credenciales();
        credenciales.setIdUsuario(1);
        credenciales.setCorreo("test@example.com");
        credenciales.setCodigoTemporal("abc123");
    }

    @Test
    public void testFindByCorreo() {
        // Simulamos la respuesta de findByCorreo
        when(credencialesRepository.findByCorreo("test@example.com")).thenReturn(Optional.of(credenciales));

        // Obtenemos las credenciales
        Optional<Credenciales> result = credencialesRepository.findByCorreo("test@example.com");

        // Verificamos que el repositorio haya sido llamado
        verify(credencialesRepository, times(1)).findByCorreo("test@example.com");

        // Comprobamos que el resultado no sea nulo y contiene el correo esperado
        assertTrue(result.isPresent());
        assertEquals("test@example.com", result.get().getCorreo());
    }

    @Test
    public void testExistsByCorreo() {
        // Simulamos la respuesta de existsByCorreo
        when(credencialesRepository.existsByCorreo("test@example.com")).thenReturn(true);

        // Verificamos si el correo existe
        boolean exists = credencialesRepository.existsByCorreo("test@example.com");

        // Verificamos que el repositorio haya sido llamado
        verify(credencialesRepository, times(1)).existsByCorreo("test@example.com");

        // Comprobamos que el correo existe
        assertTrue(exists);
    }

    @Test
    public void testFindByCodigoTemporal() {
        // Simulamos la respuesta de findByCodigoTemporal
        when(credencialesRepository.findByCodigoTemporal("abc123")).thenReturn(Optional.of(credenciales));

        // Obtenemos las credenciales por código temporal
        Optional<Credenciales> result = credencialesRepository.findByCodigoTemporal("abc123");

        // Verificamos que el repositorio haya sido llamado
        verify(credencialesRepository, times(1)).findByCodigoTemporal("abc123");

        // Comprobamos que el resultado no sea nulo y contiene el código temporal esperado
        assertTrue(result.isPresent());
        assertEquals("abc123", result.get().getCodigoTemporal());
    }

    @Test
    public void testFindByIdUsuario() {
        // Simulamos la respuesta de findByIdUsuario
        when(credencialesRepository.findByIdUsuario(1)).thenReturn(Optional.of(credenciales));

        // Obtenemos las credenciales por idUsuario
        Optional<Credenciales> result = credencialesRepository.findByIdUsuario(1);

        // Verificamos que el repositorio haya sido llamado
        verify(credencialesRepository, times(1)).findByIdUsuario(1);

        // Comprobamos que el resultado no sea nulo y contiene el idUsuario esperado
        assertTrue(result.isPresent());
        assertEquals(1, result.get().getIdUsuario());
    }
}