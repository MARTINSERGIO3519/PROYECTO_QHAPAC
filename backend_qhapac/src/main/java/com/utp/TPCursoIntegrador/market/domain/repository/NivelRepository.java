package com.utp.TPCursoIntegrador.market.domain.repository;

import com.utp.TPCursoIntegrador.market.persistence.entity.Nivel;
import org.springframework.data.repository.CrudRepository;

public interface NivelRepository extends CrudRepository<Nivel, Long> {
    // Consultas personalizadas si es necesario
}
