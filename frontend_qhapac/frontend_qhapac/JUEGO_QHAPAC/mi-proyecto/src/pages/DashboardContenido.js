// src/pages/DashboardContenido.js
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import ContenidoTable from '../components/ContenidoTable';
import { authGet } from '../utils/api';
import './DashboardAdmin.css';

export default function DashboardContenido() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        setLoading(true);
        setError('');
        // USAR LA RUTA CORRECTA DE TU API
        const res = await authGet('http://localhost:8090/api/admin/usuarios');
        
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }

        const data = await res.json();
        const usuariosSinContrasena = data.map(({ contrasena, ...rest }) => rest);
        setUsuarios(usuariosSinContrasena);
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

  const downloadExcel = () => {
    const datosParaExcel = usuarios.map(usuario => ({
      ID: usuario.idUsuario,
      Nombre: usuario.nombre,
      Apellido: usuario.apellido,
      Email: usuario.email,
      Rol: usuario.idRol === 1 ? '👑 Administrador' : '👤 Usuario',
      Estado: usuario.id_Estado_Usuario === 1 ? '🟢 Activo' : 
              usuario.id_Estado_Usuario === 2 ? '⚫ Inactivo' : '🔴 Bloqueado',
      'Experiencia Total': usuario.experiencia_Total,
      'Fecha Registro': new Date(usuario.fecha_Registro).toLocaleDateString()
    }));

    const ws = XLSX.utils.json_to_sheet(datosParaExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
    XLSX.writeFile(wb, 'usuarios.xlsx');
  };

  return (
    <div className="dashboard-admin-container">
      <h1><center>Gestión de Contenido</center></h1>
      
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando datos...</p>
        </div>
      )}
      
      <ContenidoTable />
      <div className="mt-4" 
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "20vh", 
          textAlign: "center" 
        }}
      >
        <button 
          className="btn btn-success"
          onClick={downloadExcel}
          disabled={usuarios.length === 0 || loading}
          style={{ 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 35px",
            fontSize: "18px",
            fontWeight: "500",
            textAlign: "center",
            lineHeight: "1",
            borderRadius: "8px"
          }}
        >
          Descargar en Excel
        </button>
      </div>
    </div>
  );
}