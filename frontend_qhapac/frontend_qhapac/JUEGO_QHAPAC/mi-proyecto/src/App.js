import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Puntuaciones from './pages/Puntuaciones';
import Tutorial from './pages/Tutorial';
import Login from './pages/Login';
import RecuperarContraseña from './components/RecuperarContraseña';
import CambiarContraseña from './pages/CambiarContraseña';
import DashboardAdmin from './pages/DashboardAdmin';
import Logros from './pages/Logros';
import Perfil from './pages/Perfil';
import DashboardGeneral from './pages/DashboardGeneral';
import DashboardContenido from './pages/DashboardContenido';
import DashboardEstadisticas from './pages/DashboardEstadisticas';
import DashboardAcciones from './pages/DashboardAcciones';
import DashboardSugerencias from './pages/DashboardSugerencias';

// Componente para proteger rutas
const RutaProtegida = ({ children }) => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  return usuario ? children : <Navigate to="/login" />;
};

// Componente para rutas de admin
const RutaAdmin = ({ children }) => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  return usuario && usuario.idRol === 1 ? children : <Navigate to="/inicio" />;
};

// Componente wrapper para manejar layout con/sin navbar
function Layout({ children, mostrarNavbar = true, usuario, cerrarSesion }) {
  return (
    <>
      {mostrarNavbar && <Navbar usuario={usuario} cerrarSesion={cerrarSesion} />}
      <main style={{ minHeight: 'calc(100vh - 200px)' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}

function AppContent() {
  const [usuario, setUsuario] = useState(null);
  const location = useLocation();

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      try {
        setUsuario(JSON.parse(usuarioGuardado));
      } catch (error) {
        console.error('Error parsing usuario:', error);
        localStorage.removeItem("usuario");
      }
    }
  }, []);

  const manejarLogin = (usuarioData) => {
    setUsuario(usuarioData);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  // SOLUCIÓN ALTERNATIVA: Verificar si la ruta contiene alguna de estas palabras
  const mostrarNavbar = !location.pathname.includes('login') && 
                       !location.pathname.includes('recuperar') && 
                       !location.pathname.includes('cambiar');

  return (
    <Layout 
      mostrarNavbar={mostrarNavbar} 
      usuario={usuario} 
      cerrarSesion={cerrarSesion}
    >
      <Routes>
        {/* Redirigir a inicio si está logueado, sino a login */}
        <Route path="/" element={
          usuario ? <Navigate to="/inicio" /> : <Navigate to="/login" />
        } />

        {/* Login - accesible solo si no está logueado */}
        <Route path="/login" element={
          usuario ? <Navigate to="/inicio" /> : <Login onLogin={manejarLogin} />
        } />

        {/* Recuperar contraseña - ACCESIBLE SIN LOGIN */}
        <Route path="/recuperar-contraseña" element={
          usuario ? <Navigate to="/inicio" /> : <RecuperarContraseña />
        } />

        {/* Cambiar contraseña - ACCESIBLE SIN LOGIN (porque el usuario puede no estar logueado) */}
        <Route path="/cambiar-contraseña" element={
          usuario ? <Navigate to="/inicio" /> : <CambiarContraseña />
        } />

        {/* Rutas protegidas */}
        <Route path="/inicio" element={
          <RutaProtegida>
            <Inicio />
          </RutaProtegida>
        } />
        
        <Route path="/tutorial" element={
          <RutaProtegida>
            <Tutorial />
          </RutaProtegida>
        } />
        
        <Route path="/puntuaciones" element={
          <RutaProtegida>
            <Puntuaciones />
          </RutaProtegida>
        } />

        <Route path="/logros" element={
          <RutaProtegida>
            <Logros />
          </RutaProtegida>
        } />
        
        {/* Dashboard Admin - solo para administradores */}
        <Route path="/dashboard-admin" element={
          <RutaAdmin>
            <DashboardAdmin />
          </RutaAdmin>
        } />

         {/* Dashboard General - solo para administradores */}
        <Route path="/dashboard-general" element={
          <RutaAdmin><DashboardGeneral /></RutaAdmin>
        } />

        {/* NUEVAS RUTAS ADMIN */}
        <Route path="/dashboard-contenido" element={<RutaAdmin><DashboardContenido /></RutaAdmin>} />
        <Route path="/dashboard-estadisticas" element={<RutaAdmin><DashboardEstadisticas/></RutaAdmin>} />
        <Route path="/dashboard-acciones" element={<RutaAdmin><DashboardAcciones /></RutaAdmin>} />
        <Route path="/dashboard-sugerencias" element={<RutaAdmin><DashboardSugerencias /></RutaAdmin>} />

        {/* Ruta perfil*/}
        <Route path="/perfil" element={
          <RutaProtegida>
            <Perfil />
          </RutaProtegida>
        } />

        {/* Ruta de fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

// Componente principal que envuelve App con Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;