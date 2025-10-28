package com.utp.TPCursoIntegrador.market.persistence.mapper;

import com.utp.TPCursoIntegrador.market.domain.dto.UsuarioRegistroDTO;
import com.utp.TPCursoIntegrador.market.domain.dto.UsuarioResponseDTO;
import com.utp.TPCursoIntegrador.market.domain.service.ConfiguracionService;
import com.utp.TPCursoIntegrador.market.persistence.entity.Usuario;
import com.utp.TPCursoIntegrador.market.persistence.entity.Credenciales;
import com.google.common.base.Preconditions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class UsuarioMapper {

    private final ConfiguracionService configuracionService;

    @Autowired
    public UsuarioMapper(ConfiguracionService configuracionService) {
        this.configuracionService = configuracionService;
    }

    public Usuario toUsuarioEntity(UsuarioRegistroDTO dto) {
        Preconditions.checkNotNull(dto, "El DTO de registro no puede ser nulo");

        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setApellido(dto.getApellido());
        usuario.setIdRol(configuracionService.getRolPorDefecto()); // Rol desde configuración
        usuario.setExperienciaTotal(0.0f);
        usuario.setExperienciaSemanal(0.0f);
        usuario.setHorasSemanales(dto.getHorasSemanales() != null ? dto.getHorasSemanales() : 0.0f);
        usuario.setFechaRegistro(LocalDateTime.now());
        usuario.setIdEstadoUsuario(configuracionService.getEstadoUsuarioPorDefecto()); // Estado desde configuración

        return usuario;
    }

    // Los otros métodos permanecen igual...
    public Credenciales toCredencialesEntity(UsuarioRegistroDTO dto, Integer usuarioId, String contraseniaHash) {
        Preconditions.checkNotNull(dto, "El DTO de registro no puede ser nulo");
        Preconditions.checkNotNull(usuarioId, "El ID de usuario no puede ser nulo");
        Preconditions.checkNotNull(contraseniaHash, "El hash de contraseña no puede ser nulo");

        Credenciales credenciales = new Credenciales();
        credenciales.setIdUsuario(usuarioId);
        credenciales.setCorreo(dto.getCorreo());
        credenciales.setContrasenia(contraseniaHash);

        return credenciales;
    }

    public UsuarioResponseDTO toUsuarioResponseDTO(Usuario usuario, String correo) {
        Preconditions.checkNotNull(usuario, "La entidad Usuario no puede ser nula");

        return new UsuarioResponseDTO(
                usuario.getIdUsuario(),
                usuario.getNombre(),
                usuario.getApellido(),
                correo,
                usuario.getFechaRegistro()
        );
    }
}