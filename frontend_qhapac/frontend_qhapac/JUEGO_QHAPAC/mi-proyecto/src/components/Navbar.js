import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ usuario, cerrarSesion }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [usuarioLocal, setUsuarioLocal] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const hamburgerRef = useRef(null);

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

  // Cerrar menús al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) &&
          profileRef.current && !profileRef.current.contains(event.target) &&
          hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    cerrarSesion();
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const usuarioActual = usuario || usuarioLocal;
  const isAdmin = usuarioActual?.idRol === 1;

  // Definir enlaces basados en el rol
  const navLinks = [
    { path: "/inicio", label: "Inicio", icon: "🏠", show: true },
    { path: "/tutorial", label: "Tutorial", icon: "📚", show: true },
    { path: "/puntuaciones", label: "Records", icon: "🏆", show: true },
    { path: "/logros", label: "Logros", icon: "🎖️", show: true },
    { path: "/perfil", label: "Perfil", icon: "👤", show: true },
    ...(isAdmin ? [
      { path: "/dashboard-admin", label: "Dashboard", icon: "⚙️", show: true, admin: true },
      { path: "/dashboard-general", label: "Estadísticas", icon: "📊", show: true, admin: true }
    ] : [])
  ];

  // Dividir enlaces para el menú móvil de dos columnas
  const allLinks = navLinks.filter(link => link.show);
  const midPoint = Math.ceil(allLinks.length / 2);
  const leftColumn = allLinks.slice(0, midPoint);
  const rightColumn = allLinks.slice(midPoint);

  return (
    <>
      <header className="navbar-header">
        {/* Logo y Brand */}
        <div className="navbar-brand">
          <Link to="/inicio" className="logo-container">
            <img 
              src="/MEDIA/IMAGES/LOGO/logo.png" 
              alt="Logo Qhapac" 
              className="navbar-logo" 
            />
            <div className="logo-text">
              <span className="logo-title">Qhapac</span>
              {isAdmin && (
                <span className="admin-badge">Administrador</span>
              )}
            </div>
          </Link>
          
          {/* Mensaje de bienvenida para admin */}
          {isAdmin && (
            <div className="welcome-container">
              <div className="welcome-message">
                <span className="welcome-text">¡Bienvenido!</span>
                <span className="user-name">{usuarioActual?.nombre}</span>
              </div>
            </div>
          )}
        </div>

        {/* Navegación Desktop */}
        <nav className="navbar-desktop">
          <div className="nav-links">
            {allLinks.filter(link => !link.admin).map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-label">{link.label}</span>
              </Link>
            ))}
          </div>
          
          {isAdmin && (
            <div className="admin-links">
              <div className="admin-separator"></div>
              {allLinks.filter(link => link.admin).map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link admin-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  <span className="nav-icon">{link.icon}</span>
                  <span className="nav-label">{link.label}</span>
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* Controles de usuario */}
        <div className="navbar-controls">
          {usuarioActual ? (
            <>
              {/* Perfil Desktop */}
              <div className="profile-container" ref={profileRef}>
                <button 
                  className={`profile-button ${isProfileOpen ? 'active' : ''}`}
                  onClick={toggleProfile}
                >
                  <div className="user-info-mini">
                    <span className="user-name-mini">{usuarioActual.nombre}</span>
                    <span className="user-status">{isAdmin ? 'Admin' : 'Usuario'}</span>
                  </div>
                  <span className={`dropdown-arrow ${isProfileOpen ? 'open' : ''}`}>▼</span>
                </button>

                {/* Dropdown de perfil - REDISEÑADO */}
                <div className={`profile-dropdown ${isProfileOpen ? 'open' : ''}`}>
                  {/* Tarjeta de información del usuario - ESTILO COHERENTE CON MÓVIL */}
                  <div className="dropdown-user-card">
                    <div className="dropdown-user-avatar">👤</div>
                    <div className="dropdown-user-info">
                      <h4 className="dropdown-user-name">{usuarioActual.nombre}</h4>
                      <p className="dropdown-user-email">{usuarioActual.email}</p>
                      <div className="dropdown-user-role">
                        {isAdmin ? 'Administrador' : 'Usuario'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Solo Cerrar Sesión - ELIMINADO "Mi Perfil" */}
                  <div className="dropdown-actions">
                    <button 
                      className="dropdown-action logout"
                      onClick={handleLogout}
                    >
                      <span className="action-icon">🚪</span>
                      <span className="action-text">Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login" className="login-button">
              <span className="login-icon">🎮</span>
              <span className="login-text">Iniciar Sesión</span>
            </Link>
          )}
        </div>
      </header>

      {/* Botón Hamburguesa Móvil */}
      {usuarioActual && (
        <button 
          ref={hamburgerRef}
          className={`hamburger-button mobile-only ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menú de navegación"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      )}

      {/* Menú Móvil */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`} 
           onClick={() => setIsMenuOpen(false)}>
        <div 
          ref={menuRef}
          className="mobile-menu-content"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header simplificado del menú móvil */}
          <div className="mobile-menu-header">
            <div className="mobile-menu-title">
              <h3>Menú de Navegación</h3>
            </div>
            <button 
              className="close-menu"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              ✕
            </button>
          </div>

          {/* Sección de información del usuario */}
          {usuarioActual && (
            <div className="mobile-user-section">
              <div className="mobile-user-info-card">
                <div className="mobile-user-avatar">👤</div>
                <div className="mobile-user-details">
                  <h4 className="mobile-user-name">{usuarioActual.nombre}</h4>
                  <p className="mobile-user-email">{usuarioActual.email}</p>
                  <div className="mobile-user-role">
                    {isAdmin ? 'Administrador' : 'Usuario'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navegación móvil en dos columnas */}
          <div className="mobile-nav-grid">
            <div className="nav-column">
              {leftColumn.map(link => (
                <button
                  key={link.path}
                  className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={() => handleNavigation(link.path)}
                >
                  <span className="mobile-nav-icon">{link.icon}</span>
                  <span className="mobile-nav-label">{link.label}</span>
                </button>
              ))}
            </div>
            
            <div className="nav-column">
              {rightColumn.map(link => (
                <button
                  key={link.path}
                  className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={() => handleNavigation(link.path)}
                >
                  <span className="mobile-nav-icon">{link.icon}</span>
                  <span className="mobile-nav-label">{link.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer del menú móvil */}
          <div className="mobile-menu-footer">
            {usuarioActual ? (
              <button className="mobile-logout" onClick={handleLogout}>
                <span className="logout-icon">🚪</span>
                Cerrar Sesión
              </button>
            ) : (
              <Link to="/login" className="mobile-login" onClick={() => setIsMenuOpen(false)}>
                <span className="login-icon">🎮</span>
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Overlay para cerrar menús */}
      {(isMenuOpen || isProfileOpen) && (
        <div 
          className="navbar-overlay"
          onClick={() => {
            setIsMenuOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}
    </>
  );
}