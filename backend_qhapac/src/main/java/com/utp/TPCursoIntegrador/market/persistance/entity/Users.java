package com.utp.TPCursoIntegrador.market.persistance.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUsuario;

    private String nombre;
    private String correo;
    private String contrasena;
    private String rol;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;

    @Column(name = "codigo_temporal")
    private String codigoTemporal;

    @Column(name = "fecha_expira_codigo")
    private LocalDateTime fechaExpiraCodigo;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Admin admin;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Record record;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<IntentoJuego> intentos;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<LogsActividad> logs;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Sesiones> sesiones;

    // Getters y Setters de todos los campos, incluyendo los nuevos
    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getContrasena() { return contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public LocalDateTime getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDateTime fechaRegistro) { this.fechaRegistro = fechaRegistro; }

    public String getCodigoTemporal() { return codigoTemporal; }
    public void setCodigoTemporal(String codigoTemporal) { this.codigoTemporal = codigoTemporal; }

    public LocalDateTime getFechaExpiraCodigo() { return fechaExpiraCodigo; }
    public void setFechaExpiraCodigo(LocalDateTime fechaExpiraCodigo) { this.fechaExpiraCodigo = fechaExpiraCodigo; }

    public Admin getAdmin() { return admin; }
    public void setAdmin(Admin admin) { this.admin = admin; }

    public Record getRecord() { return record; }
    public void setRecord(Record record) { this.record = record; }

    public List<IntentoJuego> getIntentos() { return intentos; }
    public void setIntentos(List<IntentoJuego> intentos) { this.intentos = intentos; }

    public List<LogsActividad> getLogs() { return logs; }
    public void setLogs(List<LogsActividad> logs) { this.logs = logs; }

    public List<Sesiones> getSesiones() { return sesiones; }
    public void setSesiones(List<Sesiones> sesiones) { this.sesiones = sesiones; }
}


