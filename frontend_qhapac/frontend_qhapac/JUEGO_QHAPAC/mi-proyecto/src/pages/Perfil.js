import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfil.css';

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [cambiandoPassword, setCambiandoPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  
  // Estados para el formulario de edición
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: ''
  });
  
  // Estados para cambiar contraseña
  const [passwordData, setPasswordData] = useState({
    contraseniaActual: '',
    nuevaContrasenia: '',
    confirmarContrasenia: ''
  });

  const [mostrarActual, setMostrarActual] = useState(false);
  const [mostrarNueva, setMostrarNueva] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const navigate = useNavigate();

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuarioData = JSON.parse(usuarioGuardado);
      setUsuario(usuarioData);
      setFormData({
        nombre: usuarioData.nombre || '',
        apellido: usuarioData.apellido || '',
        correo: usuarioData.email || ''
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const actualizarPerfil = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');

    const idUsuario = usuario.id;
    
    if (!idUsuario) {
      setMensaje('❌ No se pudo obtener el ID del usuario');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8090/api/usuarios/actualizar-perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUsuario: idUsuario,
          nombre: formData.nombre,
          apellido: formData.apellido
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("✅ Perfil actualizado exitosamente");
        
        // Actualizar localStorage
        const usuarioActualizado = {
          ...usuario,
          nombre: formData.nombre,
          apellido: formData.apellido
        };
        localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
        setUsuario(usuarioActualizado);
        
        setEditando(false);
      } else {
        setMensaje("❌ " + (data.mensaje || "Error al actualizar el perfil"));
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const cambiarContrasenia = async (e) => {
    e.preventDefault();
    
    if (passwordData.nuevaContrasenia !== passwordData.confirmarContrasenia) {
      setMensaje('❌ Las contraseñas no coinciden');
      return;
    }

    if (passwordData.nuevaContrasenia.length < 6) {
      setMensaje('❌ La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const idUsuario = usuario.id;
    
    if (!idUsuario) {
      setMensaje('❌ No se pudo obtener el ID del usuario');
      return;
    }

    setLoading(true);
    setMensaje('');

    try {
      const response = await fetch("http://localhost:8090/api/usuarios/cambiar-contrasenia", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUsuario: idUsuario,
          contraseniaActual: passwordData.contraseniaActual,
          nuevaContrasenia: passwordData.nuevaContrasenia
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("✅ Contraseña actualizada exitosamente");
        setCambiandoPassword(false);
        setPasswordData({
          contraseniaActual: '',
          nuevaContrasenia: '',
          confirmarContrasenia: ''
        });
      } else {
        setMensaje("❌ " + (data.mensaje || "Error al cambiar la contraseña"));
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  if (!usuario) {
    return (
      <div className="perfil-container">
        <div className="container mt-4">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2 text-white">Cargando perfil...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card perfil-card">
              <div className="card-header perfil-card-header text-white text-center">
                <h3 className="card-title mb-0">
                  <i className="bi bi-person-circle me-2"></i>
                  Mi Perfil
                </h3>
                <p className="mb-0 opacity-75">Gestiona tu información personal y seguridad</p>
              </div>
              
              <div className="card-body p-4">
                {mensaje && (
                  <div className={`alert ${mensaje.includes('✅') ? 'alert-success' : 'alert-danger'} mb-4`}>
                    {mensaje}
                  </div>
                )}

                {/* Información del Usuario */}
                <div className="row mb-4 align-items-center">
                  <div className="col-md-4 text-center mb-4 mb-md-0">
                    <img 
                      src={`https://i.pravatar.cc/150?u=${usuario.email}`}
                      alt="Avatar" 
                      className="rounded-circle perfil-avatar"
                    />
                    <h5 className="mt-3 mb-1">{usuario.nombre} {usuario.apellido}</h5>
                    <span className="badge perfil-badge bg-primary">
                      {usuario.idRol === 1 ? '👑 Administrador' : '👤 Usuario'}
                    </span>
                  </div>
                  
                  <div className="col-md-8">
                    {!editando ? (
                      <>
                        <h5 className="section-title">Información Personal</h5>
                        <div className="info-row">
                          <div className="row">
                            <div className="col-sm-4">
                              <strong className="text-muted">Nombre:</strong>
                            </div>
                            <div className="col-sm-8">
                              <span className="fs-6">{usuario.nombre}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="info-row">
                          <div className="row">
                            <div className="col-sm-4">
                              <strong className="text-muted">Apellido:</strong>
                            </div>
                            <div className="col-sm-8">
                              <span className="fs-6">{usuario.apellido}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="info-row">
                          <div className="row">
                            <div className="col-sm-4">
                              <strong className="text-muted">Email:</strong>
                            </div>
                            <div className="col-sm-8">
                              <span className="fs-6">{usuario.email}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center text-md-start mt-4">
                          <button 
                            className="btn btn-perfil btn-edit btn-pulse"
                            onClick={() => setEditando(true)}
                          >
                            <i className="bi bi-pencil-square me-2"></i>
                            Editar Perfil
                          </button>
                        </div>
                      </>
                    ) : (
                      <form onSubmit={actualizarPerfil}>
                        <h5 className="section-title">Editar Información</h5>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Nombre</label>
                          <input
                            type="text"
                            className="form-control"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            required
                            placeholder="Ingresa tu nombre"
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Apellido</label>
                          <input
                            type="text"
                            className="form-control"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleInputChange}
                            required
                            placeholder="Ingresa tu apellido"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="form-label fw-semibold">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={formData.correo}
                            disabled
                          />
                          <small className="text-muted">El email no se puede cambiar por seguridad</small>
                        </div>
                        
                        <div className="form-actions">
                          <button 
                            type="submit" 
                            className="btn btn-success"
                            disabled={loading}
                          >
                            {loading ? (
                              <span className="btn-loading"></span>
                            ) : (
                              <>
                                <i className="bi bi-check-circle-fill me-2"></i>
                                Guardar Cambios
                              </>
                            )}
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={() => setEditando(false)}
                            disabled={loading}
                          >
                            <i className="bi bi-x-circle-fill me-2"></i>
                            Cancelar Edición
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>

                <hr className="my-4" />

                {/* Cambiar Contraseña */}
                <div className="mb-4">
                  <h5 className="section-title">
                    <i className="bi bi-shield-lock me-2"></i>
                    Seguridad
                  </h5>
                  
                  {!cambiandoPassword ? (
                    <div className="text-center text-md-start">
                      <button 
                        className="btn btn-perfil btn-security"
                        onClick={() => setCambiandoPassword(true)}
                      >
                        <i className="bi bi-key-fill me-2"></i>
                        Cambiar Contraseña
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={cambiarContrasenia}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-semibold">Contraseña Actual</label>
                            <div className="input-group">
                              <input
                                type={mostrarActual ? "text" : "password"}
                                className="form-control"
                                name="contraseniaActual"
                                value={passwordData.contraseniaActual}
                                onChange={handlePasswordChange}
                                required
                                placeholder="Ingresa tu contraseña actual"
                              />
                              <button
                                type="button"
                                className="btn password-toggle"
                                onClick={() => setMostrarActual(!mostrarActual)}
                              >
                                <i className={`bi ${mostrarActual ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-semibold">Nueva Contraseña</label>
                            <div className="input-group">
                              <input
                                type={mostrarNueva ? "text" : "password"}
                                className="form-control"
                                name="nuevaContrasenia"
                                value={passwordData.nuevaContrasenia}
                                onChange={handlePasswordChange}
                                minLength="6"
                                required
                                placeholder="Mínimo 6 caracteres"
                              />
                              <button
                                type="button"
                                className="btn password-toggle"
                                onClick={() => setMostrarNueva(!mostrarNueva)}
                              >
                                <i className={`bi ${mostrarNueva ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-semibold">Confirmar Contraseña</label>
                            <div className="input-group">
                              <input
                                type={mostrarConfirmar ? "text" : "password"}
                                className="form-control"
                                name="confirmarContrasenia"
                                value={passwordData.confirmarContrasenia}
                                onChange={handlePasswordChange}
                                minLength="6"
                                required
                                placeholder="Repite la nueva contraseña"
                              />
                              <button
                                type="button"
                                className="btn password-toggle"
                                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                              >
                                <i className={`bi ${mostrarConfirmar ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="password-actions">
                        <button 
                          type="submit" 
                          className="btn btn-success"
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="btn-loading"></span>
                          ) : (
                            <>
                              <i className="bi bi-shield-check me-2"></i>
                              Cambiar Contraseña
                            </>
                          )}
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-secondary"
                          onClick={() => {
                            setCambiandoPassword(false);
                            setPasswordData({
                              contraseniaActual: '',
                              nuevaContrasenia: '',
                              confirmarContrasenia: ''
                            });
                          }}
                          disabled={loading}
                        >
                          <i className="bi bi-arrow-left-circle me-2"></i>
                          Cancelar Cambio
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Estadísticas */}
                <hr className="my-4" />
                <div>
                  <h5 className="section-title">
                    <i className="bi bi-graph-up me-2"></i>
                    Estadísticas
                  </h5>
                  <div className="row text-center g-3">
                    <div className="col-md-4">
                      <div className="card stats-card">
                        <div className="card-body">
                          <i className="bi bi-trophy text-primary fs-1 mb-2"></i>
                          <h6 className="card-title text-muted">Experiencia Total</h6>
                          <div className="stats-number text-primary">{usuario.experiencia_Total || 0}</div>
                          <small className="text-muted">XP</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card stats-card">
                        <div className="card-body">
                          <i className="bi bi-graph-up-arrow text-success fs-1 mb-2"></i>
                          <h6 className="card-title text-muted">Experiencia Semanal</h6>
                          <div className="stats-number text-success">{usuario.experiencia_Semanal || 0}</div>
                          <small className="text-muted">XP</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card stats-card">
                        <div className="card-body">
                          <i className="bi bi-clock text-warning fs-1 mb-2"></i>
                          <h6 className="card-title text-muted">Horas Semanales</h6>
                          <div className="stats-number text-warning">{usuario.horas_Semanales || 0}</div>
                          <small className="text-muted">Horas</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;