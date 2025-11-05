// src/pages/DashboardAdmin.js
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import EstadisticaTable from '../components/EstadisticaTable';
import './DashboardAdmin.css';

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
    <div className="dashboard-admin-container">
      <h1><center>Manejo de Estadísticas</center></h1>
      <EstadisticaTable/>
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
