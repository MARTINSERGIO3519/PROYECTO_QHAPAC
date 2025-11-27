package com.utp.TPCursoIntegrador.market.domain.dto;

public class MensajeResponse {
    private String mensaje;

    // Constructores
    public MensajeResponse() {}

    public MensajeResponse(String mensaje) {
        this.mensaje = mensaje;
    }

    // Getters y Setters
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }

    @Override
    public String toString() {
        return "MensajeResponse{" +
                "mensaje='" + mensaje + '\'' +
                '}';
    }
}