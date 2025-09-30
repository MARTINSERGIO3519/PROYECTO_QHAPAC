import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <header className="header">
        <img src="/MEDIA/IMAGES/LOGO/logo.png" alt="Logo" className="principal_logo" />

        <nav className="navbar">
          {/* Usamos Link para no recargar la página */}
          <Link to="/inicio">Home</Link>
          <Link to="/tutorial">Tutorial</Link>
          <Link to="/puntuaciones">Record</Link>
          <Link to="/login">Perfil</Link>
          <button className="search">🔍</button>
        </nav>

        <div className="perfil">
          <button onClick={() => setOpen(!open)} className="avatar">
            <img src="https://i.pravatar.cc/40" alt="Perfil" />
            <span>▼</span>
          </button>
          <div className={`dropdown ${open ? '' : 'hidden'}`}>
            <Link to="/login">Ver perfil</Link>
            <button className="cerrar-cuenta">Cerrar sesión</button>
          </div>
        </div>
      </header>

      {/* Rutas solo se definen en App.js, no dentro del Navbar */}
    </>
  );
}
