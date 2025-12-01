package com.utp.TPCursoIntegrador.market.domain.service;

import com.utp.TPCursoIntegrador.market.domain.dto.NotaDTO;
import com.utp.TPCursoIntegrador.market.domain.repository.NotaRepository;
import com.utp.TPCursoIntegrador.market.persistence.entity.Nota;
import com.utp.TPCursoIntegrador.market.persistence.entity.NotaPK;
import com.utp.TPCursoIntegrador.market.persistence.mapper.NotaMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NotaService {

    private final NotaRepository notaRepository;

    public NotaService(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    // ==========================
    //     GET ALL
    // ==========================
    public List<NotaDTO> getAll() {
        Iterable<Nota> iterable = notaRepository.findAll();
        List<NotaDTO> notas = new ArrayList<>();

        for (Nota n : iterable) {
            notas.add(NotaMapper.toNotaDTO(n));
        }

        return notas;
    }

    // ==========================
    //     GET BY ID (PK)
    // ==========================
    public Optional<NotaDTO> getById(Integer idUsuario, Integer idNivel, Integer idPeriodo) {
        NotaPK pk = new NotaPK(idUsuario, idNivel, idPeriodo);

        Optional<Nota> notaOpt = notaRepository.findById(pk);

        if (notaOpt.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(NotaMapper.toNotaDTO(notaOpt.get()));
    }

    // ==========================
    //     CREATE
    // ==========================
    public NotaDTO create(NotaDTO dto) {
        Nota entity = NotaMapper.toNota(dto);
        Nota saved = notaRepository.save(entity);
        return NotaMapper.toNotaDTO(saved);
    }

    // ==========================
    //     UPDATE
    // ==========================
    public Optional<NotaDTO> update(NotaDTO dto) {

        NotaPK pk = new NotaPK(
                dto.getIdUsuario(),
                dto.getIdNivel(),
                dto.getIdPeriodo()
        );

        if (!notaRepository.existsById(pk)) {
            return Optional.empty();
        }

        Nota entity = NotaMapper.toNota(dto);
        Nota updated = notaRepository.save(entity);

        return Optional.of(NotaMapper.toNotaDTO(updated));
    }

    // ==========================
    //     DELETE
    // ==========================
    public boolean delete(Integer idUsuario, Integer idNivel, Integer idPeriodo) {
        NotaPK pk = new NotaPK(idUsuario, idNivel, idPeriodo);

        if (!notaRepository.existsById(pk)) {
            return false;
        }

        notaRepository.deleteById(pk);
        return true;
    }
}