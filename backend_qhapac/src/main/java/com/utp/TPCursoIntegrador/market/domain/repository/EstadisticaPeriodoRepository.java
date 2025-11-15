package com.utp.TPCursoIntegrador.market.domain.repository;

import com.utp.TPCursoIntegrador.market.persistence.entity.EstadisticaPeriodo;
import org.springframework.data.repository.CrudRepository;

public interface EstadisticaPeriodoRepository extends CrudRepository<EstadisticaPeriodo, Long> {
    // Consultas personalizadas si es necesario
}