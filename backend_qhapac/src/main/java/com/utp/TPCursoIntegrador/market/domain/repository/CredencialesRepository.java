package com.utp.TPCursoIntegrador.market.domain.repository;

import com.utp.TPCursoIntegrador.market.persistence.entity.Credenciales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface CredencialesRepository extends JpaRepository<Credenciales, Integer> {
    Optional<Credenciales> findByCorreo(String correo);
    boolean existsByCorreo(String correo);
    Optional<Credenciales> findByCodigoTemporal(String codigoTemporal);

    @Query("SELECT c FROM Credenciales c WHERE c.idUsuario = :idUsuario")
    Optional<Credenciales> findByIdUsuario(@Param("idUsuario") Integer idUsuario);
}