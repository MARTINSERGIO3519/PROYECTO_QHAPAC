// src/components/UserTable.js
import React, { useState } from "react";
import './AccionesTable.css'; // Importamos los estilos de la tabla

export default function UserTable() {
const [filtro, setFiltro] = useState({ nombre: "", accion: "", fecha: "" });

  const datos = [
    { id: 1, nombre: "Juan Pérez", accion: "Inicio sesión", fecha: "2025-10-26" },
    { id: 2, nombre: "María García", accion: "Registró usuario", fecha: "2025-10-25" },
    { id: 3, nombre: "Carlos Torres", accion: "Actualizó perfil", fecha: "2025-10-24" },
    { id: 4, nombre: "Lucía Ramírez", accion: "Cerró sesión", fecha: "2025-10-23" },
    { id: 5, nombre: "Pedro López", accion: "Eliminó registro", fecha: "2025-10-22" },
  ];

  // Filtrado simple
  const filtrados = datos.filter(
    (item) =>
      item.nombre.toLowerCase().includes(filtro.nombre.toLowerCase()) &&
      item.accion.toLowerCase().includes(filtro.accion.toLowerCase()) &&
      item.fecha.includes(filtro.fecha)
  );

  return (
    <div className="tabla-container">
      {/* 🔍 Formulario de búsqueda */}
      <form className="form-busqueda" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Nombre"
          value={filtro.nombre}
          onChange={(e) => setFiltro({ ...filtro, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Acción"
          value={filtro.accion}
          onChange={(e) => setFiltro({ ...filtro, accion: e.target.value })}
        />
        <input
          type="date"
          value={filtro.fecha}
          onChange={(e) => setFiltro({ ...filtro, fecha: e.target.value })}
        />
      </form>

      {/* 🧾 Tabla */}
      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acción</th>
            <th>Fecha de Acción</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.length > 0 ? (
            filtrados.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.accion}</td>
                <td>{item.fecha}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No se encontraron resultados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

