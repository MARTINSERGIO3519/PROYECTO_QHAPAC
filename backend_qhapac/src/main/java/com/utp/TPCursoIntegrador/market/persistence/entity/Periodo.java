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

<<<<<<< HEAD
    private String nombre_Periodo;

    @OneToMany(mappedBy="periodo")
    private List<Nivel> nivel;

    // Getter y Setter para id_Periodo
    public Integer getId_Periodo() {
        return id_Periodo;
    }

    public void setId_Periodo(Integer id_Periodo) {
        this.id_Periodo = id_Periodo;
    }

    // Getter y Setter para nombre_Periodo
    public String getNombre_Periodo() {
        return nombre_Periodo;
    }

    public void setNombre_Periodo(String nombre_Periodo) {
        this.nombre_Periodo = nombre_Periodo;
    }

    // Getter y Setter para la lista de Niveles
    public List<Nivel> getNivel() {
        return nivel;
    }

    public void setNivel(List<Nivel> nivel) {
        this.nivel = nivel;
    }

    @Override
    public String toString() {
        return "Periodo{" +
                "id_Periodo=" + id_Periodo +
                ", nombre_Periodo='" + nombre_Periodo + '\'' +
                '}';
    }
}
=======
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
>>>>>>> luis_sarmiento
