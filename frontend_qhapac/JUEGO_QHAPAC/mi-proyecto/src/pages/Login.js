import React, { useState } from 'react';
import LoginPrincipal from '../components/LoginPrincipal';
import Registro from '../components/Registro';
import RecuperarContraseña from '../components/RecuperarContraseña';
import './Login.css';

function Login({ onLogin }) {
  const [pantalla, setPantalla] = useState('login'); // 'login', 'registro', 'recuperar'

  const mostrarRegistro = () => setPantalla('registro');
  const mostrarRecuperar = () => setPantalla('recuperar');
  const volverLogin = () => setPantalla('login');

  return (
    <div className="login-page"> {/* Contenedor para CSS exclusivo */}
      {pantalla === 'login' && (
        <LoginPrincipal 
          onLogin={onLogin} 
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

