package com.utp.TPCursoIntegrador.market.persistence.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Tema")
public class Tema {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTema;

    private String nombreTema;

    @ManyToOne
    @JoinColumn(name = "idPeriodo", nullable = false)
    private Periodo periodo;

    @OneToMany(mappedBy = "tema", cascade = CascadeType.ALL)
    private List<Preguntas> preguntas;

    // Getters y Setters
    public Integer getIdTema() { return idTema; }
    public void setIdTema(Integer idTema) { this.idTema = idTema; }

    public String getNombreTema() { return nombreTema; }
    public void setNombreTema(String nombreTema) { this.nombreTema = nombreTema; }

    public Periodo getPeriodo() { return periodo; }
    public void setPeriodo(Periodo periodo) { this.periodo = periodo; }

    public List<Preguntas> getPreguntas() { return preguntas; }
    public void setPreguntas(List<Preguntas> preguntas) { this.preguntas = preguntas; }
}
