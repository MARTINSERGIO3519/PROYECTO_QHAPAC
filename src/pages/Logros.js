// src/Logros.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Logros.css";

function Logros() {
  const [logros, setLogros] = useState([]);

  const fetchLogros = () => {
    axios.get("http://localhost:8090/logros")
      .then(res => setLogros(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchLogros(); // carga inicial
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Estos son tus logros personales</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Logro</th>
            <th>Emblema</th>
            <th>Descripción</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {logros.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.nombreUsuario}</td>
              <td>{item.nombreLogro}</td>
              <td>{item.descripcion}</td>
              <td>{item.fechaObtenida}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Logros;


