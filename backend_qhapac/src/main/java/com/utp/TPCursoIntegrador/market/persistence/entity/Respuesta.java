package com.utp.TPCursoIntegrador.market.persistence.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "Respuesta")
public class Respuesta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Respuesta")
    private Integer idRespuesta;

    @Column(name = "texto_Respuesta", nullable = false)
    private String textoRespuesta;

    @Column(name = "es_Correcta", nullable = false)
    private Boolean esCorrecta;

    // Muchas respuestas pertenecen a una pregunta
    @ManyToOne
    @JoinColumn(name = "id_Pregunta", nullable = false)
    @JsonIgnore
    private Pregunta pregunta;

    // GETTERS & SETTERS
    public Integer getIdRespuesta() { return idRespuesta; }
    public void setIdRespuesta(Integer idRespuesta) { this.idRespuesta = idRespuesta; }

    public String getTextoRespuesta() { return textoRespuesta; }
    public void setTextoRespuesta(String textoRespuesta) { this.textoRespuesta = textoRespuesta; }

    public Boolean getEsCorrecta() { return esCorrecta; }
    public void setEsCorrecta(Boolean esCorrecta) { this.esCorrecta = esCorrecta; }

    public Pregunta getPregunta() { return pregunta; }
    public void setPregunta(Pregunta pregunta) { this.pregunta = pregunta; }
}
