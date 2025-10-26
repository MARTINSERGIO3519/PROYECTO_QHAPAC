/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.utp.TPCursoIntegrador.market.domain.repository;

import com.utp.TPCursoIntegrador.market.persistance.entity.Estadistica_Nivel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.utp.TPCursoIntegrador.market.domain.dto.Estadistica_Nota_Prom_Nivel_DTO;
import java.util.List;


/**
 *
 * @author danie
 */
public interface EstadisticaNotaPromPorNivel extends JpaRepository<Estadistica_Nivel, Integer> {
    
    /*Agrupa por nivel(nombre_Nivel) y obtiene la nota promedio de el ultimo registro de cada nivel y devuelve (nombre_Nivel y nota_Nivel).*/
    @Query("""          
    SELECT new com.utp.TPCursoIntegrador.market.domain.dto.Estadistica_Nota_Prom_Nivel_DTO(
        e.nivel.nombre_Nivel,
        e.nota_Promedio
    )
    FROM Estadistica_Nivel e
    WHERE e.fecha = (
        SELECT MAX(sub.fecha)
        FROM Estadistica_Nivel sub
        WHERE sub.nivel.id_Nivel = e.nivel.id_Nivel
    )
""")
    List<Estadistica_Nota_Prom_Nivel_DTO> obtenerNotasPromedioPorNivel();
}
