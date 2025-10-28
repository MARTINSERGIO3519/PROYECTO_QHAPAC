package com.utp.TPCursoIntegrador.market.persistence.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;

/**
 *
 * @author danie
 */
@Entity
@Table(name= "estadistica_nivel")
public class Estadistica_Nivel {
    
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id_Estadistica_Nivel;
    
    @ManyToOne
    @JoinColumn(name= "id_Nivel")
    private Nivel nivel;
    
    private int nota_Promedio;
    
    private LocalDate fecha;
    
    private int partidas_Jugadas;

    public Integer getId_Estadistica_Nivel() {
        return id_Estadistica_Nivel;
    }

    public void setId_Estadistica_Nivel(Integer id_Estadistica_Nivel) {
        this.id_Estadistica_Nivel = id_Estadistica_Nivel;
    }

    public Nivel getNivel() {
        return nivel;
    }

    public void setNivel(Nivel nivel) {
        this.nivel = nivel;
    }

    public int getNota_Promedio() {
        return nota_Promedio;
    }

    public void setNota_Promedio(int nota_Promedio) {
        this.nota_Promedio = nota_Promedio;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public int getPartidas_Jugadas() {
        return partidas_Jugadas;
    }

    public void setPartidas_Jugadas(int partidas_Jugadas) {
        this.partidas_Jugadas = partidas_Jugadas;
    }
    
    
    
}
