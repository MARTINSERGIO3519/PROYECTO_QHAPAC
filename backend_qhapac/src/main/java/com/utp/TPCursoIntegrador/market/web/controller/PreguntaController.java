package com.utp.TPCursoIntegrador.market.web.controller;

import com.utp.TPCursoIntegrador.market.persistence.entity.Pregunta;
import com.utp.TPCursoIntegrador.market.domain.service.PreguntaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/preguntas")
@CrossOrigin(origins = "http://localhost:3000")
public class PreguntaController {

    private final PreguntaService preguntaService;

    public PreguntaController(PreguntaService preguntaService) {
        this.preguntaService = preguntaService;
    }

    @GetMapping
    public List<Pregunta> getAll() {
        return preguntaService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pregunta> getById(@PathVariable int id) {
        return preguntaService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Pregunta save(@RequestBody Pregunta pregunta) {
        return preguntaService.save(pregunta);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (preguntaService.delete(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
