import React, { useState } from 'react';

function RecuperarContraseña({ volverLogin, mostrarCambiarContrasenia }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [esExito, setEsExito] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMensaje('❌ Ingrese su correo electrónico');
      setEsExito(false);
      return;
    }

    setLoading(true);
    setMensaje('');
    setEsExito(false);
    
    try {
      console.log("📧 Enviando solicitud de recuperación para:", email);
      
      const response = await fetch("http://localhost:8090/api/auth/recuperar-password", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          correo: email 
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
        const mensajeExito = responseData.mensaje || "Si el correo existe en nuestro sistema, se ha enviado un código de recuperación";
        setMensaje("✅ " + mensajeExito);
        setEsExito(true); // Marcar como éxito
        
        console.log("✅ Código enviado exitosamente, redirigiendo...");
        
        // Redirigir a CambiarContraseña después de 2 segundos
        setTimeout(() => {
          mostrarCambiarContrasenia(email);
        }, 2000);
        
      } else {
        const errorMensaje = responseData.mensaje || "Error al enviar el código de recuperación";
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

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <form className="login-form p-4 shadow rounded bg-white" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Recuperar Contraseña</h2>

        {mensaje && (
          <div className={`alert ${esExito ? 'alert-success' : 'alert-danger'}`}>
            {mensaje}
            {esExito && (
              <div className="mt-2">
                <small>Redirigiendo a cambio de contraseña...</small>
              </div>
            )}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input 
            type="email" 
            className="form-control" 
            placeholder="Ingresa tu correo electrónico"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            disabled={loading}
            required
          />
        </div>

        <button type="submit" className="btn btn-warning w-100 mb-2" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Enviando...
            </>
          ) : (
            "Enviar Código de Recuperación"
          )}
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

export default RecuperarContraseña;