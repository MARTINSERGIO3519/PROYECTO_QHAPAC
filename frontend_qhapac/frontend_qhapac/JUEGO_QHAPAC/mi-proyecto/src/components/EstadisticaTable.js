// src/components/UserTable.js
import React, { useState } from "react";
import './EstadisticaTable.css'; // Importamos los estilos de la tabla

export default function UserTable() {
return (
    <div className="niveles-container">
      <h2>Periodo 1</h2>
      <table className="niveles-table">
        <thead>
          <tr>
            <th>Nivel</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>Quiz</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Porcentaje de competición</td>
            <td>100%</td>
            <td>80%</td>
            <td>100%</td>
            <td>90%</td>
          </tr>
        </tbody>
      </table>

      <h2>Periodo 2</h2>
      <table className="niveles-table">
        <thead>
          <tr>
            <th>Nivel</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>Quiz</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Porcentaje de competición</td>
            <td>100%</td>
            <td>80%</td>
            <td>100%</td>
            <td>90%</td>
          </tr>
        </tbody>
      </table>

      <h2>Periodo 3</h2>
      <table className="niveles-table">
        <thead>
          <tr>
            <th>Nivel</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>Quiz</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Porcentaje de competición</td>
            <td>100%</td>
            <td>80%</td>
            <td>100%</td>
            <td>90%</td>
          </tr>
        </tbody>
      </table>

      <h2>Periodo 4</h2>
      <table className="niveles-table">
        <thead>
          <tr>
            <th>Nivel</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>Quiz</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Porcentaje de competición</td>
            <td>100%</td>
            <td>80%</td>
            <td>100%</td>
            <td>90%</td>
          </tr>
        </tbody>
      </table>

      <h2>Periodo 5</h2>
      <table className="niveles-table">
        <thead>
          <tr>
            <th>Nivel</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>Quiz</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Porcentaje de competición</td>
            <td>100%</td>
            <td>80%</td>
            <td>100%</td>
            <td>90%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

