// src/utils/api.js

/**
 * Función para hacer peticiones HTTP autenticadas
 */
export const authenticatedFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // Agregar token de autenticación si existe
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    
    // Si la respuesta es 401 o 403, limpiar localStorage pero NO redirigir automáticamente
    if (response.status === 401 || response.status === 403) {
      console.warn('Token inválido o expirado');
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      throw new Error('Authentication failed');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    if (error.message === 'Authentication failed') {
      throw error; // Ya manejado, solo relanzar
    }
    console.error('Fetch error:', error);
    throw new Error(`Network error: ${error.message}`);
  }
};

/**
 * Función para hacer GET autenticado
 */
export const authGet = async (url) => {
  return authenticatedFetch(url);
};

/**
 * Función para hacer POST autenticado
 */
export const authPost = async (url, data) => {
  return authenticatedFetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Función para hacer PUT autenticado
 */
export const authPut = async (url, data) => {
  return authenticatedFetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * Función para hacer DELETE autenticado
 */
export const authDelete = async (url) => {
  return authenticatedFetch(url, {
    method: 'DELETE',
  });
};