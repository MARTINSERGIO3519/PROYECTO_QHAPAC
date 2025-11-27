export const forceLogout = () => {
  console.log("🔄 Forzando logout completo...");
  
  // Limpiar todo el localStorage relacionado con auth
  localStorage.removeItem('usuario');
  localStorage.removeItem('token');
  
  // También limpiar sessionStorage por si acaso
  sessionStorage.clear();
  
  // Forzar recarga para limpiar estado de React
  window.location.href = '/login';
};

/**
 * Verificar si hay sesión activa
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const usuario = localStorage.getItem('usuario');
  
  return !!(token && usuario);
};

/**
 * Obtener usuario actual
 */
export const getCurrentUser = () => {
  try {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    return null;
  }
};