package com.utp.TPCursoIntegrador.market.domain.dto;

public class GestionUsuarioRequest {
    private String nombre;
    private String apellido;
    private String correo;
    private String contrasenia;
    private Integer idRol;
    private Float horasSemanales; // Cambiado a Float

    // Constructores
    public GestionUsuarioRequest() {}

    public GestionUsuarioRequest(String nombre, String apellido, String correo,
                                 String contrasenia, Integer idRol, Float horasSemanales) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contrasenia = contrasenia;
        this.idRol = idRol;
        this.horasSemanales = horasSemanales;
    }

    // Getters y Setters
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getContrasenia() { return contrasenia; }
    public void setContrasenia(String contrasenia) { this.contrasenia = contrasenia; }

    public Integer getIdRol() { return idRol; }
    public void setIdRol(Integer idRol) { this.idRol = idRol; }

    public Float getHorasSemanales() { return horasSemanales; }
    public void setHorasSemanales(Float horasSemanales) { this.horasSemanales = horasSemanales; }

    @Override
    public String toString() {
        return "GestionUsuarioRequest{" +
                "nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", correo='" + correo + '\'' +
                ", contrasenia='" + contrasenia + '\'' +
                ", idRol=" + idRol +
                ", horasSemanales=" + horasSemanales +
                '}';
    }
}
