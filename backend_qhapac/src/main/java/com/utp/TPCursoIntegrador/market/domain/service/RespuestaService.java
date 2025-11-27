package com.utp.TPCursoIntegrador.market.domain.service;

import com.utp.TPCursoIntegrador.market.persistence.entity.Pregunta;
import com.utp.TPCursoIntegrador.market.persistence.entity.Respuesta;
import com.utp.TPCursoIntegrador.market.domain.repository.RespuestaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RespuestaService {

    private final RespuestaRepository respuestaRepository;

    public RespuestaService(RespuestaRepository respuestaRepository) {
        this.respuestaRepository = respuestaRepository;
    }

    public List<Respuesta> getAll() {
        return respuestaRepository.findAll();
    }

    public Optional<Respuesta> getById(Integer id) {
        return respuestaRepository.findById(id);
    }

    public List<Respuesta> getByPregunta(Integer idPregunta) {
        return respuestaRepository.findByPreguntaIdPregunta(idPregunta);
    }

    public Respuesta create(Respuesta respuesta) {
        return respuestaRepository.save(respuesta);
    }

    public Optional<Respuesta> update(Integer id, Respuesta respuesta) {
        if (!respuestaRepository.existsById(id)) {
            return Optional.empty();
        }
        respuesta.setIdRespuesta(id);
        return Optional.of(respuestaRepository.save(respuesta));
    }

    public Respuesta save(Respuesta respuesta) {
        return respuestaRepository.save(respuesta);
    }

    public boolean delete(Integer id) {
        if (!respuestaRepository.existsById(id)) {
            return false;
        }
        respuestaRepository.deleteById(id);
        return true;
    }
}
