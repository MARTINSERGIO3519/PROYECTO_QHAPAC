package com.utp.TPCursoIntegrador.market.domain.dto;

import com.google.common.base.MoreObjects;
import jakarta.validation.constraints.Email; // Cambiado
import jakarta.validation.constraints.NotBlank; // Cambiado
import jakarta.validation.constraints.NotNull; // Cambiado
import jakarta.validation.constraints.Size; // Cambiado
import java.util.Objects;

public class UsuarioRegistroDTO {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 40, message = "El nombre no puede tener más de 40 caracteres")
    private String nombre;

    @NotBlank(message = "El apellido es obligatorio")
    @Size(max = 40, message = "El apellido no puede tener más de 40 caracteres")
    private String apellido;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El formato del correo no es válido")
    private String correo;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String contrasenia;

    @NotNull(message = "Las horas semanales son obligatorias")
    private Float horasSemanales;

    // Constructores, getters y setters (igual que antes)
    public UsuarioRegistroDTO() {}

    public UsuarioRegistroDTO(String nombre, String apellido, String correo, String contrasenia, Float horasSemanales) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contrasenia = contrasenia;
        this.horasSemanales = horasSemanales;
    }

    // Getters y Setters
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getContrasenia() { return contrasenia; }
    public void setContrasenia(String contrasenia) { this.contrasenia = contrasenia; }

    public Float getHorasSemanales() { return horasSemanales; }
    public void setHorasSemanales(Float horasSemanales) { this.horasSemanales = horasSemanales; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsuarioRegistroDTO that = (UsuarioRegistroDTO) o;
        return Objects.equals(correo, that.correo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(correo);
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("nombre", nombre)
                .add("apellido", apellido)
                .add("correo", correo)
                .add("horasSemanales", horasSemanales)
                .toString();
    }
}