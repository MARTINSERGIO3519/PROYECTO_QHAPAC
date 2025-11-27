package com.utp.TPCursoIntegrador.market.persistence.mapper;

import com.utp.TPCursoIntegrador.market.domain.dto.NivelDTO;
import com.utp.TPCursoIntegrador.market.persistence.entity.Nivel;
import com.utp.TPCursoIntegrador.market.persistence.entity.Periodo;

public class NivelMapper {

    // ----- Entity -> DTO -----
    public static NivelDTO toNivelDTO(Nivel entity) {
        if (entity == null) return null;

        NivelDTO dto = new NivelDTO();

        dto.setIdNivel(entity.getIdNivel());
        dto.setNombreNivel(entity.getNombreNivel());
        dto.setDescripcionNivel(entity.getDescripcionNivel());
        dto.setIdPeriodo(entity.getPeriodo() != null ? entity.getPeriodo().getIdPeriodo() : null);

        return dto;
    }

    // ----- DTO -> Entity -----
    public static Nivel toNivel(NivelDTO dto) {
        if (dto == null) return null;

        Nivel entity = new Nivel();

        entity.setIdNivel(dto.getIdNivel());
        entity.setNombreNivel(dto.getNombreNivel());
        entity.setDescripcionNivel(dto.getDescripcionNivel());

        // Relación con Periodo (solo el id)
        if (dto.getIdPeriodo() != null) {
            Periodo periodo = new Periodo();
            periodo.setIdPeriodo(dto.getIdPeriodo());
            entity.setPeriodo(periodo);
        }

        return entity;
    }
}
