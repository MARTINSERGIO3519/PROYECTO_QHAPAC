package com.utp.TPCursoIntegrador.market.persistance.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "LogsActividad")
public class LogsActividad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idLog;

    private String accion;
    private String detalles;
    private LocalDateTime fecha;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Users user;

    // Getters y Setters
    public Integer getIdLog() {
        return idLog;
    }
    public void setIdLog(Integer idLog) {
        this.idLog = idLog;
    }

    public String getAccion() {
        return accion;
    }
    public void setAccion(String accion) {
        this.accion = accion;
    }

    public String getDetalles() {
        return detalles;
    }
    public void setDetalles(String detalles) {
        this.detalles = detalles;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }
    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public Users getUser() {
        return user;
    }
    public void setUser(Users user) {
        this.user = user;
    }
}
