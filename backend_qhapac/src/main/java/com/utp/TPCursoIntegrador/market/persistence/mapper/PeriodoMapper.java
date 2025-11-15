package com.utp.TPCursoIntegrador.market.persistence.mapper;

import com.utp.TPCursoIntegrador.market.domain.dto.PeriodoDTO;
import com.utp.TPCursoIntegrador.market.persistence.entity.Periodo;

public class PeriodoMapper {

    // Convertir Entity -> DTO
    public static PeriodoDTO toPeriodoDTO(Periodo periodo) {
        if (periodo == null) return null;
        PeriodoDTO dto = new PeriodoDTO();
        dto.setIdPeriodo(periodo.getIdPeriodo());
        dto.setNombrePeriodo(periodo.getNombrePeriodo());
        return dto;
    }

    // Convertir DTO -> Entity
    public static Periodo toPeriodo(PeriodoDTO dto) {
        if (dto == null) return null;
        Periodo periodo = new Periodo();
        periodo.setIdPeriodo(dto.getIdPeriodo());
        periodo.setNombrePeriodo(dto.getNombrePeriodo());
        return periodo;
    }
}