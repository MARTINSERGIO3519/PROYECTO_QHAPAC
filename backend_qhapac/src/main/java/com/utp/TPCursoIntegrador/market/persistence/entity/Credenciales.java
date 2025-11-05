package com.utp.TPCursoIntegrador.market.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Credenciales")
public class Credenciales {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Credencial") // ← CORREGIDO
    private Integer idCredencial;

    @Column(name = "id_Usuario")
    private Integer idUsuario;

    @Column(name = "correo")
    private String correo;

    @Column(name = "contrasenia")
    private String contrasenia;

    @Column(name = "codigo_Temporal")
    private String codigoTemporal;

    @Column(name = "fecha_Expira_Codigo")
    private java.time.LocalDateTime fechaExpiraCodigo;

    // Getters y Setters
    public Integer getIdCredencial() { return idCredencial; }
    public void setIdCredencial(Integer idCredencial) { this.idCredencial = idCredencial; }

    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getContrasenia() { return contrasenia; }
    public void setContrasenia(String contrasenia) { this.contrasenia = contrasenia; }

    public String getCodigoTemporal() { return codigoTemporal; }
    public void setCodigoTemporal(String codigoTemporal) { this.codigoTemporal = codigoTemporal; }

    public java.time.LocalDateTime getFechaExpiraCodigo() { return fechaExpiraCodigo; }
    public void setFechaExpiraCodigo(java.time.LocalDateTime fechaExpiraCodigo) { this.fechaExpiraCodigo = fechaExpiraCodigo; }
}
