package com.utp.TPCursoIntegrador.market.persistence.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 *
 * @author danie
 */
@Entity
@Table(name="nivel")
public class Nivel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_Nivel;
    
    private String nombre_Nivel;
    
    private String desripcion_Nivel;
    
    @ManyToOne
    @JoinColumn(name= "id_Periodo")
    private Periodo periodo;

    public Integer getId_Nivel() {
        return id_Nivel;
    }

    public void setId_Nivel(Integer id_Nivel) {
        this.id_Nivel = id_Nivel;
    }

    public String getNombre_Nivel() {
        return nombre_Nivel;
    }

    public void setNombre_Nivel(String nombre_Nivel) {
        this.nombre_Nivel = nombre_Nivel;
    }

    public String getDesripcion_Nivel() {
        return desripcion_Nivel;
    }

    public void setDesripcion_Nivel(String desripcion_Nivel) {
        this.desripcion_Nivel = desripcion_Nivel;
    }

    public Periodo getPeriodo() {
        return periodo;
    }

    public void setPeriodo(Periodo periodo) {
        this.periodo = periodo;
    }
    
    
    
    
}
