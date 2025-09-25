package com.utp.TPCursoIntegrador.market.persistance.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Admin")
public class Admin {
    @Id
    private Integer idUsuario;

    private String permisos;
    private String notas;

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

    public String getPermisos() {
        return permisos;
    }
    public void setPermisos(String permisos) {
        this.permisos = permisos;
    }

    public String getNotas() {
        return notas;
    }
    public void setNotas(String notas) {
        this.notas = notas;
    }

    public Users getUser() {
        return user;
    }
    public void setUser(Users user) {
        this.user = user;
    }
}
