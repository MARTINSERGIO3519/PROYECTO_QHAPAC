package com.utp.TPCursoIntegrador.market.domain.dto;

public class UserDTO {
    private Integer idUsuario;
    private String nombre;
    private String correo;
    private String rol;
    private String contrasena;

    // Getters y Setters
    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
    public String getContrasena() { return contrasena;}
    public void setContrasena(String contrasena) { this.contrasena = contrasena;}
}
