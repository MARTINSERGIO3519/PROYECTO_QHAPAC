package com.utp.TPCursoIntegrador.market.persistence.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Nivel")
public class Nivel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Nivel")
    private Integer idNivel;

    @Column(name = "nombre_Nivel", nullable = false, length = 50)
    private String nombreNivel;

    @Column(name = "descripcion_Nivel", length = 255)
    private String descripcionNivel;

    @ManyToOne
    @JoinColumn(name = "id_Periodo", nullable = false)
    private Periodo periodo;

    // Un nivel tiene muchos temas
    @JsonIgnore
    @OneToMany(mappedBy = "nivel", cascade = CascadeType.ALL)
    private List<Tema> tema;

    // ----- Getters & Setters -----
    public Integer getIdNivel() {
        return idNivel;
    }

    public void setIdNivel(Integer idNivel) {
        this.idNivel = idNivel;
    }

    public String getNombreNivel() {
        return nombreNivel;
    }

    public void setNombreNivel(String nombreNivel) {
        this.nombreNivel = nombreNivel;
    }

    public String getDescripcionNivel() {
        return descripcionNivel;
    }

    public void setDescripcionNivel(String descripcionNivel) {
        this.descripcionNivel = descripcionNivel;
    }

    public Periodo getPeriodo() {
        return periodo;
    }

    public void setPeriodo(Periodo periodo) {
        this.periodo = periodo;
    }

    public List<Tema> getTema() { return tema; }
    public void setTema(List<Tema> tema) { this.tema = tema; }
}
