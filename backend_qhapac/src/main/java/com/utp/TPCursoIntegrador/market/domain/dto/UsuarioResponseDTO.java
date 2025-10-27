package com.utp.TPCursoIntegrador.market.domain.dto;

import com.google.common.base.MoreObjects;
import java.time.LocalDateTime;
import java.util.Objects;

public class UsuarioResponseDTO {
    private Integer idUsuario;
    private String nombre;
    private String apellido;
    private String correo;
    private LocalDateTime fechaRegistro;

    public UsuarioResponseDTO() {}

    public UsuarioResponseDTO(Integer idUsuario, String nombre, String apellido, String correo, LocalDateTime fechaRegistro) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.fechaRegistro = fechaRegistro;
    }

    // Getters y Setters
    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public LocalDateTime getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDateTime fechaRegistro) { this.fechaRegistro = fechaRegistro; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsuarioResponseDTO that = (UsuarioResponseDTO) o;
        return Objects.equals(idUsuario, that.idUsuario);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUsuario);
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("idUsuario", idUsuario)
                .add("nombre", nombre)
                .add("apellido", apellido)
                .add("correo", correo)
                .add("fechaRegistro", fechaRegistro)
                .toString();
    }
}
