package com.utp.TPCursoIntegrador.market.persistance.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "IntentoJuego")
public class IntentoJuego {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idIntento;

    private LocalDateTime fecha;
    private Integer puntaje;

    @ManyToOne
    @JoinColumn(name = "idUsuario", nullable = false)
    private Users user;

    // Getters y Setters
    public Integer getIdIntento() {
        return idIntento;
    }
    public void setIdIntento(Integer idIntento) {
        this.idIntento = idIntento;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }
    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public Integer getPuntaje() {
        return puntaje;
    }
    public void setPuntaje(Integer puntaje) {
        this.puntaje = puntaje;
    }

    public Users getUser() {
        return user;
    }
    public void setUser(Users user) {
        this.user = user;
    }
}
