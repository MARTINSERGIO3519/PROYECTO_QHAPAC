// src/components/LoginPrincipal.js
import React, { useState } from 'react';
import './LoginPrincipal.css';

function LoginPrincipal({ onLogin, mostrarRegistro, mostrarRecuperar }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const testConnection = async () => {
    console.log("🔍 Probando conexión con el backend...");
    
    try {
      const response = await fetch("http://localhost:8090/test-connection", {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });
      
      console.log("📊 Health check status:", response.status);
      
      if (response.ok) {
        const text = await response.text();
        console.log("✅ Health check OK:", text);
        return true;
      } else {
        console.log("❌ Health check failed - Status:", response.status);
        return false;
      }
    } catch (error) {
      console.error("💥 Error en health check:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      alert('❌ Ingrese correo y contraseña');
      return;
    }

    setLoading(true);
    try {
      console.log("🚀 Iniciando proceso de login...");
      
      // Probar conexión primero
      const isHealthy = await testConnection();
      if (!isHealthy) {
        throw new Error("No se puede conectar al servidor. Verifica que el backend esté ejecutándose.");
      }

      console.log("✅ Conexión exitosa, enviando credenciales...");
      
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

      console.log("📨 Respuesta del login - Status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Login exitoso:", data);
        
        const userData = {
          id: data.usuarioId,
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.correo,
          idRol: data.idRol
        };
        
        console.log("👤 Datos del usuario para localStorage:", userData);
        
        // Llamar a onLogin con los datos del usuario y el token
        if (onLogin) onLogin(userData, data.token);
      } else {
        const errorText = await response.text();
        console.error("❌ Error en login:", errorText);
        
        if (response.status === 401) {
          setError("❌ Credenciales inválidas. Verifique su correo y contraseña.");
        } else {
          setError(errorText || '❌ Error en el login');
        }
      }
    } catch (error) {
      console.error('💥 Error al iniciar sesión:', error);
      
      let errorMessage = '❌ No se pudo conectar con el servidor';
      if (error.message.includes("Failed to fetch")) {
        errorMessage = "❌ No se puede conectar al servidor. Verifica que:\n• El backend esté ejecutándose en puerto 8090\n• La base de datos esté conectada";
      }
      
      setError(errorMessage);
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
    <div className="login-principal-container">
      {/* Header */}
      <div className="login-principal-header">
        <h1>Bienvenido a Qhapac</h1>
        <p>Ingresa a tu cuenta para continuar tu aventura histórica</p>
      </div>

      {/* Contenido principal - Grid de 2 columnas */}
      <div className="login-principal-content">
        {/* Formulario de login */}
        <div className="login-form-section">
          <form className="login-principal-form" onSubmit={handleSubmit}>
            {error && (
              <div className="alert-error" role="alert">
                <i className="bi bi-exclamation-triangle"></i>
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">📧 Correo Electrónico</label>
              <input
                type="email"
                className={`form-control ${error ? 'is-invalid' : ''}`}
                placeholder="tu.correo@ejemplo.com"
                value={email}
                onChange={handleEmailChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">🔒 Contraseña</label>
              <div className="input-group">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className={`form-control ${error ? 'is-invalid' : ''}`}
                  placeholder="Ingresa tu contraseña"
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

            {/* Enlace de recuperación */}
            <div className="recovery-link">
              <button
                type="button"
                className="btn-link"
                onClick={mostrarRecuperar}
                disabled={loading}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button 
              type="submit" 
              className="btn-login" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Iniciando Sesión...
                </>
              ) : (
                "🚀 Ingresar"
              )}
            </button>

            <div className="login-footer">
              <div className="separator">
                <span>¿No tienes cuenta?</span>
              </div>

              <button
                type="button"
                className="btn-registro"
                onClick={mostrarRegistro}
                disabled={loading}
              >
                Crear Cuenta
              </button>
            </div>
          </form>
        </div>

        {/* Información lateral */}
        <div className="login-info-section">
          <div className="info-card">
            <div className="info-icon">🎮</div>
            <h3>Aventura Histórica</h3>
            <p>Sumérgete en la fascinante historia del Perú a través de quizzes interactivos y desafíos emocionantes.</p>
          </div>

          <div className="info-card">
            <div className="info-icon">📊</div>
            <h3>Sigue tu Progreso</h3>
            <p>Monitoriza tu aprendizaje y mejora constantemente con nuestro sistema de seguimiento detallado.</p>
          </div>

          <div className="info-card">
            <div className="info-icon">🏆</div>
            <h3>Logros y Reconocimientos</h3>
            <p>Desbloquea insignias especiales y demuestra tu conocimiento histórico.</p>
          </div>

          <div className="info-card highlight">
            <div className="info-icon">⭐</div>
            <h3>Nuevos Niveles</h3>
            <p>Descubre contenido exclusivo y desafíos únicos en cada periodo histórico.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPrincipal;