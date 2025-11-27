package com.utp.TPCursoIntegrador.market.domain.service;

import com.utp.TPCursoIntegrador.market.persistence.entity.Nivel;
import com.utp.TPCursoIntegrador.market.domain.repository.NivelRepository;
import com.utp.TPCursoIntegrador.market.persistence.entity.Periodo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NivelService {

    private final NivelRepository nivelRepository;

    public NivelService(NivelRepository nivelRepository) {
        this.nivelRepository = nivelRepository;
    }

    public List<Nivel> getAll() {
        return nivelRepository.findAll();
    }

    public Optional<Nivel> getById(Integer id) {
        return nivelRepository.findById(id);
    }

    public List<Nivel> getByPeriodo(Integer idPeriodo) {
        return nivelRepository.findByPeriodoIdPeriodo(idPeriodo);
    }

    public Nivel create(Nivel nivel) {
        return nivelRepository.save(nivel);
    }

    public Optional<Nivel> update(Integer id, Nivel nivel) {
        if (!nivelRepository.existsById(id)) {
            return Optional.empty();
        }
        nivel.setIdNivel(id);
        return Optional.of(nivelRepository.save(nivel));
    }

    public Nivel save(Nivel nivel) {
        return nivelRepository.save(nivel);
    }

    public boolean delete(Integer id) {
        if (!nivelRepository.existsById(id)) {
            return false;
        }
        nivelRepository.deleteById(id);
        return true;
    }
}
