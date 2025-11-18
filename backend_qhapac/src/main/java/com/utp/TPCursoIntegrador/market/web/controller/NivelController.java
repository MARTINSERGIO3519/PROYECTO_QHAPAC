package com.utp.TPCursoIntegrador.market.web.controller;

import com.utp.TPCursoIntegrador.market.persistence.entity.Nivel;
import com.utp.TPCursoIntegrador.market.domain.service.NivelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/niveles")
@CrossOrigin(origins = "http://localhost:3000")
public class NivelController {

    private final NivelService nivelService;

    public NivelController(NivelService nivelService) {
        this.nivelService = nivelService;
    }

    @GetMapping
    public List<Nivel> getAll() {
        return nivelService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nivel> getById(@PathVariable int id) {
        return nivelService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Nivel save(@RequestBody Nivel nivel) {
        return nivelService.save(nivel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (nivelService.delete(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
