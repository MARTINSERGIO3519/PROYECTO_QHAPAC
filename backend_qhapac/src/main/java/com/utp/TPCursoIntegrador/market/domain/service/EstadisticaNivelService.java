package com.utp.TPCursoIntegrador.market.domain.service;

import com.utp.TPCursoIntegrador.market.domain.repository.EstadisticaNivelRepository;
import com.utp.TPCursoIntegrador.market.domain.repository.NivelRepository;
import com.utp.TPCursoIntegrador.market.persistence.entity.EstadisticaNivel;
import com.utp.TPCursoIntegrador.market.persistence.entity.Nivel;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstadisticaNivelService {

    private final EstadisticaNivelRepository repository;
    private final NivelRepository nivelRepository;

    public EstadisticaNivelService(EstadisticaNivelRepository repository, NivelRepository nivelRepository) {
        this.repository = repository;
        this.nivelRepository = nivelRepository;
    }

    public List<EstadisticaNivel> getAll() {
        return repository.findAll();
    }

    public Optional<EstadisticaNivel> getById(Integer id) {
        return repository.findById(id);
    }

    public EstadisticaNivel save(EstadisticaNivel data) {

        // Validar nivel (evita errores 500)
        if (data.getNivel() != null && data.getNivel().getIdNivel() != null) {
            Nivel nivelReal = nivelRepository.findById(data.getNivel().getIdNivel())
                    .orElseThrow(() -> new RuntimeException("Nivel no encontrado"));
            data.setNivel(nivelReal);
        }

        return repository.save(data);
    }

    public Optional<EstadisticaNivel> update(EstadisticaNivel data) {

        // ID viene dentro del JSON
        Integer id = data.getIdEstadisticaNivel();

        Optional<EstadisticaNivel> opt = repository.findById(id);

        if (opt.isEmpty()) {
            return Optional.empty();
        }

        EstadisticaNivel existente = opt.get();

        // Si ya jugó 3 veces → no actualizar
        if (existente.getPartidasJugadas() >= 3) {
            return Optional.of(existente);
        }

        // Actualiza solo si el nuevo puntaje es mayor
        if (data.getNotaPromedio() > existente.getNotaPromedio()) {
            existente.setNotaPromedio(data.getNotaPromedio());
        }

        // Incrementa la cantidad de partidas
        existente.setPartidasJugadas(existente.getPartidasJugadas() + 1);

        // Actualiza la fecha
        existente.setFecha(data.getFecha());

        return Optional.of(repository.save(existente));
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
