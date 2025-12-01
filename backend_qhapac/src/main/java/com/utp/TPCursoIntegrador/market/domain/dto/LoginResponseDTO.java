package com.utp.TPCursoIntegrador.market.domain.dto;

public class LoginResponseDTO {
    private Integer usuarioId;
    private String nombre;
    private String apellido;
    private String correo;
    private Integer idRol;
    private String token; // ✅ Asegúrate de que tenga este campo

    // Constructores
    public LoginResponseDTO() {}

    public LoginResponseDTO(Integer usuarioId, String nombre, String apellido, String correo, Integer idRol) {
        this.usuarioId = usuarioId;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.idRol = idRol;
    }

    public LoginResponseDTO(Integer usuarioId, String nombre, String apellido, String correo, Integer idRol, String token) {
        this.usuarioId = usuarioId;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.idRol = idRol;
        this.token = token;
    }

    // Getters y Setters
    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public Integer getIdRol() { return idRol; }
    public void setIdRol(Integer idRol) { this.idRol = idRol; }

<<<<<<< HEAD
=======
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

>>>>>>> luis_sarmiento
    @Override
    public String toString() {
        return "LoginResponseDTO{" +
                "usuarioId=" + usuarioId +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", correo='" + correo + '\'' +
                ", idRol=" + idRol +
<<<<<<< HEAD
                '}';
    }
}
=======
                ", token='" + (token != null ? "***" : "null") + '\'' +
                '}';
    }
}
>>>>>>> luis_sarmiento
