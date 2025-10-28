package com.utp.TPCursoIntegrador.market.domain.repository;

import com.utp.TPCursoIntegrador.market.persistence.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    long countByIdRol(Integer idRol);

    // CORREGIDO: Usar @Query en lugar del método derivado
    @Query("SELECT COUNT(u) FROM Usuario u WHERE u.idEstadoUsuario = :idEstadoUsuario")
    long countByEstadoUsuario(@Param("idEstadoUsuario") Integer idEstadoUsuario);

    // O esta alternativa también funciona:
    long countByIdEstadoUsuario(Integer idEstadoUsuario);
}