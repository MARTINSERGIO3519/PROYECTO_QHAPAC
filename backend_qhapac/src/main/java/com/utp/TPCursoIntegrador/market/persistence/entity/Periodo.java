package com.utp.TPCursoIntegrador.market.persistence.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Periodo")
public class Periodo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Periodo")
    private Integer idPeriodo;

    @Column(name = "nombre_Periodo", length = 50, nullable = false)
    private String nombrePeriodo;

    // Un periodo tiene muchos niveles
    @JsonIgnore
    @OneToMany(mappedBy = "periodo", cascade = CascadeType.ALL)
    private List<Nivel> nivel;

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

    public List<Nivel> getNivel() { return nivel; }
    public void setNivel(List<Nivel> nivel) { this.nivel = nivel; }
}
