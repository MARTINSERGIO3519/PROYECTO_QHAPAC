package com.utp.TPCursoIntegrador.market.persistance.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Sesiones")
public class Sesiones {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSesion;

    private LocalDateTime inicioSesion;
    private LocalDateTime finSesion;
    private String estado;

    @ManyToOne
    @JoinColumn(name = "idUsuario", nullable = false)
    private Users user;

    // Getters y Setters
    public Integer getIdSesion() {
        return idSesion;
    }
    public void setIdSesion(Integer idSesion) {
        this.idSesion = idSesion;
    }

    public LocalDateTime getInicioSesion() {
        return inicioSesion;
    }
    public void setInicioSesion(LocalDateTime inicioSesion) {
        this.inicioSesion = inicioSesion; }

    public LocalDateTime getFinSesion() {
        return finSesion;
    }
    public void setFinSesion(LocalDateTime finSesion) {
        this.finSesion = finSesion;
    }

    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Users getUser() {
        return user;
    }
    public void setUser(Users user) {
        this.user = user;
    }
}
