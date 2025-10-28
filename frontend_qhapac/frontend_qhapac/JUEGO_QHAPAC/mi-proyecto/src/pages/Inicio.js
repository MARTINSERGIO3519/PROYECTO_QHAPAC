import React, { useState, useEffect } from "react";
import "./Inicio.css";
import "../components/Comun.css";

function Inicio() {
  const [modalVisible, setModalVisible] = useState(false);
  const [contenidoModal, setContenidoModal] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [faqVisible, setFaqVisible] = useState(false);


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

    switch (tipo) {

      case "detalles":
        if (periodo === "EL SUEÑO DE DON JOSE DE SAN MARTIN") {
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
        } else {
          contenido = null;
        }
        break;



      case "historieta":
        if (periodo === "EL SUEÑO DE DON JOSE DE SAN MARTIN") {
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
        if (periodo === "EL SUEÑO DE DON JOSE DE SAN MARTIN") {
          const QuizSanMartin = () => {
            const preguntas = [
              {
                texto: "¿Dónde tuvo el sueño José de San Martín?",
                opciones: ["En Lima", "En Paracas", "En Chile", "En París"],
                correcta: 1,
              },
              {
                texto: "¿Qué soñó San Martín según la historia?",
                opciones: [
                  "Un Pais libre y prospero",
                  "La creación de una gran empresa",
                  "La unión entre España y América",
                  "El fin del comercio marítimo",
                ],
                correcta: 0,
              },
              {
                texto: "¿Qué simboliza el sueño de San Martín?",
                opciones: [
                  "La esperanza de libertad",
                  "La ambición personal",
                  "El poder del ejército realista",
                  "El comercio internacional",
                ],
                correcta: 0,
              },
            ];

            const [indice, setIndice] = React.useState(0);
            const [seleccion, setSeleccion] = React.useState(null);
            const [mensaje, setMensaje] = React.useState("");
            const [finalizado, setFinalizado] = React.useState(false);

            const preguntaActual = preguntas[indice];

            const responder = () => {
              if (seleccion === null) {
                setMensaje("Selecciona una respuesta.");
                return;
              }

              if (seleccion === preguntaActual.correcta) {
                if (indice + 1 < preguntas.length) {
                  setMensaje("✅ ¡Correcto!");
                  setTimeout(() => {
                    setIndice(indice + 1);
                    setSeleccion(null);
                    setMensaje("");
                  }, 700);
                } else {
                  setFinalizado(true);
                }
              } else {
                setMensaje("❌ Vuelve a intentarlo.");
              }
            };

            if (finalizado) {
              return (
                <div className="quiz-container">
                  <h4>🎉 ¡Felicidades! Has completado todas las preguntas.</h4>
                </div>
              );
            }

            return (
              <div className="quiz-container">
                <div className="quiz-pregunta">
                  <h4>{preguntaActual.texto}</h4>
                </div>

                <div className="quiz-alternativas">
                  {preguntaActual.opciones.map((op, i) => (
                    <button
                      key={i}
                      className="quiz-btn"
                      onClick={() => setSeleccion(i)}
                      style={{
                        background:
                          seleccion === i ? "#d0e8ff" : "var(--btn-bg, #f5f5f5)",
                      }}
                    >
                      {String.fromCharCode(65 + i)}. {op}
                    </button>
                  ))}
                </div>

                <p
                  style={{
                    color: mensaje.includes("Correcto") ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {mensaje}
                </p>

                <div className="quiz-controles">
                  <button className="quiz-responder" onClick={responder}>
                    Responder
                  </button>
                </div>
              </div>
            );
          };

          contenido = (
            <>
              <h3>PREGUNTAS SOBRE {periodo}</h3>
              <p>Pon a prueba tus conocimientos sobre el sueño de San Martín.</p>
              <QuizSanMartin />
            </>
          );
        } else { }
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
        if (periodo === "EL SUEÑO DE DON JOSE DE SAN MARTIN") {
          const JuegoSanMartin = () => {
            const preguntas = [
              {
                texto: "¿Dónde soñó José de San Martín con la bandera del Perú?",
                opciones: ["En Lima", "En Paracas", "En Mendoza", "En Buenos Aires"],
                correcta: 1,
              },
              {
                texto: "¿Qué vio San Martín en su sueño que le dio una idea para la bandera?",
                opciones: [
                  "Un arcoíris",
                  "Unas aves llamadas parihuanas",
                  "Una montaña nevada",
                  "El mar azul y el cielo blanco",
                ],
                correcta: 1,
              },
              {
                texto: "¿De qué colores eran las aves que inspiraron la bandera peruana?",
                opciones: [
                  "Rojas y blancas",
                  "Verdes y amarillas",
                  "Azules y rojas",
                  "Negras y grises",
                ],
                correcta: 0,
              },
              {
                texto: "¿Qué simboliza la bandera que soñó San Martín?",
                opciones: [
                  "La libertad del Perú",
                  "La fuerza del ejército",
                  "La amistad con España",
                  "La riqueza del país",
                ],
                correcta: 0,
              },
              {
                texto: "¿En qué año tuvo su sueño en Paracas?",
                opciones: ["1810", "1815", "1820", "1825"],
                correcta: 2,
              },
              {
                texto: "¿Qué sintió San Martín al ver a las parihuanas volar?",
                opciones: [
                  "Alegría y esperanza por la libertad",
                  "Miedo a las aves",
                  "Tristeza por el viaje",
                  "Cansancio por el calor",
                ],
                correcta: 0,
              },
              {
                texto: "¿Qué nombre tienen las aves del sueño de San Martín?",
                opciones: ["Parihuanas", "Cóndores", "Gaviotas", "Flamencos"],
                correcta: 0,
              },
              {
                texto: "¿Qué quería lograr San Martín con su sueño?",
                opciones: [
                  "Liberar al Perú y traer libertad",
                  "Hacer una gran fiesta",
                  "Construir un castillo",
                  "Vender banderas",
                ],
                correcta: 0,
              },
              {
                texto: "¿Qué parte del cuerpo de las parihuanas era blanca?",
                opciones: ["El pecho", "Las alas", "La cabeza", "Las patas"],
                correcta: 0,
              },
              {
                texto: "¿Qué parte del cuerpo de las parihuanas era roja?",
                opciones: ["Las alas", "El pico", "Las patas", "El cuello"],
                correcta: 0,
              },
            ];

            const [indice, setIndice] = React.useState(0);
            const [seleccion, setSeleccion] = React.useState(null);
            const [mensaje, setMensaje] = React.useState("");
            const [finalizado, setFinalizado] = React.useState(false);

            const preguntaActual = preguntas[indice];

            const responder = () => {
              if (seleccion === null) {
                setMensaje("Selecciona una respuesta.");
                return;
              }

              if (seleccion === preguntaActual.correcta) {
                if (indice + 1 < preguntas.length) {
                  setMensaje("✅ ¡Correcto!");
                  setTimeout(() => {
                    setIndice(indice + 1);
                    setSeleccion(null);
                    setMensaje("");
                  }, 700);
                } else {
                  setFinalizado(true);
                }
              } else {
                setMensaje("❌ Vuelve a intentarlo.");
              }
            };

            if (finalizado) {
              return (
                <div className="quiz-container">
                  <h4>🎉 ¡Felicidades! Has completado el juego del Sueño de San Martín.</h4>
                  <button
                    className="quiz-responder"
                    onClick={() => {
                      setIndice(0);
                      setFinalizado(false);
                      setMensaje("");
                    }}
                  >
                    Jugar otra vez
                  </button>
                </div>
              );
            }

            return (
              <div className="quiz-container">
                <div className="quiz-pregunta">
                  <h4>{preguntaActual.texto}</h4>
                </div>

                <div className="quiz-alternativas">
                  {preguntaActual.opciones.map((op, i) => (
                    <button
                      key={i}
                      className="quiz-btn"
                      onClick={() => setSeleccion(i)}
                      style={{
                        background:
                          seleccion === i ? "#d0e8ff" : "var(--btn-bg, #f5f5f5)",
                      }}
                    >
                      {String.fromCharCode(65 + i)}. {op}
                    </button>
                  ))}
                </div>

                <p
                  style={{
                    color: mensaje.includes("Correcto") ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {mensaje}
                </p>

                <div className="quiz-controles">
                  <button className="quiz-responder" onClick={responder}>
                    Responder
                  </button>
                </div>
              </div>
            );
          };

          contenido = (
            <>
              <h3> JUEGO DE PREGUNTAS SOBRE {periodo}</h3>
              <p>¡Aprende mientras te diviertes con el Sueño de San Martín!</p>
              <JuegoSanMartin />
            </>
          );
        } else { }
        break;


      default:
        contenido = <p>Contenido no disponible.</p>;
    }

    setContenidoModal(contenido);
    setModalVisible(true);
  };




  const cerrarModal = () => setModalVisible(false);

  const periodos = [
    "EL SUEÑO DE DON JOSE DE SAN MARTIN",
    "Época Virreinal",
    "Época Republicana",
    "Época Contemporánea",
    "Época Actual",
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

