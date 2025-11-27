import React, { useState } from 'react';

function RecuperarContraseña({ volverLogin }) { // ✅ AHORA RECIBE volverLogin
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Ingrese su correo electrónico');
      return;
    }

    setLoading(true);
    setMensaje('');

    try {
      const response = await fetch("http://localhost:8090/api/auth/recuperar-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email })
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("✅ " + data.mensaje);
      } else {
        setMensaje("❌ " + (data.mensaje || "Error al enviar el código"));
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <form className="login-form p-4 shadow rounded bg-white" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Recuperar Contraseña</h2>

        {mensaje && (
          <div className={`alert ${mensaje.includes('✅') ? 'alert-success' : 'alert-danger'}`}>
            {mensaje}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            disabled={loading}
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-warning w-100 mb-2" 
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar Código de Recuperación"}
        </button>

        <button 
          type="button" 
          className="btn btn-link w-100" 
          onClick={volverLogin}  // ✅ usa la función enviada desde Login.js
          style={{boxShadow: 'none'}}
          disabled={loading}
        >
          Volver al login
        </button>
      </form>
    </div>
  );
}

export default RecuperarContraseña;
