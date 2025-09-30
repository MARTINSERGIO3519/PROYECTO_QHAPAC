import React, { useState } from 'react';

function RecuperarContraseña({ volverLogin }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert('Se ha enviado un correo de recuperación a ' + email);
      volverLogin();
    } else {
      alert('Ingrese su Gmail');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <form className="login-form p-4 shadow rounded" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Recuperar Contraseña</h2>
        <div className="mb-3">
          <label className="form-label">Gmail</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-warning w-100 mb-2">Enviar correo</button>
        <button type="button" className="btn btn-link w-100" onClick={volverLogin} style={{boxShadow: 'none'}}>Volver al login</button>
      </form>
    </div>
  );
}

export default RecuperarContraseña;
