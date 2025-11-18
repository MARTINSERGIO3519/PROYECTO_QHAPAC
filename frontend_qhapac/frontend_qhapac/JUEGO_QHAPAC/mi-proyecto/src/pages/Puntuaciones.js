// src/components/Puntuaciones.js
import { useEffect, useState } from "react";
import "./Puntuaciones.css";

const Puntuaciones = () => {
  const [estadisticas, setEstadisticas] = useState([]);

  // ------------------------------------------------
  // Cargar tabla completa desde backend
  // ------------------------------------------------
  const cargarTabla = async () => {
    try {
      const res = await fetch("http://localhost:8090/api/estadistica-nivel");
      const json = await res.json();

      setEstadisticas(json);
    } catch (error) {
      console.error("Error cargando tabla:", error);
    }
  };

  useEffect(() => {
    cargarTabla();

    // Opcional: refrescar cada 5 segundos para ver nuevos resultados
    const interval = setInterval(cargarTabla, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-3">Tabla de Puntuaciones</h2>

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
          {estadisticas.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No hay puntuaciones registradas.
              </td>
            </tr>
          ) : (
            estadisticas.map((item) => (
              <tr key={item.idEstadisticaNivel} className="hover:bg-gray-100">
                <td className="border p-2">{item.nivel?.idNivel}</td>
                <td className="border p-2">{item.notaPromedio}</td>
                <td className="border p-2">{item.fecha}</td>
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
