import React from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardAdmin.css";

function DashboardGeneral() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-admin-container">
      <div className="dashboard-header text-center">
        <h1 className="dashboard-title">Panel General</h1>
        <p className="dashboard-subtitle">Selecciona una sección para administrar</p>
      </div>

      <div className="container d-flex flex-wrap justify-content-center gap-4 mt-4">
        <div
          className="stat-card primary"
          style={{ width: "250px", cursor: "pointer" }}
          onClick={() => navigate("/dashboard-contenido")}
        >
          <div className="stat-icon"><i className="bi bi-collection-play-fill"></i></div>
          <div className="stat-info">
            <h3>Contenido</h3>
            <p>Administra niveles, quizzes y materiales del juego</p>
          </div>
        </div>

        <div
          className="stat-card success"
          style={{ width: "250px", cursor: "pointer" }}
          onClick={() => navigate("/dashboard-estadisticas")}
        >
          <div className="stat-icon"><i className="bi bi-bar-chart-fill"></i></div>
          <div className="stat-info">
            <h3>Estadísticas</h3>
            <p>Visualiza el progreso y rendimiento de los jugadores</p>
          </div>
        </div>

        <div
          className="stat-card warning"
          style={{ width: "250px", cursor: "pointer" }}
          onClick={() => navigate("/dashboard-acciones")}
        >
          <div className="stat-icon"><i className="bi bi-gear-fill"></i></div>
          <div className="stat-info">
            <h3>Acciones</h3>
            <p>Gestiona usuarios y actividades del sistema</p>
          </div>
        </div>

        <div
          className="stat-card info"
          style={{ width: "250px", cursor: "pointer" }}
          onClick={() => navigate("/dashboard-sugerencias")}
        >
          <div className="stat-icon"><i className="bi bi-chat-dots-fill"></i></div>
          <div className="stat-info">
            <h3>Sugerencias</h3>
            <p>Revisa opiniones y propuestas de mejora</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardGeneral;
