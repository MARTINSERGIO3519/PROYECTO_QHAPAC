// src/pages/Puntuaciones.js
import { useEffect, useState } from "react";
import { authGet } from "../utils/api";
import "./Puntuaciones.css";

const Puntuaciones = () => {
  const [estadisticas, setEstadisticas] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // ------------------------------------------------
  // Cargar tabla completa desde backend
  // ------------------------------------------------
  const cargarTabla = async () => {
    try {
      setError("");
      console.log("🔍 Cargando estadísticas...");
      
      const res = await authGet("http://localhost:8090/api/estadistica-nivel");
      
      console.log("📊 Response status:", res.status);
      
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }

      const json = await res.json();
      console.log("✅ Estadísticas cargadas:", json);
      setEstadisticas(json);
      
    } catch (error) {
      console.error("❌ Error cargando tabla:", error);
      
      if (error.message === 'Authentication failed') {
        setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
      } else if (error.message.includes('Network error')) {
        setError("Error de conexión. Verifica que el servidor esté funcionando.");
      } else if (error.message.includes('403')) {
        setError("Acceso denegado. No tienes permisos para ver estas estadísticas.");
      } else {
        setError(`Error al cargar las puntuaciones: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTabla();

    // Opcional: refrescar cada 5 segundos para ver nuevos resultados
    const interval = setInterval(cargarTabla, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRetry = () => {
    setLoading(true);
    cargarTabla();
  };

  if (loading && estadisticas.length === 0) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-lg">Cargando puntuaciones...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-3">Tabla de Puntuaciones</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button 
              onClick={handleRetry}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      <table className="w-full border-collapse shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border p-2">Nivel</th>
            <th className="border p-2">Nota</th>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Partidas</th>
          </tr>
        </thead>

        <tbody>
          {estadisticas.length === 0 && !error ? (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No hay puntuaciones registradas.
              </td>
            </tr>
          ) : (
            estadisticas.map((item) => (
              <tr key={item.idEstadisticaNivel} className="hover:bg-gray-100">
                <td className="border p-2">{item.nivel?.idNivel}</td>
                <td className="border p-2">{item.notaPromedio}</td>
                <td className="border p-2">
                  {item.fecha ? new Date(item.fecha).toLocaleDateString() : 'N/A'}
                </td>
                <td className="border p-2">{item.partidasJugadas}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Puntuaciones;