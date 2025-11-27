import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { authGet, authPost, authPut } from '../utils/api';
import './DashboardAdmin.css';

function DashboardAdmin() {
  const [vistaActiva, setVistaActiva] = useState('admin');
  const [usuarios, setUsuarios] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  // Estados para los modales de confirmación
  const [modalConfirmacion, setModalConfirmacion] = useState({
    mostrar: false,
    tipo: '', // 'rol', 'desactivar', 'bloquear'
    usuario: null,
    mensaje: '',
    accion: null
  });

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasenia: '',
    idRol: 2,
    horasSemanales: 0.0
  });

  // Estados para los campos de contraseña con ojito
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [mostrarConfirmarContrasenia, setMostrarConfirmarContrasenia] = useState(false);
  const [confirmarContrasenia, setConfirmarContrasenia] = useState('');

  // Obtener el ID del usuario actual desde localStorage
  const usuarioActualId = parseInt(localStorage.getItem('userId') || '0');

  // Cargar datos cuando cambie la vista a admin
  useEffect(() => {
    if (vistaActiva === 'admin') {
      cargarUsuarios();
      cargarEstadisticas();
    }
  }, [vistaActiva]);

  const cargarUsuarios = async () => {
    setLoading(true);
    setMensaje('');
    try {
      console.log('🔍 Cargando usuarios desde API...');
      const response = await authGet("http://localhost:8090/api/admin/usuarios");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText || 'No se pudieron cargar los usuarios'}`);
      }

      const data = await response.json();
      setUsuarios(data);
      setMensaje(`✅ ${data.length} usuarios cargados exitosamente`);
    } catch (error) {
      console.error('❌ Error al cargar usuarios:', error);
      if (error.message === 'Authentication failed') {
        setMensaje("❌ Sesión expirada. Por favor, inicia sesión nuevamente.");
      } else {
        setMensaje(`❌ ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const cargarEstadisticas = async () => {
    try {
      const response = await authGet("http://localhost:8090/api/admin/estadisticas");
      
      if (response.ok) {
        const data = await response.json();
        setEstadisticas(data);
      } else {
        // Calcular desde usuarios locales
        const stats = {
          totalUsuarios: usuarios.length,
          administradores: usuarios.filter(u => u.idRol === 1).length,
          usuariosNormales: usuarios.filter(u => u.idRol === 2).length,
          usuariosActivos: usuarios.filter(u => u.id_Estado_Usuario === 1).length
        };
        setEstadisticas(stats);
      }
    } catch (error) {
      console.error('❌ Error cargando estadísticas:', error);
      if (error.message === 'Authentication failed') {
        setMensaje("❌ Sesión expirada. Por favor, inicia sesión nuevamente.");
      } else {
        const stats = {
          totalUsuarios: usuarios.length,
          administradores: usuarios.filter(u => u.idRol === 1).length,
          usuariosNormales: usuarios.filter(u => u.idRol === 2).length,
          usuariosActivos: usuarios.filter(u => u.id_Estado_Usuario === 1).length
        };
        setEstadisticas(stats);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'idRol' ? parseInt(value) : 
              name === 'horasSemanales' ? parseFloat(value) : value
    }));
  };

  // Función para manejar el cambio en el campo de confirmar contraseña
  const handleConfirmarContraseniaChange = (e) => {
    setConfirmarContrasenia(e.target.value);
  };

  // Función para resetear el formulario cuando se cancela
  const cancelarCreacion = () => {
    setMostrarFormulario(false);
    setConfirmarContrasenia('');
    setMostrarContrasenia(false);
    setMostrarConfirmarContrasenia(false);
  };

  // SOLUCIÓN NUCLEAR - Función mejorada para cerrar sesión
  const cerrarSesionForzada = () => {
    console.log('🔒 Iniciando cierre de sesión nuclear...');
    
    // 1. Limpiar TODOS los datos de localStorage
    localStorage.clear();
    
    // 2. Limpiar TODOS los datos de sessionStorage
    sessionStorage.clear();
    
    // 3. Eliminar todas las cookies
    document.cookie.split(";").forEach(function(c) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    
    // 4. Forzar recarga completa con timestamp para evitar cache
    const timestamp = new Date().getTime();
    const loginUrl = `/login?force=${timestamp}`;
    
    console.log('✅ Todos los datos de sesión eliminados');
    console.log('🔄 Redirigiendo a:', loginUrl);
    
    // 5. Usar replace para evitar que el usuario pueda volver atrás
    window.location.replace(loginUrl);
    
    // 6. Respaldo: forzar recarga después de un breve tiempo
    setTimeout(() => {
      window.location.href = loginUrl;
    }, 100);
    
    // 7. Último respaldo: recarga forzada
    setTimeout(() => {
      window.location.reload(true);
    }, 200);
  };

  // Función para mostrar modal de confirmación
  const mostrarConfirmacion = (tipo, usuario, accion) => {
    let mensaje = '';
    
    switch(tipo) {
      case 'rol':
        const nuevoRol = usuario.idRol === 1 ? 2 : 1;
        const nuevoRolTexto = nuevoRol === 1 ? 'Administrador' : 'Usuario Normal';
        mensaje = `¿Estás seguro de cambiar el rol de ${usuario.nombre} ${usuario.apellido} a ${nuevoRolTexto}?`;
        break;
      case 'desactivar':
        mensaje = `¿Estás seguro de desactivar al usuario ${usuario.nombre} ${usuario.apellido}?`;
        break;
      case 'bloquear':
        mensaje = `¿Estás seguro de bloquear al usuario ${usuario.nombre} ${usuario.apellido}?`;
        break;
      default:
        mensaje = '¿Estás seguro de realizar esta acción?';
    }

    setModalConfirmacion({
      mostrar: true,
      tipo,
      usuario,
      mensaje,
      accion
    });
  };

  // Función para cerrar modal
  const cerrarModal = () => {
    setModalConfirmacion({
      mostrar: false,
      tipo: '',
      usuario: null,
      mensaje: '',
      accion: null
    });
  };

  // Función para confirmar acción
  const confirmarAccion = async () => {
    const { tipo, usuario, accion } = modalConfirmacion;
    
    try {
      setLoading(true);
      
      if (tipo === 'rol') {
        await cambiarRol(usuario.idUsuario, usuario.idRol === 1 ? 2 : 1);
      } else {
        await accion();
      }
      
      cerrarModal();
    } catch (error) {
      console.error('Error en confirmarAccion:', error);
      if (error.message === 'Authentication failed') {
        setMensaje("❌ Sesión expirada. Por favor, inicia sesión nuevamente.");
      } else {
        setMensaje('❌ Error al realizar la acción');
      }
    } finally {
      setLoading(false);
    }
  };

  const crearUsuario = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');

    // Validar que las contraseñas coincidan
    if (formData.contrasenia !== confirmarContrasenia) {
      setMensaje('❌ Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    // Validar longitud mínima de contraseña
    if (formData.contrasenia.length < 6) {
      setMensaje('❌ La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const response = await authPost("http://localhost:8090/api/admin/usuarios", formData);

      let data;
      const responseText = await response.text();
      
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        data = { mensaje: responseText || 'Error desconocido' };
      }
      
      if (response.ok) {
        setMensaje("✅ Usuario creado exitosamente");
        setMostrarFormulario(false);
        setFormData({
          nombre: '',
          apellido: '',
          correo: '',
          contrasenia: '',
          idRol: 2,
          horasSemanales: 0.0
        });
        setConfirmarContrasenia('');
        setMostrarContrasenia(false);
        setMostrarConfirmarContrasenia(false);
        cargarUsuarios();
        cargarEstadisticas();
      } else {
        const errorMsg = data.mensaje || data.error || data || "Error al crear usuario";
        setMensaje(`❌ ${errorMsg}`);
      }

    } catch (error) {
      console.error('❌ Error en crearUsuario:', error);
      if (error.message === 'Authentication failed') {
        setMensaje("❌ Sesión expirada. Por favor, inicia sesión nuevamente.");
      } else {
        setMensaje("❌ Error de conexión con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  const cambiarRol = async (idUsuario, nuevoRol) => {
    try {
      setMensaje('');
      
      const response = await authPut("http://localhost:8090/api/admin/usuarios/cambiar-rol", { 
        idUsuario: idUsuario, 
        nuevoRol: nuevoRol 
      });

      let data;
      const responseText = await response.text();
      
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        data = { mensaje: responseText };
      }

      if (response.ok) {
        setMensaje("✅ Rol actualizado exitosamente");
        setUsuarios(prev => prev.map(usuario => 
          usuario.idUsuario === idUsuario 
            ? { ...usuario, idRol: nuevoRol }
            : usuario
        ));
        cargarEstadisticas();

        // Verificar si el usuario actual cambió su propio rol de administrador a usuario normal
        if (idUsuario === usuarioActualId && nuevoRol === 2) {
          // Mostrar mensaje informativo
          setMensaje("✅ Tu rol ha sido cambiado a Usuario Normal. Cerrando sesión...");
          
          // Cerrar sesión inmediatamente
          setTimeout(() => {
            cerrarSesionForzada();
          }, 1000);
        }
      } else {
        setMensaje("❌ " + (data.mensaje || data));
      }
    } catch (error) {
      console.error(error);
      if (error.message === 'Authentication failed') {
        setMensaje("❌ Sesión expirada. Por favor, inicia sesión nuevamente.");
      } else {
        setMensaje("❌ Error de conexión");
      }
    }
  };

  const cambiarEstado = async (idUsuario, nuevoEstado) => {
    try {
      setMensaje('');
      
      const response = await authPut("http://localhost:8090/api/admin/usuarios/cambiar-estado", { 
        idUsuario: idUsuario, 
        nuevoEstado: nuevoEstado 
      });

      let data;
      const responseText = await response.text();
      
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        data = { mensaje: responseText };
      }

      if (response.ok) {
        const estadoTexto = nuevoEstado === 1 ? 'activado' : nuevoEstado === 2 ? 'desactivado' : 'bloqueado';
        setMensaje(`✅ Usuario ${estadoTexto} exitosamente`);
        setUsuarios(prev => prev.map(usuario => 
          usuario.idUsuario === idUsuario 
            ? { ...usuario, id_Estado_Usuario: nuevoEstado }
            : usuario
        ));
        cargarEstadisticas();

        // Verificar si el usuario actual se desactivó o bloqueó a sí mismo
        if (idUsuario === usuarioActualId && nuevoEstado !== 1) {
          const accionTexto = nuevoEstado === 2 ? 'desactivado' : 'bloqueado';
          setMensaje(`✅ Tu cuenta ha sido ${accionTexto}. Cerrando sesión...`);
          
          // Cerrar sesión inmediatamente
          setTimeout(() => {
            cerrarSesionForzada();
          }, 1000);
        }
      } else {
        setMensaje("❌ " + (data.mensaje || data));
      }
    } catch (error) {
      console.error(error);
      if (error.message === 'Authentication failed') {
        setMensaje("❌ Sesión expirada. Por favor, inicia sesión nuevamente.");
      } else {
        setMensaje("❌ Error de conexión");
      }
    }
  };

  // Función para descargar Excel
  const downloadExcel = () => {
    const datosParaExcel = usuarios.map(usuario => ({
      ID: usuario.idUsuario,
      Nombre: usuario.nombre,
      Apellido: usuario.apellido,
      Email: usuario.email,
      Rol: getNombreRol(usuario.idRol),
      Estado: getNombreEstado(usuario.id_Estado_Usuario),
      'Experiencia Total': usuario.experiencia_Total,
      'Fecha Registro': new Date(usuario.fecha_Registro).toLocaleDateString()
    }));

    const ws = XLSX.utils.json_to_sheet(datosParaExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
    XLSX.writeFile(wb, 'usuarios.xlsx');
  };

  const getNombreEstado = (idEstado) => {
    const estados = { 
      1: '🟢 Activo', 
      2: '⚫ Inactivo', 
      3: '🔴 Bloqueado' 
    };
    return estados[idEstado] || 'Desconocido';
  };

  const getNombreRol = (idRol) => {
    return idRol === 1 ? '👑 Administrador' : '👤 Usuario';
  };

  const getBadgeColorEstado = (idEstado) => {
    const colores = {
      1: 'bg-success',
      2: 'bg-secondary', 
      3: 'bg-danger'
    };
    return colores[idEstado] || 'bg-warning';
  };

  const getBadgeColorRol = (idRol) => {
    return idRol === 1 ? 'bg-warning' : 'bg-info';
  };

  // Redirigir si está en vista usuario
  if (vistaActiva === 'usuario') {
    navigate('/inicio');
    return null;
  }

  return (
    <div className="dashboard-admin-container">
      <div className="container-fluid">
        {/* Header del Dashboard */}
        <div className="dashboard-header">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="dashboard-title">
                <i className="bi bi-speedometer2 me-3"></i>
                Panel de Administración
              </h1>
              <p className="dashboard-subtitle">Gestiona usuarios y configuración del sistema</p>
            </div>
            <div className="col-md-6 text-end">
              <div className="vista-selector">
                <button 
                  className={`btn btn-vista ${vistaActiva === 'admin' ? 'active' : ''}`}
                  onClick={() => setVistaActiva('admin')}
                >
                  <i className="bi bi-shield-check me-2"></i>
                  Vista Admin
                </button>
                <button 
                  className={`btn btn-vista ${vistaActiva === 'usuario' ? 'active' : ''}`}
                  onClick={() => setVistaActiva('usuario')}
                >
                  <i className="bi bi-person me-2"></i>
                  Vista Usuario
                </button>
              </div>
            </div>
          </div>
        </div>

        {mensaje && (
          <div className={`alert ${mensaje.includes('✅') ? 'alert-success' : 'alert-danger'}`}>
            {mensaje}
          </div>
        )}

        {/* Estadísticas */}
        {estadisticas && (
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="stat-card primary">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>{estadisticas.totalUsuarios}</h3>
                  <p>Total Usuarios</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card success">
                <div className="stat-icon">👑</div>
                <div className="stat-info">
                  <h3>{estadisticas.administradores}</h3>
                  <p>Administradores</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card warning">
                <div className="stat-icon">👤</div>
                <div className="stat-info">
                  <h3>{estadisticas.usuariosNormales}</h3>
                  <p>Usuarios Normales</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card info">
                <div className="stat-icon">🟢</div>
                <div className="stat-info">
                  <h3>{estadisticas.usuariosActivos}</h3>
                  <p>Usuarios Activos</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Controles de administración */}
        <div className="admin-controls mb-4">
          <button 
            className="btn btn-crear-usuario"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            disabled={loading}
          >
            <i className="bi bi-person-plus me-2"></i>
            Crear Nuevo Usuario
          </button>
          <button 
            className="btn btn-actualizar"
            onClick={cargarUsuarios}
            disabled={loading}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            {loading ? 'Cargando...' : 'Actualizar Lista'}
          </button>
          <button 
            className="btn btn-descargar-excel"
            onClick={downloadExcel}
            disabled={usuarios.length === 0 || loading}
          >
            <i className="bi bi-file-earmark-excel me-2"></i>
            Descargar Excel
          </button>
        </div>

        {/* Formulario de creación de usuario */}
        {mostrarFormulario && (
          <div className="card crear-usuario-card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-person-plus me-2"></i>
                Crear Nuevo Usuario
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={crearUsuario}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Nombre *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Apellido *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Correo Electrónico *</label>
                      <input
                        type="email"
                        className="form-control"
                        name="correo"
                        value={formData.correo}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        placeholder="ejemplo@email.com"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Rol *</label>
                      <select
                        className="form-control"
                        name="idRol"
                        value={formData.idRol}
                        onChange={handleInputChange}
                        disabled={loading}
                      >
                        <option value={2}>👤 Usuario Normal</option>
                        <option value={1}>👑 Administrador</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* CAMPOS DE CONTRASEÑA CON OJITO */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Contraseña *</label>
                      <div className="input-group">
                        <input
                          type={mostrarContrasenia ? "text" : "password"}
                          className="form-control"
                          name="contrasenia"
                          value={formData.contrasenia}
                          onChange={handleInputChange}
                          required
                          minLength="6"
                          disabled={loading}
                          placeholder="Mínimo 6 caracteres"
                        />
                        <button
                          type="button"
                          className="btn password-toggle"
                          onClick={() => setMostrarContrasenia(!mostrarContrasenia)}
                          disabled={loading}
                        >
                          <i className={`bi ${mostrarContrasenia ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Confirmar Contraseña *</label>
                      <div className="input-group">
                        <input
                          type={mostrarConfirmarContrasenia ? "text" : "password"}
                          className="form-control"
                          name="confirmarContrasenia"
                          value={confirmarContrasenia}
                          onChange={handleConfirmarContraseniaChange}
                          required
                          minLength="6"
                          disabled={loading}
                          placeholder="Repite la contraseña"
                        />
                        <button
                          type="button"
                          className="btn password-toggle"
                          onClick={() => setMostrarConfirmarContrasenia(!mostrarConfirmarContrasenia)}
                          disabled={loading}
                        >
                          <i className={`bi ${mostrarConfirmarContrasenia ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Horas Semanales</label>
                      <input
                        type="number"
                        className="form-control"
                        name="horasSemanales"
                        value={formData.horasSemanales}
                        onChange={handleInputChange}
                        min="0"
                        max="40"
                        step="0.5"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-success"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Crear Usuario
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={cancelarCreacion}
                    disabled={loading}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Lista de usuarios */}
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <i className="bi bi-people me-2"></i>
              Gestión de Usuarios ({usuarios.length})
            </h5>
            <span className="text-muted small">
              {loading && <span className="spinner-border spinner-border-sm me-1"></span>}
              Última actualización: {new Date().toLocaleTimeString()}
            </span>
          </div>
          <div className="card-body">
            {loading && usuarios.length === 0 ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-2">Cargando usuarios...</p>
              </div>
            ) : usuarios.length === 0 ? (
              <div className="text-center py-4">
                <i className="bi bi-people display-1 text-muted"></i>
                <p className="mt-3">No hay usuarios registrados</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setMostrarFormulario(true)}
                >
                  <i className="bi bi-person-plus me-2"></i>
                  Crear Primer Usuario
                </button>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Rol</th>
                      <th>Estado</th>
                      <th>Experiencia</th>
                      <th>Fecha Registro</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map(usuario => (
                      <tr key={usuario.idUsuario}>
                        <td>
                          <strong>#{usuario.idUsuario}</strong>
                        </td>
                        <td>
                          <div>
                            <strong>{usuario.nombre} {usuario.apellido}</strong>
                            {usuario.idUsuario === usuarioActualId && (
                              <span className="badge bg-primary ms-2">Tú</span>
                            )}
                          </div>
                        </td>
                        <td>
                          <small className="text-muted">{usuario.email}</small>
                        </td>
                        <td>
                          <span className={`badge ${getBadgeColorRol(usuario.idRol)}`}>
                            {getNombreRol(usuario.idRol)}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${getBadgeColorEstado(usuario.id_Estado_Usuario)}`}>
                            {getNombreEstado(usuario.id_Estado_Usuario)}
                          </span>
                        </td>
                        <td>
                          <span className="fw-bold">{usuario.experiencia_Total || 0} XP</span>
                        </td>
                        <td>
                          <small>
                            {new Date(usuario.fecha_Registro).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </small>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            {/* Botón Cambiar Rol */}
                            <button
                              className={`btn ${usuario.idRol === 1 ? 'btn-outline-secondary' : 'btn-outline-warning'}`}
                              onClick={() => mostrarConfirmacion('rol', usuario, null)}
                              title={usuario.idRol === 1 ? "Hacer Usuario Normal" : "Hacer Administrador"}
                              disabled={loading}
                            >
                              <i className={`bi ${usuario.idRol === 1 ? 'bi-person' : 'bi-shield-check'}`}></i>
                              {usuario.idRol === 1 ? ' User' : ' Admin'}
                            </button>

                            {/* Botones de Estado */}
                            {usuario.id_Estado_Usuario === 1 ? (
                              <button
                                className="btn btn-outline-warning"
                                onClick={() => mostrarConfirmacion('desactivar', usuario, 
                                  () => cambiarEstado(usuario.idUsuario, 2))}
                                title="Desactivar Usuario"
                                disabled={loading}
                              >
                                <i className="bi bi-pause-circle"></i>
                              </button>
                            ) : (
                              <button
                                className="btn btn-outline-success"
                                onClick={() => cambiarEstado(usuario.idUsuario, 1)}
                                title="Activar Usuario"
                                disabled={loading}
                              >
                                <i className="bi bi-play-circle"></i>
                              </button>
                            )}

                            {/* Botón Bloquear */}
                            {usuario.id_Estado_Usuario !== 3 && (
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => mostrarConfirmacion('bloquear', usuario, 
                                  () => cambiarEstado(usuario.idUsuario, 3))}
                                title="Bloquear Usuario"
                                disabled={loading}
                              >
                                <i className="bi bi-lock"></i>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Modal de Confirmación */}
        {modalConfirmacion.mostrar && (
          <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="bi bi-exclamation-triangle text-warning me-2"></i>
                    Confirmar acción
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={cerrarModal}
                    disabled={loading}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>{modalConfirmacion.mensaje}</p>
                  {modalConfirmacion.tipo === 'rol' && 
                   modalConfirmacion.usuario?.idUsuario === usuarioActualId && (
                    <div className="alert alert-warning mt-3">
                      <i className="bi bi-info-circle me-2"></i>
                      <strong>¡Atención!</strong> Estás a punto de cambiar tu propio rol. 
                      Si cambias a "Usuario Normal", perderás acceso al panel de administración 
                      y la sesión se cerrará automáticamente.
                    </div>
                  )}
                  {(modalConfirmacion.tipo === 'desactivar' || modalConfirmacion.tipo === 'bloquear') && 
                   modalConfirmacion.usuario?.idUsuario === usuarioActualId && (
                    <div className="alert alert-danger mt-3">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      <strong>¡Atención!</strong> Estás a punto de {modalConfirmacion.tipo} tu propia cuenta. 
                      La sesión se cerrará automáticamente y no podrás acceder nuevamente hasta que un administrador reactive tu cuenta.
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={cerrarModal}
                    disabled={loading}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Cancelar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={confirmarAccion}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Confirmar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardAdmin;