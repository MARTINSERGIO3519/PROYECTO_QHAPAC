package com.utp.TPCursoIntegrador.market.domain.repository;

import com.utp.TPCursoIntegrador.market.persistence.entity.EstadisticaNivel;
import org.springframework.data.repository.CrudRepository;

public interface EstadisticaNivelRepository extends CrudRepository<EstadisticaNivel, Long> {
    // Consultas personalizadas si es necesario
}