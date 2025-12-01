package com.utp.TPCursoIntegrador.market.domain.dto;

import java.time.LocalDate;

public class EstadisticaNivelDTO {

    private Integer idEstadisticaNivel;
    private Integer idNivel;          // Referencia al nivel
    private Byte notaPromedio;
    private LocalDate fecha;
    private Integer partidasJugadas;

    // ----- Getters & Setters -----
    public Integer getIdEstadisticaNivel() {
        return idEstadisticaNivel;
    }

    public void setIdEstadisticaNivel(Integer idEstadisticaNivel) {
        this.idEstadisticaNivel = idEstadisticaNivel;
    }

    public Integer getIdNivel() {
        return idNivel;
    }

    public void setIdNivel(Integer idNivel) {
        this.idNivel = idNivel;
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
