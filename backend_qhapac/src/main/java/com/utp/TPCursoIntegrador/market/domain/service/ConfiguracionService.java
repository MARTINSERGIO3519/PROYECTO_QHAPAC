package com.utp.TPCursoIntegrador.market.domain.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ConfiguracionService {

    @Value("${app.rol.por-defecto:2}")
    private Integer rolPorDefecto;

    @Value("${app.estado.usuario.por-defecto:1}")
    private Integer estadoUsuarioPorDefecto;

    public Integer getRolPorDefecto() {
        return rolPorDefecto;
    }

    public Integer getEstadoUsuarioPorDefecto() {
        return estadoUsuarioPorDefecto;
    }
}