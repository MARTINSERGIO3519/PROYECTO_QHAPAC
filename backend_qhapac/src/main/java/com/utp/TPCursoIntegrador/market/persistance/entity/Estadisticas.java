package com.utp.TPCursoIntegrador.market.persistance.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Estadisticas")
public class Estadisticas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEstadistica;

    @ManyToOne
    @JoinColumn(name = "idUsuario", nullable = false) // FK hacia Users
    private Users usuario;

    private Double promedioPuntaje;
    private Integer preguntasAcertadas;
    private Integer preguntasFalladas;
    private Integer partidasJugadas;

    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    // Getters y Setters
    public Integer getIdEstadistica() {
        return idEstadistica;
    }

    public void setIdEstadistica(Integer idEstadistica) {
        this.idEstadistica = idEstadistica;
    }

    public Users getUsuario() {
        return usuario;
    }

    public void setUsuario(Users usuario) {
        this.usuario = usuario;
    }

    public Double getPromedioPuntaje() {
        return promedioPuntaje;
    }

    public void setPromedioPuntaje(Double promedioPuntaje) {
        this.promedioPuntaje = promedioPuntaje;
    }

    public Integer getPreguntasAcertadas() {
        return preguntasAcertadas;
    }

    public void setPreguntasAcertadas(Integer preguntasAcertadas) {
        this.preguntasAcertadas = preguntasAcertadas;
    }

    public Integer getPreguntasFalladas() {
        return preguntasFalladas;
    }

    public void setPreguntasFalladas(Integer preguntasFalladas) {
        this.preguntasFalladas = preguntasFalladas;
    }

    public Integer getPartidasJugadas() {
        return partidasJugadas;
    }

    public void setPartidasJugadas(Integer partidasJugadas) {
        this.partidasJugadas = partidasJugadas;
    }

    public LocalDateTime getFechaActualizacion() {
        return fechaActualizacion;
    }

    public void setFechaActualizacion(LocalDateTime fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }
}

