import React, { useState } from 'react';

function RegistroUsuario({ volverLogin }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
      alert('Complete todos los campos');
      return;
    }

    try {
      // Enviamos solo lo necesario: nombre, correo y contraseña
      const response = await fetch("http://localhost:8090/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: username,
          correo: email,
          contrasena: password
        }),
      });

      if (response.ok) {
        alert("Usuario registrado con éxito ✅");
        volverLogin();
      } else {
        const errorMsg = await response.text();
        alert("Error al registrar usuario: " + errorMsg);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <form className="login-form p-4 shadow rounded bg-white" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Registro</h2>

        <div className="mb-3">
          <label className="form-label">Gmail</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nombre de usuario</label>
          <input
            type="text"
            className="form-control"
            placeholder="Tu nombre"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100 mb-2">Registrarse</button>
        <button type="button" className="btn btn-link w-100" onClick={volverLogin} style={{boxShadow: 'none'}}>
          Volver al login
        </button>
      </form>
    </div>
  );
}

export default RegistroUsuario;
