package com.utp.TPCursoIntegrador.market.domain.service;

import com.utp.TPCursoIntegrador.market.persistence.entity.Pregunta;
import com.utp.TPCursoIntegrador.market.domain.repository.PreguntaRepository;
import com.utp.TPCursoIntegrador.market.persistence.entity.Tema;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PreguntaService {

    private final PreguntaRepository preguntaRepository;

    public PreguntaService(PreguntaRepository preguntaRepository) {
        this.preguntaRepository = preguntaRepository;
    }

    public List<Pregunta> getAll() {
        return preguntaRepository.findAll();
    }

    public Optional<Pregunta> getById(Integer id) {
        return preguntaRepository.findById(id);
    }

    public List<Pregunta> getByTema(Integer idTema) {
        return preguntaRepository.findByTemaIdTema(idTema);
    }

    public Pregunta create(Pregunta pregunta) {
        return preguntaRepository.save(pregunta);
    }

    public Optional<Pregunta> update(Integer id, Pregunta pregunta) {
        if (!preguntaRepository.existsById(id)) {
            return Optional.empty();
        }
        pregunta.setIdPregunta(id);
        return Optional.of(preguntaRepository.save(pregunta));
    }

    public Pregunta save(Pregunta pregunta) {
        return preguntaRepository.save(pregunta);
    }

    public boolean delete(Integer id) {
        if (!preguntaRepository.existsById(id)) {
            return false;
        }
        preguntaRepository.deleteById(id);
        return true;
    }
}
