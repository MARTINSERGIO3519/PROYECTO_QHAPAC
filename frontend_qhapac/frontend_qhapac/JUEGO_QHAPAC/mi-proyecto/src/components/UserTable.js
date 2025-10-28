// src/components/UserTable.js
import React from 'react';
import './UserTable.css'; // Importamos los estilos de la tabla

export default function UserTable({ usuarios }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>ID Usuario</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map(user => (
              <tr key={user.idUsuario}>
                <td>{user.idUsuario}</td>
                <td>{user.nombre}</td>
                <td>{user.correo}</td>
                <td>{user.rol}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No hay usuarios registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
