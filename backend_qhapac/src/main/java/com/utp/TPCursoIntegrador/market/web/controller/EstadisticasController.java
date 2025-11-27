package com.utp.TPCursoIntegrador.market.web.controller;

import com.utp.TPCursoIntegrador.market.domain.dto.EstadisticaDTO;
import com.utp.TPCursoIntegrador.market.domain.service.EstadisticasService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estadisticas")
public class EstadisticasController {

    private final EstadisticasService estadisticasService;

    public EstadisticasController(EstadisticasService estadisticasService) {
        this.estadisticasService = estadisticasService;
    }

    // Endpoint: /estadisticas/ranking
    @GetMapping("/ranking")
    public List<EstadisticaDTO> getRankingTop10() {
        return estadisticasService.getRankingTop10();
    }
}