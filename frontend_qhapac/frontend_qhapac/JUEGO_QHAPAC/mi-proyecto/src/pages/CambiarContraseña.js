import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CambiarContraseña({ volverLogin, email }) {
  const [codigo, setCodigo] = useState('');
  const [nuevaContrasenia, setNuevaContrasenia] = useState('');
  const [confirmarContrasenia, setConfirmarContrasenia] = useState('');
  const [loading, setLoading] = useState(false);
  const [nuevaVisible, setNuevaVisible] = useState(false);
  const [confirmarVisible, setConfirmarVisible] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [esExito, setEsExito] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!codigo || !nuevaContrasenia || !confirmarContrasenia) {
      setMensaje('❌ Todos los campos son obligatorios');
      setEsExito(false);
      return;
    }
    
    if (nuevaContrasenia !== confirmarContrasenia) {
      setMensaje('❌ Las contraseñas no coinciden');
      setEsExito(false);
      return;
    }

    if (nuevaContrasenia.length < 6) {
      setMensaje('❌ La contraseña debe tener al menos 6 caracteres');
      setEsExito(false);
      return;
    }

    setLoading(true);
    setMensaje('');
    setEsExito(false);
    
    try {
      console.log("🔄 Enviando solicitud de cambio de contraseña...");
      
      const response = await fetch("http://localhost:8090/api/auth/reset-password", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          codigoTemporal: codigo,
          nuevaContrasenia: nuevaContrasenia
        })
      });

      console.log("📨 Respuesta recibida - Status:", response.status);

      let responseData;
      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        const responseText = await response.text();
        responseData = { mensaje: responseText };
      }

      if (response.ok) {
        const mensajeExito = responseData.mensaje || "Contraseña actualizada exitosamente";
        setMensaje("✅ " + mensajeExito);
        setEsExito(true); // Marcar como éxito
        
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          if (volverLogin) {
            volverLogin();
          } else {
            navigate('/login');
          }
        }, 3000);
      } else {
        const errorMensaje = responseData.mensaje || "Error al actualizar la contraseña";
        setMensaje("❌ " + errorMensaje);
        setEsExito(false);
      }
    } catch (error) {
      console.error("💥 Error completo:", error);
      setMensaje("❌ Error de conexión con el servidor");
      setEsExito(false);
    } finally {
      setLoading(false);
    }
  };

  const handleVolverLogin = () => {
    if (volverLogin) {
      volverLogin();
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <form className="login-form p-4 shadow rounded bg-white" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Cambiar Contraseña</h2>

        {email && (
          <div className="alert alert-info">
            <strong>Correo:</strong> {email}
            <br />
            <small>Se ha enviado un código a este correo</small>
          </div>
        )}

        {mensaje && (
          <div className={`alert ${esExito ? 'alert-success' : 'alert-danger'}`}>
            {mensaje}
            {esExito && (
              <div className="mt-2">
                <small>Redirigiendo al login...</small>
              </div>
            )}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Código Temporal</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Ingresa el código de 6 dígitos que recibiste por correo"
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
              placeholder="Mínimo 6 caracteres"
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
              placeholder="Repite tu nueva contraseña"
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
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Actualizando...
            </>
          ) : (
            "Actualizar Contraseña"
          )}
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