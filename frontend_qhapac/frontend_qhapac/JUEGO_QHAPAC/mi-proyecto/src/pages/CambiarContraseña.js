import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CambiarContraseña() {
  const [codigo, setCodigo] = useState('');
  const [nuevaContrasenia, setNuevaContrasenia] = useState('');
  const [confirmarContrasenia, setConfirmarContrasenia] = useState('');
  const [loading, setLoading] = useState(false);
  const [nuevaVisible, setNuevaVisible] = useState(false);
  const [confirmarVisible, setConfirmarVisible] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!codigo || !nuevaContrasenia || !confirmarContrasenia) {
      setMensaje('❌ Todos los campos son obligatorios');
      return;
    }
    
    if (nuevaContrasenia !== confirmarContrasenia) {
      setMensaje('❌ Las contraseñas no coinciden');
      return;
    }

    if (nuevaContrasenia.length < 6) {
      setMensaje('❌ La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    setMensaje('');
    
    try {
      const response = await fetch("http://localhost:8090/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigoTemporal: codigo,
          nuevaContrasenia: nuevaContrasenia
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("✅ " + (data.mensaje || "Contraseña actualizada exitosamente"));
        setTimeout(() => {
          navigate('/login'); // Redirigir al login después del éxito
        }, 3000);
      } else {
        setMensaje("❌ " + (data.mensaje || "Error al actualizar la contraseña")); // Cambié data.error por data.mensaje
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleVolverLogin = () => {
    navigate('/login'); // Navegar al login
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <form className="login-form p-4 shadow rounded bg-white" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Cambiar Contraseña</h2>

        {mensaje && (
          <div className={`alert ${mensaje.includes('✅') ? 'alert-success' : 'alert-danger'}`}>
            {mensaje}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Código Temporal</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Ingresa el código que recibiste por correo"
            value={codigo} 
            onChange={(e) => setCodigo(e.target.value)} 
            disabled={loading}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nueva Contraseña</label>
          <div className="input-group">
            <input 
              type={nuevaVisible ? "text" : "password"} 
              className="form-control" 
              value={nuevaContrasenia} 
              onChange={(e) => setNuevaContrasenia(e.target.value)} 
              disabled={loading}
              minLength="6"
              required
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
          <label className="form-label">Confirmar Contraseña</label>
          <div className="input-group">
            <input 
              type={confirmarVisible ? "text" : "password"} 
              className="form-control" 
              value={confirmarContrasenia} 
              onChange={(e) => setConfirmarContrasenia(e.target.value)} 
              disabled={loading}
              minLength="6"
              required
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
          {loading ? "Actualizando..." : "Actualizar Contraseña"}
        </button>

        <button 
          type="button" 
          className="btn btn-link w-100" 
          onClick={handleVolverLogin} 
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
