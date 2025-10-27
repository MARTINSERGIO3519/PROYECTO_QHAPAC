import React, { useState } from 'react';

function RegistroUsuario({ volverLogin }) {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');

  const testConnection = async () => {
    console.log("Probando conexión con el backend...");
    
    try {
      const response = await fetch("http://localhost:8090/api/usuarios/health", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      
      console.log("Health check status:", response.status);
      if (response.ok) {
        const text = await response.text();
        console.log("Health check OK:", text);
        return true;
      } else {
        console.log("Health check failed:", response.status);
        return false;
      }
    } catch (error) {
      console.error("Error en health check:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorEmail('');

    if (!email || !nombre || !apellido || !password || !confirmPassword) {
      alert('Complete todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden ❌");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);
    
    try {
      console.log("Iniciando proceso de registro...");
      
      const isHealthy = await testConnection();
      if (!isHealthy) {
        throw new Error("No se puede conectar al servidor. Verifica que el backend esté ejecutándose.");
      }

      console.log("Enviando datos de registro...");
      
      const response = await fetch("http://localhost:8090/api/usuarios/registro", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          nombre: nombre,
          apellido: apellido,
          correo: email,
          contrasenia: password,
          horasSemanales: 0.0
        }),
      });

      console.log("Respuesta recibida - Status:", response.status);
      console.log("Respuesta recibida - OK:", response.ok);
      
      const responseText = await response.text();
      console.log("Respuesta texto completo:", responseText);
      
      if (response.ok) {
        const data = JSON.parse(responseText);
        console.log("Registro exitoso:", data);
        alert("Usuario registrado con éxito ✅");
        volverLogin();
      } else {
        console.error("Error del servidor - Status:", response.status);
        console.error("Error del servidor - Texto:", responseText);
        
        // Manejar diferentes códigos de error
        if (response.status === 400) {
          // Error de validación (BAD_REQUEST)
          if (responseText.includes("El correo ya está registrado") || 
              responseText.toLowerCase().includes("correo ya está registrado") ||
              responseText.toLowerCase().includes("ya está registrado")) {
            setErrorEmail("Este correo electrónico ya está registrado. Por favor, use otro correo.");
            return;
          } else {
            // Otro error de validación
            throw new Error(responseText);
          }
        } else if (response.status === 500) {
          // Error interno del servidor
          throw new Error("Error interno del servidor: " + responseText);
        } else {
          // Otro tipo de error
          throw new Error(responseText || `Error ${response.status}: ${response.statusText}`);
        }
      }
    } catch (error) {
      console.error("Error completo:", error);
      
      // Solo mostrar alerta si no es un error de correo duplicado (ya manejado arriba)
      if (!errorEmail) {
        alert(`❌ Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Limpiar error de email cuando el usuario modifique el campo
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errorEmail) {
      setErrorEmail('');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <form className="login-form p-4 shadow rounded bg-white" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Registro</h2>

        {/* Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* Apellido */}
        <div className="mb-3">
          <label className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            placeholder="Tu apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* Correo */}
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className={`form-control ${errorEmail ? 'is-invalid' : ''}`}
            value={email}
            onChange={handleEmailChange}
            required
            disabled={loading}
          />
          {errorEmail && (
            <div className="invalid-feedback d-block">
              {errorEmail}
            </div>
          )}
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
              minLength="6"
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
              minLength="6"
              disabled={loading}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              disabled={loading}
            >
              <i className={`bi ${confirmPasswordVisible ? "bi-eye-slash" : "bi-eye"}`}></i>
            </button>
          </div>
        </div>

        {/* Botones */}
        <button type="submit" className="btn btn-success w-100 mb-2" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
        <button 
          type="button" 
          className="btn btn-link w-100" 
          onClick={volverLogin} 
          style={{ boxShadow: 'none' }}
          disabled={loading}
        >
          Volver al login
        </button>
      </form>
    </div>
  );
}

export default RegistroUsuario;
