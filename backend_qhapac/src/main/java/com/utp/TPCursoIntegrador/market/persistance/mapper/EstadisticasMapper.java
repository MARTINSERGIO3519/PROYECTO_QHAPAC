package com.utp.TPCursoIntegrador.market.persistance.mapper;

import com.utp.TPCursoIntegrador.market.domain.dto.EstadisticaDTO;
import com.utp.TPCursoIntegrador.market.persistance.entity.Estadisticas;
import org.springframework.stereotype.Component;

@Component
public class EstadisticasMapper {

    public EstadisticaDTO toDTO(Estadisticas estadistica) {
        EstadisticaDTO dto = new EstadisticaDTO();
        // Si usuario es null, ponemos "Nuevo Usuario"
        dto.setNombreUsuario(
                estadistica.getUsuario() != null
                        ? estadistica.getUsuario().getNombre()
                        : "Nuevo Usuario"
        );
        dto.setPromedioPuntaje(estadistica.getPromedioPuntaje() != null
                ? estadistica.getPromedioPuntaje()
                : 0
        );
        dto.setPreguntasAcertadas(estadistica.getPreguntasAcertadas() != null
                ? estadistica.getPreguntasAcertadas()
                : 0
        );
        dto.setPreguntasFalladas(estadistica.getPreguntasFalladas() != null
                ? estadistica.getPreguntasFalladas()
                : 0
        );
        dto.setPartidasJugadas(estadistica.getPartidasJugadas() != null
                ? estadistica.getPartidasJugadas()
                : 0
        );
        return dto;
    }
}