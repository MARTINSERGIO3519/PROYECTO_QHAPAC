package com.utp.TPCursoIntegrador.market.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Periodo")
public class Periodo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Periodo")
    private Integer idPeriodo;

    @Column(name = "nombre_Periodo", length = 50, nullable = false)
    private String nombrePeriodo;

    // ----- Getters & Setters -----

    public Integer getIdPeriodo() {
        return idPeriodo;
    }

    public void setIdPeriodo(Integer idPeriodo) {
        this.idPeriodo = idPeriodo;
    }

    public String getNombrePeriodo() {
        return nombrePeriodo;
    }

    public void setNombrePeriodo(String nombrePeriodo) {
        this.nombrePeriodo = nombrePeriodo;
    }
}
