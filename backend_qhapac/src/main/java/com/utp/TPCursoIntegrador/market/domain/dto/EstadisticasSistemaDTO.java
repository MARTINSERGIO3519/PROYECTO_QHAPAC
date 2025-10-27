package com.utp.TPCursoIntegrador.market.domain.dto;

public class EstadisticasSistemaDTO {
    private Long totalUsuarios;
    private Long administradores;
    private Long usuariosNormales;
    private Long usuariosActivos;

    // Constructores
    public EstadisticasSistemaDTO() {}

    public EstadisticasSistemaDTO(Long totalUsuarios, Long administradores,
                                  Long usuariosNormales, Long usuariosActivos) {
        this.totalUsuarios = totalUsuarios;
        this.administradores = administradores;
        this.usuariosNormales = usuariosNormales;
        this.usuariosActivos = usuariosActivos;
    }

    // Getters y Setters
    public Long getTotalUsuarios() { return totalUsuarios; }
    public void setTotalUsuarios(Long totalUsuarios) { this.totalUsuarios = totalUsuarios; }

    public Long getAdministradores() { return administradores; }
    public void setAdministradores(Long administradores) { this.administradores = administradores; }

    public Long getUsuariosNormales() { return usuariosNormales; }
    public void setUsuariosNormales(Long usuariosNormales) { this.usuariosNormales = usuariosNormales; }

    public Long getUsuariosActivos() { return usuariosActivos; }
    public void setUsuariosActivos(Long usuariosActivos) { this.usuariosActivos = usuariosActivos; }
}
