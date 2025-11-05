import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPrincipal from '../components/LoginPrincipal';
import Registro from '../components/Registro';
import RecuperarContraseña from '../components/RecuperarContraseña';
import './Login.css';

function Login({ onLogin }) {
  const [pantalla, setPantalla] = useState('login');
  const navigate = useNavigate();

  const mostrarRegistro = () => setPantalla('registro');
  const mostrarRecuperar = () => setPantalla('recuperar');
  const volverLogin = () => setPantalla('login');

  const manejarLoginExitoso = () => {
    if (onLogin) onLogin();
    navigate("/inicio"); // 🚀 redirigir tras login
  };

  return (
    <div className="login-page">
      {pantalla === 'login' && (
        <LoginPrincipal 
          onLogin={manejarLoginExitoso} 
          mostrarRegistro={mostrarRegistro} 
          mostrarRecuperar={mostrarRecuperar} 
        />
      )}
      {pantalla === 'registro' && (
        <Registro volverLogin={volverLogin} />
      )}
      {pantalla === 'recuperar' && (
        <RecuperarContraseña volverLogin={volverLogin} />
      )}
    </div>
  );
}

export default Login;


