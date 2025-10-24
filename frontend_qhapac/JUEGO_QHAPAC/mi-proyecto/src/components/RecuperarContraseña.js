import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RecuperarContraseña() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Ingrese su Gmail');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8090/users/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email })
      });

      const resultado = await response.json();

      if (resultado.success) {
        // Mostrar mensaje de espera
        setMensaje("✅ Correo enviado. Serás redirigido a la página de cambio de contraseña en unos segundos...");
        
        // Esperar 2 segundos y redirigir
        setTimeout(() => {
          navigate("/cambiar", { state: { correo: email } });
        }, 2000);
      } else {
        alert(resultado.message);
      }
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
        <h2 className="text-center mb-4">Recuperar Contraseña</h2>

        {mensaje && <div className="alert alert-success">{mensaje}</div>}

        {!mensaje && (
          <>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input 
                type="email" 
                className="form-control" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-warning w-100 mb-2" 
              disabled={loading}
            >
              {loading ? "Enviando..." : "Recuperar contraseña"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default RecuperarContraseña;