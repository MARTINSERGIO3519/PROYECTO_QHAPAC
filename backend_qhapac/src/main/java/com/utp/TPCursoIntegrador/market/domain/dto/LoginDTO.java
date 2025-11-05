package com.utp.TPCursoIntegrador.market.domain.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginDTO {

    @NotBlank(message = "El correo es obligatorio")
    private String correo;

    @NotBlank(message = "La contraseña es obligatoria")
    private String contrasenia;

    // Constructor, getters y setters
    public LoginDTO() {}

    public LoginDTO(String correo, String contrasenia) {
        this.correo = correo;
        this.contrasenia = contrasenia;
    }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getContrasenia() { return contrasenia; }
    public void setContrasenia(String contrasenia) { this.contrasenia = contrasenia; }

    @Override
    public String toString() {
        return "LoginDTO{" +
                "correo='" + correo + '\'' +
                ", contrasenia='" + contrasenia + '\'' +
                '}';
    }
}