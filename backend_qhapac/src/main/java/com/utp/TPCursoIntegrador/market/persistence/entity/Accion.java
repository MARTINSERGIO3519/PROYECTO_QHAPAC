package com.utp.TPCursoIntegrador.market.persistence.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="accion")
public class Accion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_Accion;

    private String descripcion_Accion;

    public Integer getId_Accion() {
        return id_Accion;
    }

    public void setId_Accion(Integer id_Accion) {
        this.id_Accion = id_Accion;
    }

    public String getDescripcion_Accion() {
        return descripcion_Accion;
    }

    public void setDescripcion_Accion(String descripcion_Accion) {
        this.descripcion_Accion = descripcion_Accion;
    }

    @Override
    public String toString() {
        return "Accion{" +
                "id_Accion=" + id_Accion +
                ", descripcion_Accion='" + descripcion_Accion + '\'' +
                '}';
    }
}