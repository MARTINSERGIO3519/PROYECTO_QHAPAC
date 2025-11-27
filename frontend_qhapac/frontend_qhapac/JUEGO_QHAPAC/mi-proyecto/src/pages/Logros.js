import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Logros.css";

function Logros() {
  const [logros, setLogros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Función para obtener el token JWT
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Función para obtener los logros
  const fetchLogros = async () => {
    const token = getAuthToken();
    
    if (!token) {
      setError('❌ No hay token de autenticación. Por favor, inicia sesión nuevamente.');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      console.log("🔄 Obteniendo logros...");
      console.log("🔐 Token:", token ? "✅ Presente" : "❌ Ausente");
      
      const response = await axios.get("http://localhost:8090/logros", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("✅ Logros obtenidos:", response.data);
      setLogros(response.data);
      setError('');
    } catch (err) {
      console.error("❌ Error obteniendo logros:", err);
      
      if (err.response) {
        // El servidor respondió con un código de error
        if (err.response.status === 403) {
          setError('❌ Acceso denegado. Tu sesión puede haber expirado. Por favor, inicia sesión nuevamente.');
        } else if (err.response.status === 401) {
          setError('❌ No autorizado. Tu token de autenticación es inválido.');
          navigate('/login');
        } else if (err.response.status === 404) {
          setError('ℹ️ El endpoint de logros no está disponible temporalmente.');
          // Si el endpoint no existe, mostrar datos de ejemplo
          setLogros(getLogrosEjemplo());
        } else {
          setError(`❌ Error del servidor: ${err.response.status}`);
        }
      } else if (err.request) {
        // La petición fue hecha pero no se recibió respuesta
        setError('❌ No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.');
      } else {
        // Algo pasó en la configuración de la petición
        setError(`❌ Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Datos de ejemplo en caso de que el endpoint no exista
  const getLogrosEjemplo = () => {
    return [
      {
        id: 1,
        nombreUsuario: "Tú",
        nombreLogro: "🏆 Primer Quiz",
        descripcion: "Completaste tu primer quiz exitosamente",
        fechaObtenida: "2024-01-15"
      },
      {
        id: 2,
        nombreUsuario: "Tú", 
        nombreLogro: "⭐ Nivel 5 Alcanzado",
        descripcion: "Llegaste al nivel 5 en el periodo 1",
        fechaObtenida: "2024-01-20"
      },
      {
        id: 3,
        nombreUsuario: "Tú",
        nombreLogro: "📚 Estudiante Dedicado",
        descripcion: "Completaste 10 quizzes en una semana",
        fechaObtenida: "2024-01-25"
      },
      {
        id: 4,
        nombreUsuario: "Tú",
        nombreLogro: "🎯 Precisión 90%",
        descripcion: "Alcanzaste 90% de precisión en tus respuestas",
        fechaObtenida: "2024-02-01"
      }
    ];
  };

  useEffect(() => {
    fetchLogros();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando tus logros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white text-center py-3">
          <h2 className="mb-0">
            <i className="bi bi-trophy-fill me-2"></i>
            Mis Logros y Reconocimientos
          </h2>
          <p className="mb-0 mt-2 opacity-75">
            Tu progreso y conquistas en Qhapac
          </p>
        </div>
        
        <div className="card-body p-4">
          {error && (
            <div className="alert alert-warning mb-4">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
              <div className="mt-2 small">
                <strong>Debug Info:</strong><br />
                • Token: {getAuthToken() ? '✅ Presente' : '❌ Ausente'}<br />
                • Endpoint: /logros<br />
                • Método: GET
              </div>
            </div>
          )}

          {logros.length === 0 && !error ? (
            <div className="text-center py-5">
              <i className="bi bi-emoji-frown display-1 text-muted"></i>
              <h4 className="mt-3 text-muted">Aún no tienes logros</h4>
              <p className="text-muted">
                Comienza a jugar y completa quizzes para desbloquear logros.
              </p>
              <button 
                className="btn btn-primary mt-3"
                onClick={() => navigate('/inicio')}
              >
                <i className="bi bi-play-fill me-2"></i>
                Comenzar a Jugar
              </button>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover table-striped align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th width="5%">#</th>
                      <th width="20%">Logro</th>
                      <th width="15%">Emblema</th>
                      <th width="45%">Descripción</th>
                      <th width="15%">Fecha Obtenido</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logros.map((item, index) => (
                      <tr key={item.id || index} className="achievement-row">
                        <td className="fw-bold text-center">{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="achievement-icon me-2">{item.nombreLogro?.charAt(0) || '🏆'}</span>
                            {item.nombreUsuario || 'Tú'}
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-success fs-6">
                            {item.nombreLogro || 'Logro Desconocido'}
                          </span>
                        </td>
                        <td>{item.descripcion || 'Descripción no disponible'}</td>
                        <td>
                          <span className="text-muted small">
                            {item.fechaObtenida || 'No especificada'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="row mt-4 text-center">
                <div className="col-md-4">
                  <div className="card bg-light border-0">
                    <div className="card-body">
                      <h3 className="text-primary">{logros.length}</h3>
                      <p className="text-muted mb-0">Logros Obtenidos</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-light border-0">
                    <div className="card-body">
                      <h3 className="text-success">
                        {Math.round((logros.length / 10) * 100)}%
                      </h3>
                      <p className="text-muted mb-0">Progreso Total</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-light border-0">
                    <div className="card-body">
                      <h3 className="text-warning">
                        {logros.filter(l => l.fechaObtenida && l.fechaObtenida.includes('2024')).length}
                      </h3>
                      <p className="text-muted mb-0">Este Año</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="text-center mt-4">
            <button 
              className="btn btn-outline-primary me-2"
              onClick={fetchLogros}
              disabled={loading}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Actualizar
            </button>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => navigate('/inicio')}
            >
              <i className="bi bi-house me-2"></i>
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logros;