package com.utp.TPCursoIntegrador.market.persistence.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Usuario") // ← CORREGIDO
    private Integer idUsuario;

    @Column(name = "id_Rol")
    private Integer idRol;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "experiencia_Total")
    private Float experienciaTotal;

    @Column(name = "experiencia_Semanal")
    private Float experienciaSemanal;

    @Column(name = "horas_Semanales")
    private Float horasSemanales;

    @Column(name = "fecha_Registro")
    private LocalDateTime fechaRegistro;

    @Column(name = "id_Estado_Usuario")
    private Integer idEstadoUsuario;

    // Getters y Setters
    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }

    public Integer getIdRol() { return idRol; }
    public void setIdRol(Integer idRol) { this.idRol = idRol; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public Float getExperienciaTotal() { return experienciaTotal; }
    public void setExperienciaTotal(Float experienciaTotal) { this.experienciaTotal = experienciaTotal; }

    public Float getExperienciaSemanal() { return experienciaSemanal; }
    public void setExperienciaSemanal(Float experienciaSemanal) { this.experienciaSemanal = experienciaSemanal; }

    public Float getHorasSemanales() { return horasSemanales; }
    public void setHorasSemanales(Float horasSemanales) { this.horasSemanales = horasSemanales; }

    public LocalDateTime getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDateTime fechaRegistro) { this.fechaRegistro = fechaRegistro; }

    public Integer getIdEstadoUsuario() { return idEstadoUsuario; }
    public void setIdEstadoUsuario(Integer idEstadoUsuario) { this.idEstadoUsuario = idEstadoUsuario; }
}
