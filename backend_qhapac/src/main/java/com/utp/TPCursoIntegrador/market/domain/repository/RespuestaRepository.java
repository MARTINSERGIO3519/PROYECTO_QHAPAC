package com.utp.TPCursoIntegrador.market.domain.repository;

import com.utp.TPCursoIntegrador.market.persistence.entity.Respuesta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RespuestaRepository extends JpaRepository<Respuesta, Integer> {

    List<Respuesta> findByPreguntaIdPregunta(Integer idPregunta);
}