package com.utp.TPCursoIntegrador.market.domain.service;

import com.utp.TPCursoIntegrador.market.persistence.entity.Nivel;
import com.utp.TPCursoIntegrador.market.persistence.entity.Tema;
import com.utp.TPCursoIntegrador.market.domain.repository.TemaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TemaService {

    private final TemaRepository temaRepository;

    public TemaService(TemaRepository temaRepository) {
        this.temaRepository = temaRepository;
    }

    public List<Tema> getAll() {
        return temaRepository.findAll();
    }

    public Optional<Tema> getById(Integer id) {
        return temaRepository.findById(id);
    }

    public List<Tema> getByNivel(Integer idNivel) {
        return temaRepository.findByNivelIdNivel(idNivel);
    }

    public Tema create(Tema tema) {
        return temaRepository.save(tema);
    }

    public Optional<Tema> update(Integer id, Tema tema) {
        if (!temaRepository.existsById(id)) {
            return Optional.empty();
        }
        tema.setIdTema(id);
        return Optional.of(temaRepository.save(tema));
    }

    public Tema save(Tema tema) {
        return temaRepository.save(tema);
    }

    public boolean delete(Integer id) {
        if (!temaRepository.existsById(id)) {
            return false;
        }
        temaRepository.deleteById(id);
        return true;
    }
}
