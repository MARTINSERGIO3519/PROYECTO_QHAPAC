package com.utp.TPCursoIntegrador.market.persistence.mapper;

import com.utp.TPCursoIntegrador.market.domain.dto.EstadisticaNivelDTO;
import com.utp.TPCursoIntegrador.market.persistence.entity.EstadisticaNivel;
import com.utp.TPCursoIntegrador.market.persistence.entity.Nivel;

public class EstadisticaNivelMapper {

    // Entity -> DTO
    public static EstadisticaNivelDTO toEstadisticaNivelDTO(EstadisticaNivel estadisticaNivel) {
        if (estadisticaNivel == null) return null;

        EstadisticaNivelDTO dto = new EstadisticaNivelDTO();
        dto.setIdEstadisticaNivel(estadisticaNivel.getIdEstadisticaNivel());
        dto.setIdNivel(estadisticaNivel.getNivel() != null ? estadisticaNivel.getNivel().getIdNivel() : null);
        dto.setNotaPromedio(estadisticaNivel.getNotaPromedio());
        dto.setFecha(estadisticaNivel.getFecha());
        dto.setPartidasJugadas(estadisticaNivel.getPartidasJugadas());

        return dto;
    }

    // DTO -> Entity
    public static EstadisticaNivel toEstadisticaNivel(EstadisticaNivelDTO dto) {
        if (dto == null) return null;

        EstadisticaNivel estadisticaNivel = new EstadisticaNivel();
        estadisticaNivel.setIdEstadisticaNivel(dto.getIdEstadisticaNivel());

        if (dto.getIdNivel() != null) {
            Nivel nivel = new Nivel();
            nivel.setIdNivel(dto.getIdNivel());
            estadisticaNivel.setNivel(nivel);
        }

        estadisticaNivel.setNotaPromedio(dto.getNotaPromedio());
        estadisticaNivel.setFecha(dto.getFecha());
        estadisticaNivel.setPartidasJugadas(dto.getPartidasJugadas());

        return estadisticaNivel;
    }
}
