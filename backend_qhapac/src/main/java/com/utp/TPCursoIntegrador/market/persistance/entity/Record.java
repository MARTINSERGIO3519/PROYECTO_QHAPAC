package com.utp.TPCursoIntegrador.market.persistance.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Record")
public class Record {
    @Id
    private Integer idUsuario;

    private Integer experiencia;

    @Column(name = "ultima_actualizacion")
    private LocalDateTime ultimaActualizacion;

    @OneToOne
    @MapsId
    @JoinColumn(name = "idUsuario")
    private Users user;

    // Getters y Setters
    public Integer getIdUsuario() {
        return idUsuario;
    }
    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Integer getExperiencia() {
        return experiencia;
    }
    public void setExperiencia(Integer experiencia) {
        this.experiencia = experiencia;
    }

    public LocalDateTime getUltimaActualizacion() {
        return ultimaActualizacion;
    }
    public void setUltimaActualizacion(LocalDateTime ultimaActualizacion) {
        this.ultimaActualizacion = ultimaActualizacion;
    }

    public Users getUser() {
        return user;
    }
    public void setUser(Users user) {
        this.user = user;
    }
}
