package com.utp.TPCursoIntegrador.domain.repository;

import com.utp.TPCursoIntegrador.market.domain.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class) // Esta anotación habilita el uso de Mockito con JUnit 5
public class UsuarioRepositoryTest {

    @Mock
    private UsuarioRepository usuarioRepository;  // Mock del repositorio

    @BeforeEach
    public void setup() {
        // Este método se ejecuta antes de cada test. Se puede utilizar para inicializar objetos comunes
    }

    @Test
    public void testCountByIdRol() {
        // Simulamos la respuesta del método countByIdRol
        when(usuarioRepository.countByIdRol(1)).thenReturn(5L);

        // Llamamos al método del repositorio
        long result = usuarioRepository.countByIdRol(1);

        // Verificamos que el repositorio fue llamado una vez con el parámetro correcto
        verify(usuarioRepository, times(1)).countByIdRol(1);

        // Comprobamos que el resultado sea el esperado
        assertEquals(5L, result);
    }

    @Test
    public void testCountByEstadoUsuario() {
        // Simulamos la respuesta del método countByEstadoUsuario con la consulta @Query
        when(usuarioRepository.countByEstadoUsuario(2)).thenReturn(10L);

        // Llamamos al método del repositorio
        long result = usuarioRepository.countByEstadoUsuario(2);

        // Verificamos que el repositorio fue llamado una vez con el parámetro correcto
        verify(usuarioRepository, times(1)).countByEstadoUsuario(2);

        // Comprobamos que el resultado sea el esperado
        assertEquals(10L, result);
    }

    @Test
    public void testCountByIdEstadoUsuario() {
        // Simulamos la respuesta del método countByIdEstadoUsuario (método derivado)
        when(usuarioRepository.countByIdEstadoUsuario(3)).thenReturn(7L);

        // Llamamos al método del repositorio
        long result = usuarioRepository.countByIdEstadoUsuario(3);

        // Verificamos que el repositorio fue llamado una vez con el parámetro correcto
        verify(usuarioRepository, times(1)).countByIdEstadoUsuario(3);

        // Comprobamos que el resultado sea el esperado
        assertEquals(7L, result);
    }
}