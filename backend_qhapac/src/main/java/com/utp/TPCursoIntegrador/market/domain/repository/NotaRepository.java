package com.utp.TPCursoIntegrador.market.domain.repository;

import com.utp.TPCursoIntegrador.market.persistence.entity.Nota;
import com.utp.TPCursoIntegrador.market.persistence.entity.NotaPK;
import org.springframework.data.repository.CrudRepository;

public interface NotaRepository extends CrudRepository<Nota, NotaPK> {
    // Consultas personalizadas si es necesario
}