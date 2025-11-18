import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import "./Inicio.css";
import "../components/Comun.css";
import Quizz1 from "../components/Periodo1Quizz1";
import Quizz2 from "../components/Periodo1Quizz2";
import Quizz3 from "../components/Periodo2Quizz3";
import Quizz4 from "../components/Periodo2Quizz4";


function Inicio() {
  const [modalVisible, setModalVisible] = useState(false);
  const [contenidoModal, setContenidoModal] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [faqVisible, setFaqVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);

    return () => {
      document.documentElement.classList.remove("dark-mode");
      document.body.classList.remove("dark-mode");
    };
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleFaq = () => setFaqVisible(!faqVisible);

  const abrirModal = (tipo, periodo) => {
    let contenido;
//Nivel 1
    switch (tipo) {
      case "detalles":
        if (periodo === "Culturas Preincaicas") {
          contenido = (
            <>
              <h3>RESUMEN SOBRE {periodo}</h3>
              <div className="detalle-unico">
                <div
                  className="imagen-fondo"
                  style={{
                    backgroundImage: `url(/MEDIA/IMAGES/Periodo1/1Periodo.png)`,
                  }}
                >
                  <div className="texto-descripcion">
                    <p>
                      El relato se sitúa el 8 de septiembre de 1820, cuando José de San Martín
                      desembarcó con la Expedición Libertadora en la bahía de Paracas. Cansado
                      por el viaje y la preparación de su ejército, se recostó a la sombra de una
                      palmera y se quedó dormido. Durante su sueño, visualizó un país libre y
                      próspero, lleno de esperanza y patriotismo. Al despertar vio volar una
                      bandada de aves de alas rojas y pechos blancos, y de ellas se inspiró para
                      crear la bandera del Perú.
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        }
        break;

      case "historieta":
        if (periodo === "Culturas Preincaicas") {
          const historietaCards = [
            { id: 1, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/1SanMartin.png" },
            { id: 2, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/2SanMartin.png" },
            { id: 3, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/3SanMartin.png" },
            { id: 4, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/4SanMartin.png" },
            { id: 5, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/5SanMartin.png" },
            { id: 6, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/6SanMartin.png" },
          ];

          contenido = (
            <>
              <h3>HISTORIETA SOBRE {periodo}</h3>
              <div className="historieta-container">
                <div className="historieta-grid">
                  {historietaCards.map((card) => (
                    <div key={card.id} className="historieta-card">
                      <img src={card.imagen} alt={`Historieta ${card.id}`} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          );
        }
        break;

      case "preguntas":
        if (periodo === "Culturas Preincaicas") {
          contenido = (
            <>
              <h3>PREGUNTAS SOBRE {periodo}</h3>
              <p>Pon a prueba tus conocimientos sobre la cultura Caral.</p>
              <Quizz1 />
            </>
          );
        }
        break;

      case "video":
        let videoUrl = "https://www.youtube.com/embed/BgBNLX_3afs?si=Qi8to_v_wdgozoLP";
        if (periodo === "Culturas Preincaicas") {
          videoUrl = "https://www.youtube.com/embed/y482QVsjZXk?si=Hutqf33Hc1a53vGy";
        }

        contenido = (
          <>
            <h3>Video educativo - {periodo}</h3>
            <iframe
              width="100%"
              height="315"
              src={videoUrl}
              title="Video educativo"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </>
        );
        break;

      case "juego":
        if (periodo === "Culturas Preincaicas") {
          contenido = (
            <>
              <h3> JUEGO DE PREGUNTAS SOBRE {periodo}</h3>
              <p>¡Aprende mientras te diviertes con la Cultura Chavin!</p>
              <Quizz2 />
            </>
          );
        }
        break;

      default:
        contenido = <p>Contenido no disponible.</p>;
    }

    //Nivel 2

    switch (tipo) {
      case "detalles":
        if (periodo === "Cultura Inca") {
          contenido = (
            <>
              <h3>RESUMEN SOBRE {periodo}</h3>
              <div className="detalle-unico">
                <div
                  className="imagen-fondo"
                  style={{
                    backgroundImage: `url(/MEDIA/IMAGES/Periodo1/1Periodo.png)`,
                  }}
                >
                  <div className="texto-descripcion">
                    <p>
                      El relato se sitúa el 8 de septiembre de 1820, cuando José de San Martín
                      desembarcó con la Expedición Libertadora en la bahía de Paracas. Cansado
                      por el viaje y la preparación de su ejército, se recostó a la sombra de una
                      palmera y se quedó dormido. Durante su sueño, visualizó un país libre y
                      próspero, lleno de esperanza y patriotismo. Al despertar vio volar una
                      bandada de aves de alas rojas y pechos blancos, y de ellas se inspiró para
                      crear la bandera del Perú.
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        }
        break;

      case "historieta":
        if (periodo === "Cultura Inca") {
          const historietaCards = [
            { id: 1, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/1SanMartin.png" },
            { id: 2, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/2SanMartin.png" },
            { id: 3, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/3SanMartin.png" },
            { id: 4, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/4SanMartin.png" },
            { id: 5, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/5SanMartin.png" },
            { id: 6, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/6SanMartin.png" },
          ];

          contenido = (
            <>
              <h3>HISTORIETA SOBRE {periodo}</h3>
              <div className="historieta-container">
                <div className="historieta-grid">
                  {historietaCards.map((card) => (
                    <div key={card.id} className="historieta-card">
                      <img src={card.imagen} alt={`Historieta ${card.id}`} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          );
        }
        break;

      case "preguntas":
        if (periodo === "Cultura Inca") {
          contenido = (
            <>
              <h3>PREGUNTAS SOBRE {periodo}</h3>
              <p>Pon a prueba tus conocimientos sobre los Incas.</p>
              <Quizz3 />
            </>
          );
        }
        break;

      case "video":
        let videoUrl = "https://www.youtube.com/embed/BgBNLX_3afs?si=Qi8to_v_wdgozoLP";
        if (periodo === "EL SUEÑO DE DON JOSE DE SAN MARTIN") {
          videoUrl = "https://www.youtube.com/embed/y482QVsjZXk?si=Hutqf33Hc1a53vGy";
        }

        contenido = (
          <>
            <h3>Video educativo - {periodo}</h3>
            <iframe
              width="100%"
              height="315"
              src={videoUrl}
              title="Video educativo"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </>
        );
        break;

      case "juego":
        if (periodo === "Cultura Inca") {
          contenido = (
            <>
              <h3> JUEGO DE PREGUNTAS SOBRE {periodo}</h3>
              <p>¡Aprende mientras te diviertes con los Incas!</p>
              <Quizz4 />
            </>
          );
        }
        break;

      default:
        contenido = <p>Contenido no disponible.</p>;
    }

    setContenidoModal(contenido);
    setModalVisible(true);
  };

  const cerrarModal = () => setModalVisible(false);

  const periodos = [
    "Culturas Preincaicas",
    "Cultura Inca",
    "El Virreinato del Perú",
    "La Independencia del Perú",
    "La República del Perú",
  ];

  return (
    <div className="inicio-container">
      <h1 className="titulo-principal">Camino de la Historia del Perú</h1>

      {periodos.map((periodo, i) => (
        <section key={i} className="periodo">
          <h2 className="titulo-periodo">{`Periodo ${i + 1}: ${periodo}`}</h2>

          <div className="mapa-niveles">
            <div
              className="nivel nivel-verde"
              onClick={() => abrirModal("detalles", periodo)}
            >
              📗
            </div>
            <div className="linea"></div>
            <div
              className="nivel nivel-amarillo"
              onClick={() => abrirModal("historieta", periodo)}
            >
              📖
            </div>
            <div className="linea"></div>
            <div
              className="nivel nivel-rojo"
              onClick={() => abrirModal("preguntas", periodo)}
            >
              ❓
            </div>
            <div className="linea"></div>
            <div
              className="nivel nivel-azul"
              onClick={() => abrirModal("video", periodo)}
            >
              🎬
            </div>
            <div className="linea"></div>
            <div
              className="nivel nivel-morado"
              onClick={() => abrirModal("juego", periodo)}
            >
              🧩
            </div>
          </div>
        </section>
      ))}

      {modalVisible && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            {contenidoModal}
            <button className="btn-cerrar" onClick={cerrarModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Botones flotantes */}
      <div className="sticky-buttons">
        <button className="btn" onClick={toggleDarkMode}>
          {darkMode ? "☀️" : "🌙"}
        </button>
        <button className="btn" onClick={toggleFaq}>
          ❓
        </button>
      </div>

      {/* FAQ flotante */}
      <div id="faqContainer" className={`faq ${faqVisible ? "" : "hidden"}`}>
        <h3>Preguntas Frecuentes</h3>
        <ul>
          <li>
            <b>¿Cómo se juega?</b> Desarrolla cada Periodo para que puedas pasar
            al siguiente
          </li>
          <li>
            <b>¿Cuántos jugadores?</b> Solo tú, pero puedes competir por el podio
            con tus amigos
          </li>
          <li>
            <b>¿Hay Versión premium?</b> Por el momento estamos trabajando en una
            versión premium con más características.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Inicio;
