package com.utp.TPCursoIntegrador.market.web.controller;

import com.utp.TPCursoIntegrador.market.domain.service.NivelService;
import com.utp.TPCursoIntegrador.market.persistence.entity.Nivel;
import com.utp.TPCursoIntegrador.market.persistence.entity.Periodo;
import com.utp.TPCursoIntegrador.market.domain.service.PeriodoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/periodos")
@CrossOrigin(origins = "http://localhost:3000")
public class PeriodoController {

    private final PeriodoService periodoService;

    public PeriodoController(PeriodoService periodoService) {
        this.periodoService = periodoService;
    }

    @GetMapping
    public List<Periodo> getAll() {
        return periodoService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Periodo> getById(@PathVariable int id) {
        return periodoService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Periodo save(@RequestBody Periodo periodo) {
        return periodoService.save(periodo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (periodoService.delete(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}