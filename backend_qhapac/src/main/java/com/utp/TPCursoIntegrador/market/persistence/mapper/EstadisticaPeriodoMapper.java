package com.utp.TPCursoIntegrador.market.persistence.mapper;

import com.utp.TPCursoIntegrador.market.domain.dto.EstadisticaPeriodoDTO;
import com.utp.TPCursoIntegrador.market.persistence.entity.EstadisticaPeriodo;
import com.utp.TPCursoIntegrador.market.persistence.entity.Periodo;

public class EstadisticaPeriodoMapper {

    // ----- Entity -> DTO -----
    public static EstadisticaPeriodoDTO toEstadisticaPeriodoDTO(EstadisticaPeriodo entity) {
        if (entity == null) return null;

        EstadisticaPeriodoDTO dto = new EstadisticaPeriodoDTO();

        dto.setIdEstadisticaPeriodo(entity.getIdEstadisticaPeriodo());
        dto.setIdPeriodo(entity.getPeriodo() != null ? entity.getPeriodo().getIdPeriodo() : null);
        dto.setNotaPromedio(entity.getNotaPromedio());

        return dto;
    }

    // ----- DTO -> Entity -----
    public static EstadisticaPeriodo toEstadisticaPeriodo(EstadisticaPeriodoDTO dto) {
        if (dto == null) return null;

        EstadisticaPeriodo entity = new EstadisticaPeriodo();

        entity.setIdEstadisticaPeriodo(dto.getIdEstadisticaPeriodo());
        entity.setNotaPromedio(dto.getNotaPromedio());

        // Relación Periodo (solo se asigna el id)
        if (dto.getIdPeriodo() != null) {
            Periodo periodo = new Periodo();
            periodo.setIdPeriodo(dto.getIdPeriodo());
            entity.setPeriodo(periodo);
        }

        return entity;
    }
}
