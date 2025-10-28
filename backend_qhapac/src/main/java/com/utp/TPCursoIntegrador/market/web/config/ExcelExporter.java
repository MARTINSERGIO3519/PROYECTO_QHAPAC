/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.TPCursoIntegrador.market.web.config;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.utp.TPCursoIntegrador.market.domain.dto.Estadistica_Nota_Prom_Nivel_DTO;


/**
 *
 * @author danie
 */
public class ExcelExporter {
    public void exportarUltimasNotas(List<Estadistica_Nota_Prom_Nivel_DTO> lista, String rutaArchivo) throws IOException {
        // Creamos el workbook y la hoja
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Ultimas Notas");

        // Creamos la fila del encabezado
        Row header = sheet.createRow(0);
        CellStyle style = workbook.createCellStyle();
        
        /*Definimos unos estilos personalizados para el encabezado*/
        Font font = workbook.createFont();
        font.setBold(true);
        style.setFont(font);

        /*Aplicamos el estilo creado a la fila de encabezado*/
        String[] columnas = {"Nivel", "Última Nota Promedio"};
        for (int i = 0; i < columnas.length; i++) {
            Cell cell = header.createCell(i);
            cell.setCellValue(columnas[i]);
            cell.setCellStyle(style);
        }

        
        // Llenamos los datos
        int rowNum = 1;
        for (Estadistica_Nota_Prom_Nivel_DTO dto : lista) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(dto.getNombre_Nivel());
            row.createCell(1).setCellValue(dto.getNota_Promedio_Por_Nivel());
        }

        // Ajustamos el tamano de las columnas para que sea automatico
        for (int i = 0; i < columnas.length; i++) {
            sheet.autoSizeColumn(i);
        }

        // Guardamos el archivo en la misma carpeta del proyecto
        try (FileOutputStream fileOut = new FileOutputStream(rutaArchivo)) {
            workbook.write(fileOut);
        }

        // Cerramos e flujo
        workbook.close();
        System.out.println("Archivo Excel generado en: " + rutaArchivo);
    }
}
