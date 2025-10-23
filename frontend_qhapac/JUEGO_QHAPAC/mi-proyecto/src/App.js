import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Puntuaciones from './pages/Puntuaciones';
import Tutorial from './pages/Tutorial';
import Login from './pages/Login';
import RecuperarContraseña from './components/RecuperarContraseña';
import CambiarContraseña from './pages/CambiarContraseña';
import DashboardAdmin from './pages/DashboardAdmin'; // Asegúrate de importar el DashboardAdmin

function App() {
  const [usuario, setUsuario] = useState(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const email = localStorage.getItem("usuario");
    if (email) {
      setUsuario(email);
    }
  }, []);

  const manejarLogin = () => {
    const email = localStorage.getItem("usuario");
    setUsuario(email);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  // 🔒 Rutas protegidas: solo entran si hay usuario
  const RutaPrivada = ({ children }) => {
    return usuario ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar usuario={usuario} cerrarSesion={cerrarSesion} />

      <Routes>
        {/* Redirigir a login por defecto */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login */}
        <Route path="/login" element={<Login onLogin={manejarLogin} />} />

        {/* Recuperar contraseña */}
        <Route path="/recuperar" element={<RecuperarContraseña />} />

        {/* Cambiar contraseña */}
        <Route path="/cambiar" element={<CambiarContraseña volverLogin={() => window.location.href = '/login'} />} />

        {/* Rutas no restringidas */}
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/puntuaciones" element={<Puntuaciones />} />
        
        {/* Dashboard Admin (ya no es restringido) */}
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
