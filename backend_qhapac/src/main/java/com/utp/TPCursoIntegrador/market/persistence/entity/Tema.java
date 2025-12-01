package com.utp.TPCursoIntegrador.market.persistence.entity;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Tema")
public class Tema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Tema")
    private Integer idTema;

    @Column(name = "nombre_Tema", nullable = false)
    private String nombreTema;

    // Muchos temas pertenecen a un nivel
    @ManyToOne
    @JoinColumn(name = "id_Nivel", nullable = false)
    private Nivel nivel;

    // Un tema tiene muchas preguntas
    @JsonIgnore
    @OneToMany(mappedBy = "tema", cascade = CascadeType.ALL)
    private List<Pregunta> pregunta;

    // GETTERS & SETTERS
    public Integer getIdTema() { return idTema; }
    public void setIdTema(Integer idTema) { this.idTema = idTema; }

    public String getNombreTema() { return nombreTema; }
    public void setNombreTema(String nombreTema) { this.nombreTema = nombreTema; }

    public Nivel getNivel() { return nivel; }
    public void setNivel(Nivel nivel) { this.nivel = nivel; }

<<<<<<< HEAD
    public List<Preguntas> getPreguntas() { return preguntas; }
    public void setPreguntas(List<Preguntas> preguntas) { this.preguntas = preguntas; }

    @Override
    public String toString() {
        return "Tema{" +
                "idTema=" + idTema +
                ", nombreTema='" + nombreTema + '\'' +
                ", periodo=" + periodo +
                '}';
    }
}
=======
    public List<Pregunta> getPregunta() { return pregunta; }
    public void setPregunta(List<Pregunta> preguntas) { this.pregunta = preguntas; }
}
>>>>>>> luis_sarmiento
