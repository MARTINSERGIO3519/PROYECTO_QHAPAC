package com.utp.TPCursoIntegrador.market.domain.dto;

public class CambiarContraseniaRequest {
    private Integer idUsuario;
    private String contraseniaActual;
    private String nuevaContrasenia;

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getContraseniaActual() {
        return contraseniaActual;
    }

    public void setContraseniaActual(String contraseniaActual) {
        this.contraseniaActual = contraseniaActual;
    }

    public String getNuevaContrasenia() {
        return nuevaContrasenia;
    }

    public void setNuevaContrasenia(String nuevaContrasenia) {
        this.nuevaContrasenia = nuevaContrasenia;
    }

    @Override
    public String toString() {
        return "CambiarContraseniaRequest{" +
                "idUsuario=" + idUsuario +
                ", contraseniaActual='" + contraseniaActual + '\'' +
                ", nuevaContrasenia='" + nuevaContrasenia + '\'' +
                '}';
    }
}
