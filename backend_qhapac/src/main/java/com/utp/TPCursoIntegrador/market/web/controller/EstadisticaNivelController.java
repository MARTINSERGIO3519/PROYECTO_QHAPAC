package com.utp.TPCursoIntegrador.market.web.controller;

import com.utp.TPCursoIntegrador.market.domain.service.EstadisticaNivelService;
import com.utp.TPCursoIntegrador.market.persistence.entity.EstadisticaNivel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estadistica-nivel")
@CrossOrigin(origins = "http://localhost:3000")
public class EstadisticaNivelController {

    private final EstadisticaNivelService service;

    public EstadisticaNivelController(EstadisticaNivelService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<EstadisticaNivel>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EstadisticaNivel> getById(@PathVariable int id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/save")
    public ResponseEntity<EstadisticaNivel> save(@RequestBody EstadisticaNivel data) {
        return ResponseEntity.ok(service.save(data));
    }

    // UPDATE sin {id} en la URL
    @PutMapping("/update")
    public ResponseEntity<EstadisticaNivel> update(@RequestBody EstadisticaNivel data) {
        return service.update(data)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
