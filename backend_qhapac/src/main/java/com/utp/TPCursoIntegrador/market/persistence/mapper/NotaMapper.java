package com.utp.TPCursoIntegrador.market.persistence.mapper;

import com.utp.TPCursoIntegrador.market.domain.dto.NotaDTO;
import com.utp.TPCursoIntegrador.market.persistence.entity.Nota;

public class NotaMapper {

    // ----------- Entity -> DTO -----------
    public static NotaDTO toNotaDTO(Nota entity) {
        if (entity == null) return null;

        NotaDTO dto = new NotaDTO();

        dto.setIdUsuario(entity.getIdUsuario());
        dto.setIdNivel(entity.getIdNivel());
        dto.setIdPeriodo(entity.getIdPeriodo());

        dto.setNota(entity.getNota());
        dto.setAprobado(entity.getAprobado());
        dto.setPreguntasAcertadas(entity.getPreguntasAcertadas());
        dto.setPreguntasErradas(entity.getPreguntasErradas());
        dto.setEsQuizzFinal(entity.getEsQuizzFinal());

        return dto;
    }

    // ----------- DTO -> Entity -----------
    public static Nota toNota(NotaDTO dto) {
        if (dto == null) return null;

        Nota entity = new Nota();

        entity.setIdUsuario(dto.getIdUsuario());
        entity.setIdNivel(dto.getIdNivel());
        entity.setIdPeriodo(dto.getIdPeriodo());

        entity.setNota(dto.getNota());
        entity.setAprobado(dto.getAprobado());
        entity.setPreguntasAcertadas(dto.getPreguntasAcertadas());
        entity.setPreguntasErradas(dto.getPreguntasErradas());
        entity.setEsQuizzFinal(dto.getEsQuizzFinal());

        return entity;
    }
}
