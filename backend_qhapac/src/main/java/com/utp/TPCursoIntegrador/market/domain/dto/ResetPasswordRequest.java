package com.utp.TPCursoIntegrador.market.domain.dto;

public class ResetPasswordRequest {
    private String codigoTemporal;
    private String nuevaContrasenia;

    // getters y setters
    public String getCodigoTemporal() { return codigoTemporal; }
    public void setCodigoTemporal(String codigoTemporal) { this.codigoTemporal = codigoTemporal; }
    public String getNuevaContrasenia() { return nuevaContrasenia; }
    public void setNuevaContrasenia(String nuevaContrasenia) { this.nuevaContrasenia = nuevaContrasenia; }
}
