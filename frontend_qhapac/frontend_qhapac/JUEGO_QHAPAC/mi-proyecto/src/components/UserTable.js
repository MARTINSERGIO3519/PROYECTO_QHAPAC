// src/components/UserTable.js
import React, { useState, useEffect } from 'react';
import { authGet } from '../utils/api';
import './UserTable.css';

export default function UserTable() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await authGet('http://localhost:8090/api/usuarios');
        
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }

        const data = await res.json();
        setUsuarios(data);
      } catch (error) {
        console.error('❌ Error cargando usuarios:', error);
        if (error.message === 'Authentication failed') {
          setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
        } else {
          setError(`Error al cargar usuarios: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    cargarUsuarios();
  }, []);

  return (
    <div className="table-responsive">
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}