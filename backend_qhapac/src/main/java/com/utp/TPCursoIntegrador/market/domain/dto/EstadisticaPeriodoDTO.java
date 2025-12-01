package com.utp.TPCursoIntegrador.market.domain.dto;

public class EstadisticaPeriodoDTO {

    private Integer idEstadisticaPeriodo;
    private Integer idPeriodo;
    private byte notaPromedio;

    // ----- Getters & Setters -----

    public Integer getIdEstadisticaPeriodo() {
        return idEstadisticaPeriodo;
    }

    public void setIdEstadisticaPeriodo(Integer idEstadisticaPeriodo) {
        this.idEstadisticaPeriodo = idEstadisticaPeriodo;
    }

    public Integer getIdPeriodo() {
        return idPeriodo;
    }

    public void setIdPeriodo(Integer idPeriodo) {
        this.idPeriodo = idPeriodo;
    }

    public byte getNotaPromedio() {
        return notaPromedio;
    }

    public void setNotaPromedio(byte notaPromedio) {
        this.notaPromedio = notaPromedio;
    }
}
