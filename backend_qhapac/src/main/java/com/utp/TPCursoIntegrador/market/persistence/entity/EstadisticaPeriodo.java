package com.utp.TPCursoIntegrador.market.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Estadistica_Periodo")
public class EstadisticaPeriodo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Estadistica_Periodo")
    private Integer idEstadisticaPeriodo;

    // Relación con Periodo
    @ManyToOne
    @JoinColumn(name = "id_Periodo", nullable = false)
    private Periodo periodo;

    @Column(name = "nota_Promedio", nullable = false)
    private byte notaPromedio;

    // ----- Getters and Setters -----

    public Integer getIdEstadisticaPeriodo() {
        return idEstadisticaPeriodo;
    }

    public void setIdEstadisticaPeriodo(Integer idEstadisticaPeriodo) {
        this.idEstadisticaPeriodo = idEstadisticaPeriodo;
    }

    public Periodo getPeriodo() {
        return periodo;
    }

    public void setPeriodo(Periodo periodo) {
        this.periodo = periodo;
    }

    public byte getNotaPromedio() {
        return notaPromedio;
    }

    public void setNotaPromedio(byte notaPromedio) {
        this.notaPromedio = notaPromedio;
    }
}
