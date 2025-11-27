package com.utp.TPCursoIntegrador.market.domain.dto;

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

    @Override
    public String toString() {
        return "Estadistica_Nota_Prom_Nivel_DTO{" +
                "nombre_Nivel='" + nombre_Nivel + '\'' +
                ", nota_Promedio_Por_Nivel=" + nota_Promedio_Por_Nivel +
                '}';
    }
}