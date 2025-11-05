package com.utp.TPCursoIntegrador.market.persistence.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "periodo")
public class Periodo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_Periodo;

    private String nombre_Periodo;
    
    @OneToMany(mappedBy="periodo")
    private List<Nivel> nivel;
}
