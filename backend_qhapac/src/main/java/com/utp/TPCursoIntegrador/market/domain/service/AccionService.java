/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.TPCursoIntegrador.market.domain.service;

import com.utp.TPCursoIntegrador.market.domain.repository.AccionRepository;
import com.utp.TPCursoIntegrador.market.persistence.entity.Accion;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author danie
 */
@Service
public class AccionService {

    @Autowired
    private AccionRepository listaRepository;

    public List<Accion> obtenerAcciones() {
        return listaRepository.findAll(); /*Devuelve una lista de acciones. Instancia por cada registro encontrado un Accion con sus valores y crea una lista con todos los Accion creados y la devuelve*/
    }
;
}
