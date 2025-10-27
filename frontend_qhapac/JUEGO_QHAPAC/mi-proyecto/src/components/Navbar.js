import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ usuario, cerrarSesion }) {
  const [open, setOpen] = useState(false);
  const [usuarioLocal, setUsuarioLocal] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      try {
        setUsuarioLocal(JSON.parse(usuarioGuardado));
      } catch (error) {
        console.error('Error parsing usuario:', error);
        localStorage.removeItem("usuario");
      }
    }
  }, [usuario]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          avatarRef.current && !avatarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    cerrarSesion();
    setOpen(false);
    navigate("/login");
  };

  const handleAvatarClick = () => {
    setOpen(!open);
  };

  const handlePerfilClick = () => {
    setOpen(false);
    navigate("/perfil");
  };

  // Usar el prop usuario si existe, sino el local
  const usuarioActual = usuario || usuarioLocal;

  return (
    <>
      <header className="header">
        <Link to="/inicio" className="efecto-magico">
          <img src="/MEDIA/IMAGES/LOGO/logo.png" alt="Logo Qhapac" className="principal_logo" />
        </Link>

        <nav className="navbar">
          {usuarioActual ? (
            <>
              <Link to="/inicio" className="efecto-magico">🏠 Home</Link>
              <Link to="/tutorial" className="efecto-magico">📚 Tutorial</Link>
              <Link to="/puntuaciones" className="efecto-magico">🏆 Record</Link>
              <Link to="/perfil" className="efecto-magico">👤 Perfil</Link>
              {usuarioActual.idRol === 1 && (
                <Link to="/dashboard-admin" className="efecto-magico">⚙️ Dashboard</Link>
              )}
            </>
          ) : (
            <Link to="/login" className="efecto-magico">🚀 Iniciar Sesión</Link>
          )}
          <button className="search" title="Buscar">🔍</button>
        </nav>

        {usuarioActual ? (
          <div className="perfil">
            <button 
              ref={avatarRef}
              onClick={handleAvatarClick} 
              className="avatar efecto-magico"
            >
              <span className="mensaje-bienvenida">
                ¡Bienvenido, {usuarioActual.nombre}! 🚀
              </span>
              <span className="chevron">▼</span>
            </button>

            <div 
              ref={dropdownRef}
              className={`dropdown ${open ? '' : 'hidden'}`}
            >
              <p className="correo-usuario">{usuarioActual.email}</p>
              
              <button className="dropdown-item perfil-btn" onClick={handlePerfilClick}>
                Mi Perfil
              </button>
              <button className="dropdown-item cerrar-cuenta" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : (
          <div className="perfil">
            <Link to="/login" className="avatar efecto-magico" style={{textDecoration: 'none'}}>
              <span className="mensaje-bienvenida">🎮 ¡Juguemos!</span>
            </Link>
          </div>
        )}
      </header>

      {/* Overlay para cerrar el dropdown al hacer click fuera */}
      {open && (
        <div 
          className="dropdown-overlay active" 
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}