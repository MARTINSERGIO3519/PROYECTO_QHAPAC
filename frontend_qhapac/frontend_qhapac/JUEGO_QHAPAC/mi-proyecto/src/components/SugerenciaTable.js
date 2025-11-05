// src/components/UserTable.js
import React, { useState } from 'react';
import './SugerenciaTable.css'; // Importamos los estilos de la tabla

export default function UserTable() {
  const [descripcion, setDescripcion] = useState('');
  const [showModal, setShowModal] = useState(false);

  const abrirDescripcion = (texto) => {
    setDescripcion(texto);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setDescripcion('');
  };

  const datos = [
    { fecha: '2025-10-26', usuario: 'Ana Torres', correo: 'ana.torres@gmail.com', asunto: 'Consulta', descripcion: 'Deseo más información sobre el curso.' },
    { fecha: '2025-10-25', usuario: 'Carlos Díaz', correo: 'carlos.dz@gmail.com', asunto: 'Soporte', descripcion: 'No puedo ingresar a mi cuenta.' },
    { fecha: '2025-10-24', usuario: 'Lucía Rojas', correo: 'lucia.rojas@yahoo.com', asunto: 'Sugerencia', descripcion: 'Podrían agregar más niveles al juego.' },
    { fecha: '2025-10-23', usuario: 'Pedro Gutiérrez', correo: 'pedro.gt@gmail.com', asunto: 'Error', descripcion: 'Se cerró el sistema al registrar.' },
    { fecha: '2025-10-22', usuario: 'Sofía Herrera', correo: 'sofia.h@gmail.com', asunto: 'Felicitación', descripcion: 'Excelente plataforma, muy intuitiva.' },
    { fecha: '2025-10-21', usuario: 'Diego Castro', correo: 'diego.c@gmail.com', asunto: 'Reporte', descripcion: 'Encontré un error en el módulo de quiz.' },
  ];

  return (
    <div className="contact-container">
      <table className="contact-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Asunto</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato, i) => (
            <tr key={i}>
              <td>{dato.fecha}</td>
              <td>{dato.usuario}</td>
              <td>{dato.correo}</td>
              <td>{dato.asunto}</td>
              <td>
                <button className="abrir-btn" onClick={() => abrirDescripcion(dato.descripcion)}>
                  Abrir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Descripción</h3>
            <p>{descripcion}</p>
            <button className="cerrar-btn" onClick={cerrarModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
