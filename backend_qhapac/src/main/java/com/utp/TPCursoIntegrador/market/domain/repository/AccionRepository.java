package com.utp.TPCursoIntegrador.market.domain.repository;

import com.utp.TPCursoIntegrador.market.persistence.entity.Accion;
import com.utp.TPCursoIntegrador.market.persistence.entity.Accion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author danie
 */
@Repository
public interface AccionRepository extends JpaRepository<Accion, Integer> {
    
}
