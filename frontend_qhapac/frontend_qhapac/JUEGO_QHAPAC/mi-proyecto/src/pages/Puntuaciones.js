import React, { useEffect, useState } from "react"; 
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Puntuaciones.css";

function App() {
  const [estadisticas, setEstadisticas] = useState([]);

  const fetchEstadisticas = () => {
    axios.get("http://localhost:8090/estadisticas/ranking")
      .then(res => setEstadisticas(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchEstadisticas(); // carga inicial

    const interval = setInterval(() => {
      fetchEstadisticas(); // refresca cada 5 segundos
    }, 5000);

    return () => clearInterval(interval); // limpieza al desmontar
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Ranking de Estadísticas</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Puesto</th>
            <th>Usuario</th>
            <th>Promedio Puntaje</th>
            <th>Preguntas Acertadas</th>
            <th>Preguntas Falladas</th>
            <th>Partidas Jugadas</th>
          </tr>
        </thead>
        <tbody>
          {estadisticas.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.nombreUsuario}</td>
              <td>{item.promedioPuntaje?.toFixed(2)}</td>
              <td>{item.preguntasAcertadas}</td>
              <td>{item.preguntasFalladas}</td>
              <td>{item.partidasJugadas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

