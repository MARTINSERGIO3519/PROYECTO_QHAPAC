package com.utp.TPCursoIntegrador.market.persistance.mapper;

import com.utp.TPCursoIntegrador.market.domain.dto.UserDTO;
import com.utp.TPCursoIntegrador.market.persistance.entity.Users;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class UserMapper {

    public UserDTO toDTO(Users user) {
        UserDTO dto = new UserDTO();
        dto.setIdUsuario(user.getIdUsuario());
        dto.setNombre(user.getNombre());
        dto.setCorreo(user.getCorreo());
        dto.setRol(user.getRol());
        dto.setContrasena(user.getContrasena());
        return dto;
    }

    public Users toEntity(UserDTO dto) {
        Users user = new Users();
        user.setIdUsuario(dto.getIdUsuario());
        user.setNombre(dto.getNombre());
        user.setCorreo(dto.getCorreo());
        user.setRol("usuario");
        user.setContrasena(dto.getContrasena());
        user.setFechaRegistro(LocalDateTime.now());
        return user;
    }
}