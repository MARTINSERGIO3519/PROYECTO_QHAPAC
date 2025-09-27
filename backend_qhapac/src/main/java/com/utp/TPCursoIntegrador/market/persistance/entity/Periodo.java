package com.utp.TPCursoIntegrador.market.persistance.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Periodo")
public class Periodo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPeriodo;

    private String nombrePeriodo;

    @OneToMany(mappedBy = "periodo", cascade = CascadeType.ALL)
    private List<Tema> temas;

    // Getters y Setters
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

    public List<Tema> getTemas() {
        return temas;
    }
    public void setTemas(List<Tema> temas) {
        this.temas = temas;
    }
}
