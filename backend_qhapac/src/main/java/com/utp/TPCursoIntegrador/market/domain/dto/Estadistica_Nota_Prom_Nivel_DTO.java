/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.TPCursoIntegrador.market.domain.dto;

/**
 *
 * @author danie
 */
public class Estadistica_Nota_Prom_Nivel_DTO {
    private String nombre_Nivel;
    private int nota_Promedio_Por_Nivel;

    public Estadistica_Nota_Prom_Nivel_DTO(String nombre_Nivel, int nota_Promedio_Por_Nivel) {
        this.nombre_Nivel = nombre_Nivel;
        this.nota_Promedio_Por_Nivel = nota_Promedio_Por_Nivel;
    }
    
    

    public String getNombre_Nivel() {
        return nombre_Nivel;
    }

    public void setNombre_Nivel(String nombre_Nivel) {
        this.nombre_Nivel = nombre_Nivel;
    }

    public int getNota_Promedio_Por_Nivel() {
        return nota_Promedio_Por_Nivel;
    }

    public void setNota_Promedio_Por_Nivel(int nota_Promedio_Por_Nivel) {
        this.nota_Promedio_Por_Nivel = nota_Promedio_Por_Nivel;
    }

   
    
    
}
