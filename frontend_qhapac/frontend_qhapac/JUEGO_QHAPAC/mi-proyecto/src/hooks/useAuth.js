// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');
    
    console.log("🔍 Checking auth - Token:", token, "Usuario:", usuario);
    
    if (token && usuario) {
      try {
        if (usuario === "undefined") {
          console.warn("Usuario es 'undefined' string, limpiando...");
          logout();
          return;
        }
        
        const userData = JSON.parse(usuario);
        console.log("✅ Usuario parseado:", userData);
        
        if (userData && typeof userData === 'object' && userData.id) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          console.warn("Datos de usuario inválidos:", userData);
          logout();
        }
      } catch (error) {
        console.error('❌ Error parsing user data:', error);
        logout();
      }
    } else {
      console.log("📝 No hay token o usuario en localStorage");
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  };

  const login = (userData, token) => {
    console.log("🔐 Login - UserData:", userData, "Token:", token);
    
    if (!userData || !token) {
      console.error("❌ Datos inválidos para login");
      return;
    }
    
    try {
      localStorage.setItem('usuario', JSON.stringify(userData));
      localStorage.setItem('token', token);
      setUser(userData);
      setIsAuthenticated(true);
      setShouldRedirect(false);
      console.log("✅ Login exitoso");
    } catch (error) {
      console.error('❌ Error en login:', error);
    }
  };

  const logout = () => {
    console.log("🚪 Cerrando sesión desde useAuth...");
    
    // Limpiar localStorage primero
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    
    // Luego actualizar el estado
    setUser(null);
    setIsAuthenticated(false);
    setShouldRedirect(true);
    
    console.log("✅ Estado después del logout - user:", null, "isAuthenticated:", false);
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  };

  const clearRedirect = () => {
    setShouldRedirect(false);
  };

  return {
    isAuthenticated,
    user,
    loading,
    shouldRedirect,
    login,
    logout,
    getAuthHeaders,
    clearRedirect
  };
};