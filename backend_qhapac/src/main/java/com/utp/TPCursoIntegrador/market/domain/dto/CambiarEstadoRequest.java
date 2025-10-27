package com.utp.TPCursoIntegrador.market.domain.dto;

public class CambiarEstadoRequest {
    private Integer idUsuario;
    private Integer nuevoEstado;

    // Constructores
    public CambiarEstadoRequest() {}

    public CambiarEstadoRequest(Integer idUsuario, Integer nuevoEstado) {
        this.idUsuario = idUsuario;
        this.nuevoEstado = nuevoEstado;
    }

    // Getters y Setters
    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }

    public Integer getNuevoEstado() { return nuevoEstado; }
    public void setNuevoEstado(Integer nuevoEstado) { this.nuevoEstado = nuevoEstado; }
}
