/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.TPCursoIntegrador.market.domain.service;

import com.utp.TPCursoIntegrador.market.domain.dto.Estadistica_Nota_Prom_Nivel_DTO;
import com.utp.TPCursoIntegrador.market.domain.repository.EstadisticaNotaPromPorNivel;
import com.utp.TPCursoIntegrador.market.web.config.ExcelExporter;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author danie
 */
@Service
public class EstadisticaNotaPorNivelService {
    
    @Autowired
    private EstadisticaNotaPromPorNivel estNotaPorNivel;
    
    public List<Estadistica_Nota_Prom_Nivel_DTO> obtenerNotasPromedioPorNivel(){
        return estNotaPorNivel.obtenerNotasPromedioPorNivel();
    };
    
    public void exportarNotasExcel(String rutaArchivo) throws IOException {
        List<Estadistica_Nota_Prom_Nivel_DTO> lista = estNotaPorNivel.obtenerNotasPromedioPorNivel();

        ExcelExporter exporter = new ExcelExporter();
        exporter.exportarUltimasNotas(lista, rutaArchivo);
    }
}
