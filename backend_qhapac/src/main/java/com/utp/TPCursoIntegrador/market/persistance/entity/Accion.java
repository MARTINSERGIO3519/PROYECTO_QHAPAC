/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.TPCursoIntegrador.market.persistance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 *
 * @author danie
 */
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

    
}
