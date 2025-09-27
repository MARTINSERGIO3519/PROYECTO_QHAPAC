package com.utp.TPCursoIntegrador.market.domain.dto;

public class EstadisticaDTO {
    private String nombreUsuario;
    private Double promedioPuntaje;
    private Integer preguntasAcertadas;
    private Integer preguntasFalladas;
    private Integer partidasJugadas;

    // Getters y Setters
    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
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
}