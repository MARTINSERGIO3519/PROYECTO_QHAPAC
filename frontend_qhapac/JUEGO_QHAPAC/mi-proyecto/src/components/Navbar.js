import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const correoGuardado = localStorage.getItem("usuario");
    if (correoGuardado) {
      setUsuario(correoGuardado);
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/login");
  };

  return (
    <header className="header">
      <img src="/MEDIA/IMAGES/LOGO/logo.png" alt="Logo" className="principal_logo" />

      <nav className="navbar">
        <Link to="/inicio">Home</Link>
        <Link to="/tutorial">Tutorial</Link>
        <Link to="/puntuaciones">Record</Link>
        <Link to="/login">Perfil</Link>
         <Link to="/dashboard-admin">Dashboard Admin</Link>
        <button className="search">🔍</button>
      </nav>

      <div className="perfil">
        <button onClick={() => setOpen(!open)} className="avatar">
          <img src="https://i.pravatar.cc/40" alt="Perfil" />
          <span>▼</span>
        </button>

        {/* Dropdown limpio */}
        <div className={`dropdown ${open ? '' : 'hidden'}`}>
          {usuario && <p className="correo-usuario">{usuario}</p>}
          <button className="cerrar-cuenta" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}


