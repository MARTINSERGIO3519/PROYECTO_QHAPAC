package com.utp.TPCursoIntegrador.market.domain.dto;

public class LoginResponseDTO {
    private Integer usuarioId;
    private String nombre;
    private String apellido;
    private String correo;
    private Integer idRol;

    // Constructor, getters y setters
    public LoginResponseDTO() {}

    public LoginResponseDTO(Integer usuarioId, String nombre, String apellido, String correo, Integer idRol) {
        this.usuarioId = usuarioId;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.idRol = idRol;
    }

    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public Integer getIdRol() { return idRol; }
    public void setIdRol(Integer idRol) { this.idRol = idRol; }

    @Override
    public String toString() {
        return "LoginResponseDTO{" +
                "usuarioId=" + usuarioId +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", correo='" + correo + '\'' +
                ", idRol=" + idRol +
                '}';
    }
}
