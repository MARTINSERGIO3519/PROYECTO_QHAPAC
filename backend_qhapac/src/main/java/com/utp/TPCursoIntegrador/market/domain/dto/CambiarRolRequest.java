package com.utp.TPCursoIntegrador.market.domain.dto;

public class CambiarRolRequest {
    private Integer idUsuario;
    private Integer nuevoRol;

    // Constructores
    public CambiarRolRequest() {}

    public CambiarRolRequest(Integer idUsuario, Integer nuevoRol) {
        this.idUsuario = idUsuario;
        this.nuevoRol = nuevoRol;
    }

    // Getters y Setters
    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }

    public Integer getNuevoRol() { return nuevoRol; }
    public void setNuevoRol(Integer nuevoRol) { this.nuevoRol = nuevoRol; }
}
