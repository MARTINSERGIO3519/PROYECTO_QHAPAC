/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.TPCursoIntegrador.market.domain.repository;
import com.utp.TPCursoIntegrador.market.persistance.entity.Accion;
import com.utp.TPCursoIntegrador.market.persistance.entity.Accion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author danie
 */
@Repository
public interface AccionRepository extends JpaRepository<Accion, Integer> {
    
}
