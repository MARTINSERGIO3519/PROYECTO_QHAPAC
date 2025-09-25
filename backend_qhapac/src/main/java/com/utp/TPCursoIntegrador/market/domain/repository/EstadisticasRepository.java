package com.utp.TPCursoIntegrador.market.domain.repository;

import com.utp.TPCursoIntegrador.market.persistance.entity.Estadisticas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EstadisticasRepository extends JpaRepository<Estadisticas, Integer> {
    List<Estadisticas> findTop10ByOrderByPromedioPuntajeDesc();
    @Query("SELECT e FROM Estadisticas e RIGHT JOIN FETCH e.usuario u ORDER BY e.promedioPuntaje DESC")
    List<Estadisticas> findAllWithUsuarios();
}