package com.utp.TPCursoIntegrador.market.domain.repository;

import com.utp.TPCursoIntegrador.market.persistence.entity.Periodo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeriodoRepository extends JpaRepository<Periodo, Integer> {
}