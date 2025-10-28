/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.TPCursoIntegrador.market.web.controller;

import com.utp.TPCursoIntegrador.market.domain.dto.Estadistica_Nota_Prom_Nivel_DTO;
import com.utp.TPCursoIntegrador.market.domain.service.EstadisticaNotaPorNivelService;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author danie
 */
@RestController
@RequestMapping("/estadistica_Nivel")
public class Estadistica_Nivel_Controller {
    
    @Autowired
    private EstadisticaNotaPorNivelService estPorNivel;
    
    @GetMapping("/promedio")
    public List<Estadistica_Nota_Prom_Nivel_DTO> obtenerNotasPromedioPorNivel(){
        return estPorNivel.obtenerNotasPromedioPorNivel();
    }
    
    @GetMapping("/exportarPromedio")
    public void exportarPromedio() throws IOException{
        estPorNivel.exportarNotasExcel("notas.xlsx");
    }
    
}
