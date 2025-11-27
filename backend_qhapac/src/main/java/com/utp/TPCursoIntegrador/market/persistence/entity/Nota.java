package com.utp.TPCursoIntegrador.market.persistence.entity;

import jakarta.persistence.*;

@Entity
@IdClass(NotaPK.class)
@Table(name = "Nota")
public class Nota {

    @Id
    @Column(name = "id_Usuario")
    private Integer idUsuario;

    @Id
    @Column(name = "id_Nivel")
    private Integer idNivel;

    @Id
    @Column(name = "id_Periodo")
    private Integer idPeriodo;

    @Column(name = "nota")
    private Byte nota;

    @Column(name = "aprobado")
    private Boolean aprobado;

    @Column(name = "preguntas_Acertadas")
    private Byte preguntasAcertadas;

    @Column(name = "preguntas_Erradas")
    private Byte preguntasErradas;

    @Column(name = "es_Quizz_Final")
    private Boolean esQuizzFinal;

    // Getters y Setters
    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Integer getIdNivel() {
        return idNivel;
    }

    public void setIdNivel(Integer idNivel) {
        this.idNivel = idNivel;
    }

    public Integer getIdPeriodo() {
        return idPeriodo;
    }

    public void setIdPeriodo(Integer idPeriodo) {
        this.idPeriodo = idPeriodo;
    }

    public Byte getNota() {
        return nota;
    }

    public void setNota(Byte nota) {
        this.nota = nota;
    }

    public Boolean getAprobado() {
        return aprobado;
    }

    public void setAprobado(Boolean aprobado) {
        this.aprobado = aprobado;
    }

    public Byte getPreguntasAcertadas() {
        return preguntasAcertadas;
    }

    public void setPreguntasAcertadas(Byte preguntasAcertadas) {
        this.preguntasAcertadas = preguntasAcertadas;
    }

    public Byte getPreguntasErradas() {
        return preguntasErradas;
    }

    public void setPreguntasErradas(Byte preguntasErradas) {
        this.preguntasErradas = preguntasErradas;
    }

    public Boolean getEsQuizzFinal() {
        return esQuizzFinal;
    }

    public void setEsQuizzFinal(Boolean esQuizzFinal) {
        this.esQuizzFinal = esQuizzFinal;
    }
}
