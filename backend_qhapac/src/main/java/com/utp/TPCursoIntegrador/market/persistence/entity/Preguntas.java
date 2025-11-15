package com.utp.TPCursoIntegrador.market.persistence.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "preguntas") // opcional, según tu tabla
public class Preguntas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String texto;

    // si quieres la relación inversa
    @OneToMany(mappedBy = "pregunta")
    private List<Respuestas> respuestas;

    // getters y setters
}