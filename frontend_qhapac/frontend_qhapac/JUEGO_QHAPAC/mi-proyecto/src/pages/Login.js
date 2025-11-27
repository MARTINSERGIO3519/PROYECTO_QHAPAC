// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPrincipal from '../components/LoginPrincipal';
import Registro from '../components/Registro';
import RecuperarContraseña from '../components/RecuperarContraseña';
import CambiarContraseña from './CambiarContraseña';
import './Login.css';

function Login({ onLogin }) {
  const [pantalla, setPantalla] = useState('login');
  const [emailRecuperacion, setEmailRecuperacion] = useState('');
  const navigate = useNavigate();

  const mostrarRegistro = () => setPantalla('registro');
  const mostrarRecuperar = () => setPantalla('recuperar');
  const mostrarCambiarContrasenia = (email = '') => {
    setEmailRecuperacion(email);
    setPantalla('cambiar-contrasenia');
  };
  const volverLogin = () => setPantalla('login');

  const manejarLoginExitoso = (userData, token) => {
    console.log("✅ Login exitoso en Login.js - UserData:", userData, "Token:", token);
    
    if (onLogin) {
      onLogin(userData, token);
    }
    navigate("/inicio");
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
        <RecuperarContraseña 
          volverLogin={volverLogin} 
          mostrarCambiarContrasenia={mostrarCambiarContrasenia}
        />
      )}
      {pantalla === 'cambiar-contrasenia' && (
        <CambiarContraseña 
          volverLogin={volverLogin}
          email={emailRecuperacion}
        />
      )}
    </div>
  );
}

export default Login;