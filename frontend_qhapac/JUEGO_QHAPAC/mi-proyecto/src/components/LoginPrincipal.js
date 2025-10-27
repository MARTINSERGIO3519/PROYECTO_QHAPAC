import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPrincipal({ onLogin, mostrarRegistro, mostrarRecuperar }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      alert('Ingrese correo y contraseña');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8090/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          correo: email, 
          contrasenia: password 
        }),
      });

      console.log("Respuesta del login:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Login exitoso:", data);
        
        // VERIFICAR QUE LOS NOMBRES DE PROPIEDADES COINCIDAN
        const userData = {
          id: data.usuarioId,        // ← debe coincidir con 'usuarioId' del DTO
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.correo,
          idRol: data.idRol          // ← debe coincidir con 'idRol' del DTO
        };
        
        console.log("Datos del usuario para localStorage:", userData);
        
        localStorage.setItem("usuario", JSON.stringify(userData));
        
        // Pasar los datos completos al onLogin
        if (onLogin) onLogin(userData);
      } else {
        const errorText = await response.text();
        console.error("Error en login:", errorText);
        
        if (response.status === 401) {
          setError("Credenciales inválidas. Verifique su correo y contraseña.");
        } else {
          setError(errorText || 'Error en el login');
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <form className="login-form p-4 shadow rounded bg-white" onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">QHAPAC</h1>

        {/* Mensaje de error */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className={`form-control ${error ? 'is-invalid' : ''}`}
            value={email}
            onChange={handleEmailChange}
            required
            disabled={loading}
          />
        </div>

        {/* Contraseña con ojito */}
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <div className="input-group">
            <input
              type={passwordVisible ? "text" : "password"}
              className={`form-control ${error ? 'is-invalid' : ''}`}
              value={password}
              onChange={handlePasswordChange}
              required
              disabled={loading}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setPasswordVisible(!passwordVisible)}
              disabled={loading}
            >
              <i className={`bi ${passwordVisible ? "bi-eye-slash" : "bi-eye"}`}></i>
            </button>
          </div>
        </div>

        {/* Recuperar contraseña */}
        <button
          type="button"
          className="btn btn-link w-100 mb-3"
          style={{ boxShadow: 'none' }}
          onClick={mostrarRecuperar}
          disabled={loading}
        >
          No recuerdo mi contraseña
        </button>

        {/* Ingresar */}
        <button type="submit" className="btn btn-primary w-100 mb-2" disabled={loading}>
          {loading ? "Iniciando sesión..." : "Ingresar"}
        </button>

        {/* Crear cuenta */}
        <button
          type="button"
          className="btn btn-success w-100"
          onClick={mostrarRegistro}
          disabled={loading}
        >
          Crear Cuenta
        </button>
      </form>
    </div>
  );
}

export default LoginPrincipal;