package com.utp.TPCursoIntegrador.market.domain.service;

import com.utp.TPCursoIntegrador.market.persistence.entity.Periodo;
import com.utp.TPCursoIntegrador.market.domain.repository.PeriodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PeriodoService {

    @Autowired
    private PeriodoRepository periodoRepository;

    public List<Periodo> getAll() {
        return periodoRepository.findAll();
    }

    public Optional<Periodo> getById(int id) {
        return periodoRepository.findById(id);
    }

    public Periodo save(Periodo periodo) {
        return periodoRepository.save(periodo);
    }

    public boolean delete(int id) {
        if (periodoRepository.existsById(id)) {
            periodoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
