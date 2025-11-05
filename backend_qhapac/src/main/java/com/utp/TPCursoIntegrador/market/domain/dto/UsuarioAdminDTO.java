package com.utp.TPCursoIntegrador.market.domain.dto;

import java.time.LocalDateTime;

public class UsuarioAdminDTO {
    private Integer idUsuario;
    private String nombre;
    private String apellido;
    private String email;
    private Integer idRol;
    private Integer experiencia_Total;
    private Integer experiencia_Semanal;
    private Float horas_Semanales;
    private LocalDateTime fecha_Registro;
    private Integer id_Estado_Usuario;

    // Constructores
    public UsuarioAdminDTO() {}

    public UsuarioAdminDTO(Integer idUsuario, String nombre, String apellido, String email,
                           Integer idRol, Integer experiencia_Total, Integer experiencia_Semanal,
                           Float horas_Semanales, LocalDateTime fecha_Registro, Integer id_Estado_Usuario) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.idRol = idRol;
        this.experiencia_Total = experiencia_Total;
        this.experiencia_Semanal = experiencia_Semanal;
        this.horas_Semanales = horas_Semanales;
        this.fecha_Registro = fecha_Registro;
        this.id_Estado_Usuario = id_Estado_Usuario;
    }

    // Getters y Setters
    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Integer getIdRol() { return idRol; }
    public void setIdRol(Integer idRol) { this.idRol = idRol; }

    public Integer getExperiencia_Total() { return experiencia_Total; }
    public void setExperiencia_Total(Integer experiencia_Total) { this.experiencia_Total = experiencia_Total; }

    public Integer getExperiencia_Semanal() { return experiencia_Semanal; }
    public void setExperiencia_Semanal(Integer experiencia_Semanal) { this.experiencia_Semanal = experiencia_Semanal; }

    public Float getHoras_Semanales() { return horas_Semanales; }
    public void setHoras_Semanales(Float horas_Semanales) { this.horas_Semanales = horas_Semanales; }

    public LocalDateTime getFecha_Registro() { return fecha_Registro; }
    public void setFecha_Registro(LocalDateTime fecha_Registro) { this.fecha_Registro = fecha_Registro; }

    public Integer getId_Estado_Usuario() { return id_Estado_Usuario; }
    public void setId_Estado_Usuario(Integer id_Estado_Usuario) { this.id_Estado_Usuario = id_Estado_Usuario; }
}
