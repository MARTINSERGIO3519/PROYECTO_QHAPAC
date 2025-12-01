package com.utp.TPCursoIntegrador.market.web.controller;

import com.utp.TPCursoIntegrador.market.persistence.entity.Respuesta;
import com.utp.TPCursoIntegrador.market.domain.service.RespuestaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/respuestas")
@CrossOrigin(origins = "http://localhost:3000")
public class RespuestaController {

    private final RespuestaService respuestaService;

    public RespuestaController(RespuestaService respuestaService) {
        this.respuestaService = respuestaService;
    }

    @GetMapping
    public List<Respuesta> getAll() {
        return respuestaService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Respuesta> getById(@PathVariable int id) {
        return respuestaService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Respuesta save(@RequestBody Respuesta respuesta) {
        return respuestaService.save(respuesta);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (respuestaService.delete(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
