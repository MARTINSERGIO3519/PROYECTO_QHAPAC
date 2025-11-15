package com.utp.TPCursoIntegrador.market.domain.dto;

public class NotaDTO {

    private Integer idUsuario;
    private Integer idNivel;
    private Integer idPeriodo;
    private Byte nota;
    private Boolean aprobado;
    private Byte preguntasAcertadas;
    private Byte preguntasErradas;
    private Boolean esQuizzFinal;

    // ----- Getters & Setters -----

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
