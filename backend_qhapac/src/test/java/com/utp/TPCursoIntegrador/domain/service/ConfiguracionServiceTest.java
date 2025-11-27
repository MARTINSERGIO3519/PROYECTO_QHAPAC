package com.utp.TPCursoIntegrador.domain.service;

import com.utp.TPCursoIntegrador.market.domain.service.ConfiguracionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(properties = {
        "app.rol.por-defecto=3",
        "app.estado.usuario.por-defecto=0"
})
class ConfiguracionServiceTest {

    @Autowired
    private ConfiguracionService configuracionService;

    @Test
    void testRolPorDefecto() {
        // Verificamos que el valor de rolPorDefecto sea el que hemos definido en los test properties
        assertEquals(3, configuracionService.getRolPorDefecto());
    }

    @Test
    void testEstadoUsuarioPorDefecto() {
        // Verificamos que el valor de estadoUsuarioPorDefecto sea el que hemos definido en los test properties
        assertEquals(0, configuracionService.getEstadoUsuarioPorDefecto());
    }

    @Test
    void testValoresPorDefectoCuandoNoSeDefinen() {
        // Creamos un nuevo test para verificar que si no se definen las propiedades en el archivo de configuración,
        // se usan los valores predeterminados.
        ConfiguracionService configuracionServiceSinProps = new ConfiguracionService();
    }
}