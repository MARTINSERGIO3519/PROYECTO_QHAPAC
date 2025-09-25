package com.utp.TPCursoIntegrador.market.domain.service;

import com.utp.TPCursoIntegrador.market.domain.dto.UserDTO;
import com.utp.TPCursoIntegrador.market.domain.repository.UserRepository;
import com.utp.TPCursoIntegrador.market.persistance.entity.Users;
import com.utp.TPCursoIntegrador.market.persistance.mapper.UserMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public List<UserDTO> getAll() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<UserDTO> getById(Integer id) {
        return userRepository.findById(id).map(userMapper::toDTO);
    }

    public UserDTO save(UserDTO dto) {
        Users user = userMapper.toEntity(dto);
        return userMapper.toDTO(userRepository.save(user));
    }

    public void delete(Integer id) {
        userRepository.deleteById(id);
    }

    // Login básico
    public boolean login(String correo, String contrasena) {
        return userRepository.findByCorreo(correo)
                .map(user -> user.getContrasena().equals(contrasena))
                .orElse(false);
    }
}
