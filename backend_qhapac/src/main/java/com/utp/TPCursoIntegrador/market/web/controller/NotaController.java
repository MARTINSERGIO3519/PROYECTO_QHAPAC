package com.utp.TPCursoIntegrador.market.web.controller;

import com.utp.TPCursoIntegrador.market.domain.dto.NotaDTO;
import com.utp.TPCursoIntegrador.market.domain.service.NotaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
@CrossOrigin(origins = "http://localhost:3000")
public class NotaController {

    private final NotaService service;

    public NotaController(NotaService service) {
        this.service = service;
    }

    // ================================
    //         GET ALL
    // ================================
    @GetMapping
    public ResponseEntity<List<NotaDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    // ================================
    //         GET BY ID
    // ================================
    @GetMapping("/{idUsuario}/{idNivel}/{idPeriodo}")
    public ResponseEntity<NotaDTO> getById(
            @PathVariable Integer idUsuario,
            @PathVariable Integer idNivel,
            @PathVariable Integer idPeriodo)
    {
        return service.getById(idUsuario, idNivel, idPeriodo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ================================
    //            CREATE
    // ================================
    @PostMapping
    public ResponseEntity<NotaDTO> create(@RequestBody NotaDTO dto) {
        NotaDTO created = service.create(dto);
        return ResponseEntity.ok(created);
    }

    // ================================
    //            UPDATE
    // ================================
    @PutMapping
    public ResponseEntity<NotaDTO> update(@RequestBody NotaDTO dto) {
        return service.update(dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ================================
    //            DELETE
    // ================================
    @DeleteMapping("/{idUsuario}/{idNivel}/{idPeriodo}")
    public ResponseEntity<Void> delete(
            @PathVariable Integer idUsuario,
            @PathVariable Integer idNivel,
            @PathVariable Integer idPeriodo)
    {
        boolean deleted = service.delete(idUsuario, idNivel, idPeriodo);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}
