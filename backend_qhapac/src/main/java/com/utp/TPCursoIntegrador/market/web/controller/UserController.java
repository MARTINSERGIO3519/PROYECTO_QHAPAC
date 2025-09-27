package com.utp.TPCursoIntegrador.market.web.controller;

import com.utp.TPCursoIntegrador.market.domain.dto.UserDTO;
import com.utp.TPCursoIntegrador.market.domain.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<UserDTO> getAll() {
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<UserDTO> getById(@PathVariable Integer id) {
        return userService.getById(id);
    }

    @PostMapping("/add")
    public UserDTO add(@RequestBody UserDTO user) {
        return userService.save(user);
    }

    @PutMapping("/update")
    public UserDTO update(@RequestBody UserDTO user) {
        return userService.save(user);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id) {
        userService.delete(id);
    }

    // Endpoint de login
    @PostMapping("/login")
    public boolean login(@RequestBody Map<String, String> datos) {
        String correo = datos.get("correo");
        String contrasena = datos.get("contrasena");
        return userService.login(correo, contrasena);
    }
}
