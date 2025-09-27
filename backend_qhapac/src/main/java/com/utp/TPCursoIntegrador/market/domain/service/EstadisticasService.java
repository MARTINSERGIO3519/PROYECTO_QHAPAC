package com.utp.TPCursoIntegrador.market.domain.service;

import com.utp.TPCursoIntegrador.market.domain.dto.EstadisticaDTO;
import com.utp.TPCursoIntegrador.market.domain.repository.EstadisticasRepository;
import com.utp.TPCursoIntegrador.market.persistance.mapper.EstadisticasMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EstadisticasService {

    private final EstadisticasRepository estadisticasRepository;
    private final EstadisticasMapper estadisticasMapper;

    public EstadisticasService(EstadisticasRepository estadisticasRepository, EstadisticasMapper estadisticasMapper) {
        this.estadisticasRepository = estadisticasRepository;
        this.estadisticasMapper = estadisticasMapper;
    }

    // Obtiene el ranking de los 10 mejores por promedio de puntaje
    public List<EstadisticaDTO> getRankingTop10() {
        return estadisticasRepository.findTop10ByOrderByPromedioPuntajeDesc()
                .stream()
                .map(estadisticasMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Obtiene todas las estadísticas con los datos de usuario asociados
    public List<EstadisticaDTO> getTodasEstadisticas() {
        return estadisticasRepository.findAllWithUsuarios()
                .stream()
                .map(estadisticasMapper::toDTO)
                .collect(Collectors.toList());
    }
}
