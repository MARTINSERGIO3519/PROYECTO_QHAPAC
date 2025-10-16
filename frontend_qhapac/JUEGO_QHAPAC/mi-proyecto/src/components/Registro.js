import React, { useState } from 'react';

function RegistroUsuario({ volverLogin }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !username || !password || !confirmPassword) {
      alert('Complete todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden ❌");
      return;
    }

    try {
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

        {/* Email */}
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

        {/* Nombre de usuario */}
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

        {/* Contraseña */}
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

        {/* Confirmar contraseña */}
        <div className="mb-3">
          <label className="form-label">Confirmar contraseña</label>
          <div className="input-group">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              <i className={`bi ${confirmPasswordVisible ? "bi-eye-slash" : "bi-eye"}`}></i>
            </button>
          </div>
        </div>

        {/* Botones */}
        <button type="submit" className="btn btn-success w-100 mb-2">Registrarse</button>
        <button type="button" className="btn btn-link w-100" onClick={volverLogin} style={{boxShadow: 'none'}}>
          Volver al login
        </button>
      </form>
    </div>
  );
}

export default RegistroUsuario;


