package com.utp.TPCursoIntegrador.market.domain.service;

import com.utp.TPCursoIntegrador.market.domain.dto.*;
import com.utp.TPCursoIntegrador.market.domain.mapper.UsuarioMapper;
import com.utp.TPCursoIntegrador.market.persistence.entity.Usuario;
import com.utp.TPCursoIntegrador.market.persistence.entity.Credenciales;
import com.utp.TPCursoIntegrador.market.persistence.repository.UsuarioRepository;
import com.utp.TPCursoIntegrador.market.persistence.repository.CredencialesRepository;
import com.google.common.base.Preconditions;
import com.google.common.hash.Hashing;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private static final Logger logger = LoggerFactory.getLogger(AdminService.class);

    private final UsuarioRepository usuarioRepository;
    private final CredencialesRepository credencialesRepository;
    private final UsuarioMapper usuarioMapper;

    @Autowired
    public AdminService(UsuarioRepository usuarioRepository,
                        CredencialesRepository credencialesRepository,
                        UsuarioMapper usuarioMapper) {
        this.usuarioRepository = usuarioRepository;
        this.credencialesRepository = credencialesRepository;
        this.usuarioMapper = usuarioMapper;
    }

    public List<UsuarioAdminDTO> obtenerTodosUsuarios() {
        logger.info("Obteniendo todos los usuarios del sistema");
        List<Usuario> usuarios = usuarioRepository.findAll();

        return usuarios.stream()
                .map(usuario -> {
                    Optional<Credenciales> credenciales = credencialesRepository.findByIdUsuario(usuario.getIdUsuario());
                    String email = credenciales.map(Credenciales::getCorreo).orElse("No disponible");
                    return toUsuarioAdminDTO(usuario, email);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public UsuarioResponseDTO crearUsuario(GestionUsuarioRequest request) {
        logger.info("Creando usuario como administrador: {}", request.getCorreo());

        Preconditions.checkNotNull(request, "La solicitud no puede ser nula");
        Preconditions.checkNotNull(request.getIdRol(), "El rol es obligatorio");

        // Validar que el correo no esté registrado
        if (credencialesRepository.existsByCorreo(request.getCorreo())) {
            throw new IllegalArgumentException("El correo ya está registrado");
        }

        // Hashear contraseña
        String contraseniaHash = Hashing.sha256()
                .hashString(request.getContrasenia(), StandardCharsets.UTF_8)
                .toString();

        // Crear usuario usando el mapper existente
        UsuarioRegistroDTO registroDTO = new UsuarioRegistroDTO();
        registroDTO.setNombre(request.getNombre());
        registroDTO.setApellido(request.getApellido());
        registroDTO.setCorreo(request.getCorreo());
        registroDTO.setContrasenia(request.getContrasenia());
        registroDTO.setHorasSemanales(request.getHorasSemanales() != null ? request.getHorasSemanales() : 0.0f);

        Usuario usuario = usuarioMapper.toUsuarioEntity(registroDTO);
        // Sobrescribir el rol y estado (para administradores)
        usuario.setIdRol(request.getIdRol());
        // Asegurar que el estado sea activo por defecto
        usuario.setIdEstadoUsuario(1); // Activo

        usuario = usuarioRepository.save(usuario);

        // Crear credenciales usando el mapper existente
        Credenciales credenciales = usuarioMapper.toCredencialesEntity(registroDTO, usuario.getIdUsuario(), contraseniaHash);
        credencialesRepository.save(credenciales);

        logger.info("✅ Usuario creado exitosamente con ID: {}", usuario.getIdUsuario());

        // Usar el mapper para crear la respuesta
        return usuarioMapper.toUsuarioResponseDTO(usuario, request.getCorreo());
    }

    @Transactional
    public void cambiarRolUsuario(CambiarRolRequest request) {
        logger.info("Cambiando rol del usuario ID: {} a {}", request.getIdUsuario(), request.getNuevoRol());

        Optional<Usuario> usuarioOpt = usuarioRepository.findById(request.getIdUsuario());
        if (usuarioOpt.isEmpty()) {
            throw new IllegalArgumentException("Usuario no encontrado");
        }

        Usuario usuario = usuarioOpt.get();
        usuario.setIdRol(request.getNuevoRol());
        usuarioRepository.save(usuario);

        logger.info("✅ Rol cambiado exitosamente para usuario ID: {}", request.getIdUsuario());
    }

    @Transactional
    public void cambiarEstadoUsuario(CambiarEstadoRequest request) {
        logger.info("Cambiando estado del usuario ID: {} a {}", request.getIdUsuario(), request.getNuevoEstado());

        Optional<Usuario> usuarioOpt = usuarioRepository.findById(request.getIdUsuario());
        if (usuarioOpt.isEmpty()) {
            throw new IllegalArgumentException("Usuario no encontrado");
        }

        Usuario usuario = usuarioOpt.get();
        usuario.setIdEstadoUsuario(request.getNuevoEstado());
        usuarioRepository.save(usuario);

        logger.info("✅ Estado cambiado exitosamente para usuario ID: {}", request.getIdUsuario());
    }

    public EstadisticasSistemaDTO obtenerEstadisticasSistema() {
        logger.info("Obteniendo estadísticas del sistema");

        long totalUsuarios = usuarioRepository.count();
        long administradores = usuarioRepository.countByIdRol(1);
        long usuariosNormales = usuarioRepository.countByIdRol(2);
        long usuariosActivos = usuarioRepository.countByIdEstadoUsuario(1);

        return new EstadisticasSistemaDTO(totalUsuarios, administradores, usuariosNormales, usuariosActivos);
    }

    // Método auxiliar para convertir Usuario a UsuarioAdminDTO - CORREGIDO
    private UsuarioAdminDTO toUsuarioAdminDTO(Usuario usuario, String email) {
        UsuarioAdminDTO dto = new UsuarioAdminDTO();
        dto.setIdUsuario(usuario.getIdUsuario());
        dto.setNombre(usuario.getNombre());
        dto.setApellido(usuario.getApellido());
        dto.setEmail(email);
        dto.setIdRol(usuario.getIdRol());

        // CORRECCIÓN: Convertir Float a Integer de forma segura
        dto.setExperiencia_Total(usuario.getExperienciaTotal() != null ?
                usuario.getExperienciaTotal().intValue() : 0);
        dto.setExperiencia_Semanal(usuario.getExperienciaSemanal() != null ?
                usuario.getExperienciaSemanal().intValue() : 0);

        dto.setHoras_Semanales(usuario.getHorasSemanales());
        dto.setFecha_Registro(usuario.getFechaRegistro());
        dto.setId_Estado_Usuario(usuario.getIdEstadoUsuario());
        return dto;
    }
}