// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
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
import './App.css';

// Componente para proteger rutas
const RutaProtegida = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3">Verificando autenticación...</span>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Componente para rutas de admin
const RutaAdmin = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3">Verificando permisos...</span>
      </div>
    );
  }
  
  return isAuthenticated && user && user.idRol === 1 ? children : <Navigate to="/inicio" replace />;
};

// Componente wrapper para manejar layout con/sin navbar
function Layout({ children, mostrarNavbar = true }) {
  const { user, logout } = useAuth();
  
  return (
    <>
      {mostrarNavbar && <Navbar usuario={user} cerrarSesion={logout} />}
      <main style={{ minHeight: 'calc(100vh - 200px)' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}

function AppContent() {
  const { login, user, loading, shouldRedirect, clearRedirect } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Efecto para manejar redirección después del logout
  useEffect(() => {
    if (shouldRedirect) {
      console.log("🔄 Redirigiendo a login después del logout...");
      console.log("📊 Estado actual - user:", user, "shouldRedirect:", shouldRedirect);
      clearRedirect();
      navigate('/login', { replace: true });
    }
  }, [shouldRedirect, navigate, clearRedirect]);

  // Determinar si mostrar navbar
  const mostrarNavbar = !location.pathname.includes('login') && 
                       !location.pathname.includes('recuperar') && 
                       !location.pathname.includes('cambiar');

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3">Cargando aplicación...</span>
      </div>
    );
  }

  return (
    <Layout mostrarNavbar={mostrarNavbar}>
      <Routes>
        {/* Redirigir a inicio si está logueado, sino a login */}
        <Route path="/" element={
          user ? <Navigate to="/inicio" replace /> : <Navigate to="/login" replace />
        } />

        {/* Login - accesible solo si no está logueado */}
        <Route path="/login" element={
          user ? <Navigate to="/inicio" replace /> : <Login onLogin={login} />
        } />

        {/* Recuperar contraseña - ACCESIBLE SIN LOGIN */}
        <Route path="/recuperar-contraseña" element={
          user ? <Navigate to="/inicio" replace /> : <RecuperarContraseña />
        } />

        {/* Cambiar contraseña - ACCESIBLE SIN LOGIN */}
        <Route path="/cambiar-contraseña" element={
          user ? <Navigate to="/inicio" replace /> : <CambiarContraseña />
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
        <Route path="*" element={<Navigate to="/" replace />} />
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