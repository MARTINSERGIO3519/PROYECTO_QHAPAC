import React, { useState } from 'react';

function CambiarContraseña({ volverLogin }) {
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nueva, setNueva] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [loading, setLoading] = useState(false);
  const [nuevaVisible, setNuevaVisible] = useState(false);
  const [confirmarVisible, setConfirmarVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!correo || !codigo || !nueva || !confirmar) {
      alert('Todos los campos son obligatorios');
      return;
    }
    if (nueva !== confirmar) {
      alert('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8090/users/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo,
          codigo,
          nuevaContrasena: nueva,
          confirmarContrasena: confirmar
        })
      });

      const resultado = await response.json();
      alert(resultado.message);
      if (resultado.success) volverLogin();
    } catch (error) {
      console.error(error);
      alert('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <form className="login-form p-4 shadow rounded" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Cambiar Contraseña</h2>

        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input 
            type="email" 
            className="form-control" 
            value={correo} 
            onChange={(e) => setCorreo(e.target.value)} 
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Código temporal</label>
          <input 
            type="text" 
            className="form-control" 
            value={codigo} 
            onChange={(e) => setCodigo(e.target.value)} 
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nueva contraseña</label>
          <div className="input-group">
            <input 
              type={nuevaVisible ? "text" : "password"} 
              className="form-control" 
              value={nueva} 
              onChange={(e) => setNueva(e.target.value)} 
              disabled={loading}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setNuevaVisible(!nuevaVisible)}
              disabled={loading}
            >
              <i className={`bi ${nuevaVisible ? "bi-eye-slash" : "bi-eye"}`}></i>
            </button>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmar contraseña</label>
          <div className="input-group">
            <input 
              type={confirmarVisible ? "text" : "password"} 
              className="form-control" 
              value={confirmar} 
              onChange={(e) => setConfirmar(e.target.value)} 
              disabled={loading}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setConfirmarVisible(!confirmarVisible)}
              disabled={loading}
            >
              <i className={`bi ${confirmarVisible ? "bi-eye-slash" : "bi-eye"}`}></i>
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-warning w-100 mb-2" disabled={loading}>
          {loading ? "Actualizando..." : "Actualizar contraseña"}
        </button>

        <button 
          type="button" 
          className="btn btn-link w-100" 
          onClick={volverLogin} 
          disabled={loading}
          style={{boxShadow: 'none'}}
        >
          Volver al login
        </button>
      </form>
    </div>
  );
}

export default CambiarContraseña;
