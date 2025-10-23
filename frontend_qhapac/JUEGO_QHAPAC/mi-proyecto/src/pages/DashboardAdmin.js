// src/pages/DashboardAdmin.js
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import UserTable from '../components/UserTable';
import './DashboardAdmin.css'; // Importamos los estilos del Dashboard

export default function DashboardAdmin() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8090/admin/get-users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(data => {
      const usuariosSinContrasena = data.map(({ contrasena, ...rest }) => rest);
      setUsuarios(usuariosSinContrasena);
    })
    .catch(err => console.log('Error al obtener usuarios:', err));
  }, []);

  const downloadExcel = () => {
    const usuariosSinContrasena = usuarios.map(({ contrasena, ...rest }) => rest);
    const ws = XLSX.utils.json_to_sheet(usuariosSinContrasena);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
    XLSX.writeFile(wb, 'usuarios.xlsx');
  };

  return (
    <div className="dashboard-container">
      <h1>Panel de Administración</h1>
      <UserTable usuarios={usuarios} />
      <div className="text-center mt-4">
        <button className="btn btn-success" onClick={downloadExcel}>Descargar Usuarios en Excel</button>
      </div>
    </div>
  );
}
