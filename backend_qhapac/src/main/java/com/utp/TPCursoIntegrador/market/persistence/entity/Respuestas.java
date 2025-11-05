package com.utp.TPCursoIntegrador.market.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Respuestas")
public class Respuestas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRespuesta;

    private String texto;

    private Boolean esCorrecta;

    @ManyToOne
    @JoinColumn(name = "idPregunta", nullable = false)
    private Preguntas pregunta;

    // Getters y Setters
    public Integer getIdRespuesta() {
        return idRespuesta;
    }
    public void setIdRespuesta(Integer idRespuesta) {
        this.idRespuesta = idRespuesta;
    }

    public String getTexto() {
        return texto;
    }
    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Boolean getEsCorrecta() {
        return esCorrecta;
    }
    public void setEsCorrecta(Boolean esCorrecta) {
        this.esCorrecta = esCorrecta;
    }

    public Preguntas getPregunta() {
        return pregunta;
    }
    public void setPregunta(Preguntas pregunta) {
        this.pregunta = pregunta;
    }

    @Override
    public String toString() {
        return "Respuestas{" +
                "idRespuesta=" + idRespuesta +
                ", texto='" + texto + '\'' +
                ", esCorrecta=" + esCorrecta +
                ", pregunta=" + pregunta +
                '}';
    }
}