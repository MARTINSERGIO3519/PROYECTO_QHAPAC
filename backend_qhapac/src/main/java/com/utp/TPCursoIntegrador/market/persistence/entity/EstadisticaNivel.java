package com.utp.TPCursoIntegrador.market.persistence.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Estadistica_Nivel")
public class EstadisticaNivel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Estadistica_Nivel")
    private Integer idEstadisticaNivel;

    @ManyToOne
    @JoinColumn(name = "id_Nivel", nullable = false)
    private Nivel nivel;

    @Column(name = "nota_Promedio", nullable = false)
    private Byte notaPromedio;   // TINYINT → Byte en Java

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Column(name = "partidas_Jugadas", nullable = false)
    private Integer partidasJugadas;

    // ----- Getters & Setters -----

    public Integer getIdEstadisticaNivel() {
        return idEstadisticaNivel;
    }

    public void setIdEstadisticaNivel(Integer idEstadisticaNivel) {
        this.idEstadisticaNivel = idEstadisticaNivel;
    }

    public Nivel getNivel() {
        return nivel;
    }

    public void setNivel(Nivel nivel) {
        this.nivel = nivel;
    }

    public Byte getNotaPromedio() {
        return notaPromedio;
    }

    public void setNotaPromedio(Byte notaPromedio) {
        this.notaPromedio = notaPromedio;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Integer getPartidasJugadas() {
        return partidasJugadas;
    }

    public void setPartidasJugadas(Integer partidasJugadas) {
        this.partidasJugadas = partidasJugadas;
    }
}
