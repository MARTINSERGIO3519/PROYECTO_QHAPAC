// src/services/estadisticaNivelService.js
import { authPost } from '../utils/api';

export const registrarNivel = async (idNivel, puntaje, correctas) => {
  try {
    // Obtener usuario del localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    
    if (!usuario || !usuario.id) {
      throw new Error("Usuario no autenticado");
    }

    const data = {
      idUsuario: usuario.id,
      idNivel: idNivel,
      puntaje: puntaje,
      correctas: correctas,
      periodo: 1,
      fecha: new Date().toISOString().split("T")[0]
    };

    const response = await authPost("http://localhost:8090/api/estadistica-nivel/save", data);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error registrando nivel", error);
    throw error;
  }
};

// Función adicional para obtener estadísticas del usuario
export const obtenerEstadisticasUsuario = async () => {
  try {
    const response = await authGet("http://localhost:8090/api/estadistica-nivel");
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error obteniendo estadísticas", error);
    throw error;
  }
};

// Función para actualizar estadísticas
export const actualizarEstadistica = async (idEstadistica, datos) => {
  try {
    const response = await authPut(`http://localhost:8090/api/estadistica-nivel/update`, datos);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error actualizando estadística", error);
    throw error;
  }
};