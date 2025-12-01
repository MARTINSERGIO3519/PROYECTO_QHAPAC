import React, { useState } from 'react';
import './Registro.css';

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
    setErrorEmail('');

    if (!email || !nombre || !apellido || !password || !confirmPassword) {
      alert('❌ Complete todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      alert("❌ Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      alert("❌ La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("❌ Por favor ingrese un correo electrónico válido");
      return;
    }

    setLoading(true);
    
    try {
      console.log("🚀 Iniciando proceso de registro...");
      
      const isHealthy = await testConnection();
      
      if (!isHealthy) {
        throw new Error("No se puede conectar al servidor. Verifica que el backend esté ejecutándose.");
      }

      console.log("✅ Conexión exitosa, enviando datos de registro...");
      
      const response = await fetch("http://localhost:8090/api/usuarios/registro", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          correo: email.trim().toLowerCase(),
          contrasenia: password,
          horasSemanales: 0.0
        }),
      });

      console.log("📨 Respuesta recibida - Status:", response.status);
      
      let responseData;
      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        const responseText = await response.text();
        
        if (response.ok) {
          console.log("✅ Registro exitoso (respuesta no JSON)");
          alert("✅ Usuario registrado con éxito");
          volverLogin();
          return;
        } else {
          throw new Error(responseText || `Error ${response.status}`);
        }
      }

      if (response.ok) {
        console.log("✅ Registro exitoso:", responseData);
        alert("✅ Usuario registrado con éxito");
        volverLogin();
      } else {
        console.error("❌ Error del servidor - Status:", response.status);
        
        if (response.status === 400) {
          const errorMessage = typeof responseData === 'string' ? responseData : responseData.message || JSON.stringify(responseData);
          
          if (errorMessage.includes("El correo ya está registrado") || 
              errorMessage.toLowerCase().includes("correo ya está registrado") ||
              errorMessage.toLowerCase().includes("ya está registrado")) {
            setErrorEmail("📧 Este correo electrónico ya está registrado. Por favor, use otro correo.");
            return;
          } else {
            throw new Error(errorMessage);
          }
        } else if (response.status === 500) {
          throw new Error("Error interno del servidor. Por favor, contacte al administrador.");
        } else {
          throw new Error(`Error ${response.status}: ${typeof responseData === 'string' ? responseData : JSON.stringify(responseData)}`);
        }
      }
    } catch (error) {
      console.error("💥 Error completo:", error);
      
      if (!errorEmail) {
        let errorMessage = error.message;
        
        if (error.message.includes("Failed to fetch")) {
          errorMessage = "❌ No se puede conectar al servidor. Verifica que el backend esté ejecutándose.";
        } else if (error.message.includes("NetworkError")) {
          errorMessage = "❌ Error de red. Verifica tu conexión a internet.";
        }
        
        alert(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errorEmail) {
      setErrorEmail('');
    }
  };

  return (
    <div className="registro-container">
      {/* Header opcional */}
      <div className="registro-header">
        <h2>Únete a Qhapac</h2>
        <p>Crea tu cuenta y comienza tu aventura histórica</p>
      </div>

      {/* Formulario de registro */}
      <div className="registro-content">
        <form className="registro-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
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

            <div className="form-group">
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
          </div>

          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className={`form-control ${errorEmail ? 'is-invalid' : ''}`}
              placeholder="tu.correo@ejemplo.com"
              value={email}
              onChange={handleEmailChange}
              required
              disabled={loading}
            />
            {errorEmail && (
              <div className="invalid-feedback">
                {errorEmail}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control"
                placeholder="Mínimo 6 caracteres"
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
            <div className="form-text">La contraseña debe tener al menos 6 caracteres</div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirmar Contraseña</label>
            <div className="input-group">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                className="form-control"
                placeholder="Repite tu contraseña"
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

          <button 
            type="submit" 
            className="btn-registro" 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Registrando...
              </>
            ) : (
              "Crear Cuenta"
            )}
          </button>

          <div className="registro-footer">
            <p>¿Ya tienes una cuenta?</p>
            <button 
              type="button" 
              className="btn-volver" 
              onClick={volverLogin} 
              disabled={loading}
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>

      {/* Información adicional */}
      <div className="registro-info">
        <div className="info-card">
          <h4>🎮 Aprende Jugando</h4>
          <p>Descubre la historia del Perú a través de quizzes interactivos y desafíos emocionantes.</p>
        </div>
        
        <div className="info-card">
          <h4>📊 Sigue tu Progreso</h4>
          <p>Mira tus estadísticas y mejora tus conocimientos con cada nivel que superes.</p>
        </div>
        
        <div className="info-card">
          <h4>🏆 Gana Logros</h4>
          <p>Desbloquea insignias y reconoce tus logros en tu viaje histórico.</p>
        </div>
      </div>
    </div>
  );
}

export default RegistroUsuario;