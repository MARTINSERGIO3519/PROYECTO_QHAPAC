package com.utp.TPCursoIntegrador.market.domain.repository;

import com.utp.TPCursoIntegrador.market.persistence.entity.Periodo;
import org.springframework.data.repository.CrudRepository;

public interface PeriodoRepository extends CrudRepository<Periodo, Long> {
    // Puedes agregar consultas personalizadas si las necesitas
}