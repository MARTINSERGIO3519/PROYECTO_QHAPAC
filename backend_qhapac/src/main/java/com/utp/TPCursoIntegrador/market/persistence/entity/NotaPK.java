package com.utp.TPCursoIntegrador.market.persistence.entity;

import java.io.Serializable;
import java.util.Objects;

public class NotaPK implements Serializable {

    private Integer idUsuario;
    private Integer idNivel;
    private Integer idPeriodo;

    public NotaPK() {}

    public NotaPK(Integer idUsuario, Integer idNivel, Integer idPeriodo) {
        this.idUsuario = idUsuario;
        this.idNivel = idNivel;
        this.idPeriodo = idPeriodo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof NotaPK)) return false;
        NotaPK pk = (NotaPK) o;
        return Objects.equals(idUsuario, pk.idUsuario) &&
                Objects.equals(idNivel, pk.idNivel) &&
                Objects.equals(idPeriodo, pk.idPeriodo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUsuario, idNivel, idPeriodo);
    }
}
