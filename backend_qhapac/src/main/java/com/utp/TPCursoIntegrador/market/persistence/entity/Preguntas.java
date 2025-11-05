package com.utp.TPCursoIntegrador.market.persistence.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Preguntas")
public class Preguntas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPregunta;

    @Column(columnDefinition = "TEXT")
    private String enunciado;

    private String nivel;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @ManyToOne
    @JoinColumn(name = "idTema", nullable = false)
    private Tema tema;

    @OneToMany(mappedBy = "pregunta", cascade = CascadeType.ALL)
    private List<Respuestas> respuestas;

    // Getters y Setters
    public Integer getIdPregunta() {
        return idPregunta;
    }
    public void setIdPregunta(Integer idPregunta) {
        this.idPregunta = idPregunta;
    }

    public String getEnunciado() {
        return enunciado;
    }
    public void setEnunciado(String enunciado) {
        this.enunciado = enunciado;
    }

    public String getNivel() {
        return nivel;
    }
    public void setNivel(String nivel) {
        this.nivel = nivel;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }
    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Tema getTema() {
        return tema;
    }
    public void setTema(Tema tema) {
        this.tema = tema;
    }

    public List<Respuestas> getRespuestas() {
        return respuestas;
    }
    public void setRespuestas(List<Respuestas> respuestas) {
        this.respuestas = respuestas;
    }

    @Override
    public String toString() {
        return "Preguntas{" +
                "idPregunta=" + idPregunta +
                ", enunciado='" + enunciado + '\'' +
                ", nivel='" + nivel + '\'' +
                ", fechaCreacion=" + fechaCreacion +
                ", tema=" + tema +
                ", respuestas=" + respuestas +
                '}';
    }
}