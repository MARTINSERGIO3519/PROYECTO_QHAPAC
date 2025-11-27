package com.utp.TPCursoIntegrador.web.controller;

import com.utp.TPCursoIntegrador.market.web.controller.TestConnectionController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class TestConnectionControllerTest {

    @InjectMocks
    private TestConnectionController testConnectionController; // Controlador que estamos probando

    @Mock
    private DataSource dataSource; // Mock del DataSource

    @Mock
    private Connection connection; // Mock de la conexión

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this); // Inicializa los mocks
    }

    // Test para conexión exitosa
    @Test
    public void testTestConnectionSuccess() throws SQLException {
        // Simular una conexión exitosa
        when(dataSource.getConnection()).thenReturn(connection);
        when(connection.getCatalog()).thenReturn("test_database");

        // Llamar al método testConnection
        String response = testConnectionController.testConnection();

        // Verificar que el mensaje de éxito sea el esperado
        assertEquals("Conexión exitosa a la base de datos: test_database", response);

        // Verificar que se haya llamado al método getConnection
        verify(dataSource, times(1)).getConnection();
        verify(connection, times(1)).getCatalog();
    }

    // Test para error en la conexión
    @Test
    public void testTestConnectionFailure() throws SQLException {
        // Simular que se lanza una excepción al intentar obtener la conexión
        when(dataSource.getConnection()).thenThrow(new SQLException("Error al conectarse"));

        // Llamar al método testConnection
        String response = testConnectionController.testConnection();

        // Verificar que el mensaje de error sea el esperado
        assertEquals("Error en la conexión: Error al conectarse", response);

        // Verificar que se haya llamado al método getConnection
        verify(dataSource, times(1)).getConnection();
    }
}