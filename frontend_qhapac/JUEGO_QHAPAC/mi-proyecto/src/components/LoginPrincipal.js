import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPrincipal({ onLogin, mostrarRegistro, mostrarRecuperar }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Ingrese Gmail y contraseña');
      return;
    }

    try {
      const response = await fetch("http://localhost:8090/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, contrasena: password }),
      });

      if (!response.ok) {
        alert('Error en el servidor. Inténtelo más tarde');
        return;
      }

      const resultado = await response.json();

      if (resultado.success) {
        alert(resultado.message);
        localStorage.setItem("usuario", email);
        if (onLogin) onLogin();
      } else {
        alert(resultado.message);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <form className="login-form p-4 shadow rounded bg-white" onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">QHAPAC</h1>

        {/* Gmail */}
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

        {/* Contraseña con ojito */}
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <div className="input-group">
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <i className={`bi ${passwordVisible ? "bi-eye-slash" : "bi-eye"}`}></i>
            </button>
          </div>
        </div>

        {/* Recuperar contraseña */}
        <button
          type="button"
          className="btn btn-link w-100"
          style={{ boxShadow: 'none' }}
          onClick={mostrarRecuperar}
        >
          No recuerdo mi contraseña
        </button>

        {/* Ingresar */}
        <button type="submit" className="btn btn-primary w-100 mb-2">
          Ingresar
        </button>

        {/* Crear cuenta */}
        <button
          type="button"
          className="btn btn-success w-100"
          onClick={mostrarRegistro}
        >
          Crear Cuenta
        </button>
      </form>
    </div>
  );
}

export default LoginPrincipal;