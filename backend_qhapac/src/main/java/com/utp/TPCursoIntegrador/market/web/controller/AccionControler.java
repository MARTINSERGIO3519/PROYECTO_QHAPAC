/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.TPCursoIntegrador.market.web.controller;

import com.utp.TPCursoIntegrador.market.domain.service.AccionService;
import com.utp.TPCursoIntegrador.market.persistence.entity.Accion;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author danie
 */
@RestController
@RequestMapping("/Accion")
public class AccionControler {
    private AccionService accionService;

    public AccionControler(AccionService accionService) {
        this.accionService = accionService;
    }
    
    @GetMapping("/obtenerAcciones")
    public List<Accion> obtenerAcciones(){
        return accionService.obtenerAcciones();
    }
}
