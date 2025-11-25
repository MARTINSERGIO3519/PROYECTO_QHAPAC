import React, { useState, useEffect } from "react";
import "./Inicio.css";
import "../components/Comun.css";
import Quizz1 from "../components/Periodo1Quizz1";
import Quizz2 from "../components/Periodo1Quizz2";
import Quizz3 from "../components/Periodo2Quizz3";
import Quizz4 from "../components/Periodo2Quizz4";
import Quizz5 from "../components/Periodo3Quizz5";
import Quizz6 from "../components/Periodo3Quizz6";
import Quizz7 from "../components/Periodo4Quizz7";
import Quizz8 from "../components/Periodo4Quizz8";
import Quizz9 from "../components/Periodo5Quizz9";
import Quizz10 from "../components/Periodo5Quizz10";

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
        contenido = getDetallesPeriodo(periodo);
        break;

      case "historieta":
        contenido = getHistorietaPeriodo(periodo);
        break;

      case "preguntas":
        contenido = getPreguntasPeriodo(periodo);
        break;

      case "video":
        contenido = getVideoPeriodo(periodo);
        break;

      case "juego":
        contenido = getJuegoPeriodo(periodo);
        break;

      default:
        contenido = <p>Contenido no disponible.</p>;
    }

    setContenidoModal(contenido);
    setModalVisible(true);
  };

  // Resumen
  const getDetallesPeriodo = (periodo) => {
    switch (periodo) {
      case "EL SUEÑO DE DON JOSE DE SAN MARTIN":
        return (
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

      case "La promesa de Simón Bolívar":
        return (
          <>
            <h3>RESUMEN SOBRE {periodo}</h3>
            <div className="detalle-unico">
              <div
                className="imagen-fondo"
                style={{
                  backgroundImage: `url(/MEDIA/IMAGES/Periodo2/2Periodo.png)`,
                }}
              >
                <div className="texto-descripcion">
                  <p>
                    Simón Bolívar, conocido como el Libertador, hizo una promesa solemne
                    de liberar a toda América del Sur del dominio español. Tras la retirada
                    de San Martín, Bolívar tomó el mando de la lucha independentista.
                    Su visión era crear una gran confederación de naciones libres, unidas
                    bajo principios de libertad y justicia. La Batalla de Junín y Ayacucho
                    fueron momentos cruciales donde se materializó su promesa de independencia.
                  </p>
                </div>
              </div>
            </div>
          </>
        );

      case "El viaje de la bandera peruana":
        return (
          <>
            <h3>RESUMEN SOBRE {periodo}</h3>
            <div className="detalle-unico">
              <div
                className="imagen-fondo"
                style={{
                  backgroundImage: `url(/MEDIA/IMAGES/Periodo3/3Periodo.png)`,
                }}
              >
                <div className="texto-descripcion">
                  <p>
                    La bandera peruana ha tenido una evolución fascinante desde su creación
                    por San Martín. Inicialmente con los colores rojo y blanco inspirados
                    en las parihuanas, pasó por varias modificaciones hasta llegar al
                    diseño actual. Este símbolo patrio ha ondeado en batallas históricas,
                    ceremonias oficiales y representa la identidad del pueblo peruano
                    a lo largo de los años.
                  </p>
                </div>
              </div>
            </div>
          </>
        );

      case "El Perú":
        return (
          <>
            <h3>RESUMEN SOBRE {periodo}</h3>
            <div className="detalle-unico">
              <div
                className="imagen-fondo"
                style={{
                  backgroundImage: `url(/MEDIA/IMAGES/Periodo4/4Periodo.png)`,
                }}
              >
                <div className="texto-descripcion">
                  <p>
                    El Perú es un país de gran riqueza cultural e histórica, con civilizaciones
                    milenarias como los Incas, Nazca y Moche. Desde su independencia en 1821,
                    ha forjado una identidad única que combina tradiciones ancestrales con
                    influencias modernas. Su geografía diversa, que incluye costa, sierra y
                    selva, alberga una biodiversidad extraordinaria y paisajes impresionantes
                    que lo convierten en un destino incomparable.
                  </p>
                </div>
              </div>
            </div>
          </>
        );

      case "El sueño de los libertadores":
        return (
          <>
            <h3>RESUMEN SOBRE {periodo}</h3>
            <div className="detalle-unico">
              <div
                className="imagen-fondo"
                style={{
                  backgroundImage: `url(/MEDIA/IMAGES/Periodo5/5Periodo.png)`,
                }}
              >
                <div className="texto-descripcion">
                  <p>
                    Tanto San Martín como Bolívar compartieron un sueño común: ver a América
                    libre y soberana. Sus visiones, aunque con enfoques diferentes, se
                    complementaron para lograr la independencia del continente. Este período
                    explora cómo sus ideales, estrategias y sacrificios se entrelazaron para
                    crear las naciones libres que conocemos hoy, y cómo su legado perdura
                    en la memoria histórica de los pueblos americanos.
                  </p>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };
  //Historietas
  const getHistorietaPeriodo = (periodo) => {
    switch (periodo) {
      case "EL SUEÑO DE DON JOSE DE SAN MARTIN":
        const historietaCards1 = [
          { id: 1, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/1SanMartin.png" },
          { id: 2, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/2SanMartin.png" },
          { id: 3, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/3SanMartin.png" },
          { id: 4, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/4SanMartin.png" },
          { id: 5, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/5SanMartin.png" },
          { id: 6, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/6SanMartin.png" },
        ];

        return (
          <>
            <h3>HISTORIETA SOBRE {periodo}</h3>
            <div className="historieta-container">
              <div className="historieta-grid">
                {historietaCards1.map((card) => (
                  <div key={card.id} className="historieta-card">
                    <img src={card.imagen} alt={`Historieta ${card.id}`} />
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case "La promesa de Simón Bolívar":
        const historietaCards2 = [
          { id: 1, imagen: "/MEDIA/IMAGES/Periodo2/Historieta/1Bolivar.png" },
          { id: 2, imagen: "/MEDIA/IMAGES/Periodo2/Historieta/2Bolivar.png" },
          { id: 3, imagen: "/MEDIA/IMAGES/Periodo2/Historieta/3Bolivar.png" },
          { id: 4, imagen: "/MEDIA/IMAGES/Periodo2/Historieta/4Bolivar.png" },
          { id: 5, imagen: "/MEDIA/IMAGES/Periodo2/Historieta/5Bolivar.png" },
          { id: 6, imagen: "/MEDIA/IMAGES/Periodo2/Historieta/6Bolivar.png" },
        ];

        return (
          <>
            <h3>HISTORIETA SOBRE {periodo}</h3>
            <div className="historieta-container">
              <div className="historieta-grid">
                {historietaCards2.map((card) => (
                  <div key={card.id} className="historieta-card">
                    <img src={card.imagen} alt={`Historieta ${card.id}`} />
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case "El viaje de la bandera peruana":
        const historietaCards3 = [
          { id: 1, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/1SanMartin.png" },
          { id: 2, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/2SanMartin.png" },
          { id: 3, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/3SanMartin.png" },
          { id: 4, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/4SanMartin.png" },
          { id: 5, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/5SanMartin.png" },
          { id: 6, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/6SanMartin.png" },
        ];

        return (
          <>
            <h3>HISTORIETA SOBRE {periodo}</h3>
            <div className="historieta-container">
              <div className="historieta-grid">
                {historietaCards3.map((card) => (
                  <div key={card.id} className="historieta-card">
                    <img src={card.imagen} alt={`Historieta ${card.id}`} />
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case "El Perú":
        const historietaCards4 = [
          { id: 1, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/1SanMartin.png" },
          { id: 2, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/2SanMartin.png" },
          { id: 3, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/3SanMartin.png" },
          { id: 4, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/4SanMartin.png" },
          { id: 5, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/5SanMartin.png" },
          { id: 6, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/6SanMartin.png" },
        ];

        return (
          <>
            <h3>HISTORIETA SOBRE {periodo}</h3>
            <div className="historieta-container">
              <div className="historieta-grid">
                {historietaCards4.map((card) => (
                  <div key={card.id} className="historieta-card">
                    <img src={card.imagen} alt={`Historieta ${card.id}`} />
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case "El sueño de los libertadores":
        const historietaCards5 = [
          { id: 1, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/1SanMartin.png" },
          { id: 2, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/2SanMartin.png" },
          { id: 3, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/3SanMartin.png" },
          { id: 4, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/4SanMartin.png" },
          { id: 5, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/5SanMartin.png" },
          { id: 6, imagen: "/MEDIA/IMAGES/Periodo1/Historieta/6SanMartin.png" },
        ];

        return (
          <>
            <h3>HISTORIETA SOBRE {periodo}</h3>
            <div className="historieta-container">
              <div className="historieta-grid">
                {historietaCards5.map((card) => (
                  <div key={card.id} className="historieta-card">
                    <img src={card.imagen} alt={`Historieta ${card.id}`} />
                  </div>
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  // Función para obtener preguntas de cada período
  const getPreguntasPeriodo = (periodo) => {
    switch (periodo) {
      case "EL SUEÑO DE DON JOSE DE SAN MARTIN":
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

        return (
          <>
            <h3>PREGUNTAS SOBRE {periodo}</h3>
            <p>Pon a prueba tus conocimientos sobre el sueño de San Martín.</p>
            <Quizz1 />
          </>
        );

      case "La promesa de Simón Bolívar":
        const QuizSimonBolivar = () => {
          const preguntas = [
            {
              texto: "¿En qué país nació Simón Bolívar?",
              opciones: ["Colombia", "Venezuela", "Perú", "Ecuador"],
              correcta: 1,
            },
            {
              texto: "¿Cuál fue uno de los mayores logros de Simón Bolívar?",
              opciones: [
                "La independencia de varios países sudamericanos",
                "La conquista de Europa",
                "La creación del canal de Panamá",
                "La abolición de la monarquía española",
              ],
              correcta: 0,
            },
            {
              texto: "¿Cómo se conoce a Simón Bolívar por su papel en la independencia?",
              opciones: [
                "El Libertador",
                "El Conquistador",
                "El Fundador",
                "El Pacificador",
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

        return (
          <>
            <h3>PREGUNTAS SOBRE {periodo}</h3>
            <p>Pon a prueba tus conocimientos sobre Simón Bolivar.</p>
            <Quizz3 />
          </>
        );
      case "El viaje de la bandera peruana":
        const QuizBanderaPeru = () => {
          const preguntas = [
            {
              texto: "¿En qué año se proclamó la independencia del Perú?",
              opciones: ["1810", "1820", "1821", "1824"],
              correcta: 2,
            },
            {
              texto: "¿En qué lugar fue proclamada la independencia del Perú?",
              opciones: [
                "En la Plaza Mayor de Lima",
                "En el Cusco",
                "En Ayacucho",
                "En Paracas",
              ],
              correcta: 0,
            },
            {
              texto: "¿Dónde fue izada por primera vez la bandera del Perú?",
              opciones: [
                "En la bahía de Paracas",
                "En la Plaza Mayor de Lima",
                "En el Callao",
                "En Trujillo",
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

        return (
          <>
            <h3>PREGUNTAS SOBRE {periodo}</h3>
            <p>Pon a prueba tus conocimientos sobre Simón Bolivar.</p>
            <Quizz5 />
          </>
        );

      case "El Perú":
        const QuizElPeru = () => {
          const preguntas = [
            {
              texto: "¿Cuáles son las tres regiones naturales del Perú?",
              opciones: [
                "Costa, Sierra y Selva",
                "Norte, Sur y Centro",
                "Desierto, Mar y Bosque",
                "Montaña, Valle y Costa",
              ],
              correcta: 0,
            },
            {
              texto: "¿Qué caracteriza a la región de la costa?",
              opciones: [
                "Es una zona desértica junto al mar",
                "Tiene grandes nevados",
                "Está cubierta de selva y ríos",
                "Es la región más fría del Perú",
              ],
              correcta: 0,
            },
            {
              texto: "¿Cuál es el animal representativo de la sierra?",
              opciones: ["El gallito de las rocas", "La vicuña", "El delfín rosado", "El cóndor de la selva"],
              correcta: 1,
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

        return (
          <>
            <h3>PREGUNTAS SOBRE {periodo}</h3>
            <p>Pon a prueba tus conocimientos sobre Simón Bolivar.</p>
            <Quizz7 />
          </>
        );

      case "El sueño de los libertadores":
        const QuizLibertadores = () => {
          const preguntas = [
            {
              texto: "¿Qué buscaban Bolívar y San Martín con sus luchas?",
              opciones: [
                "La libertad de los pueblos americanos",
                "El control del comercio con España",
                "El poder político en Europa",
                "El descubrimiento de nuevas tierras",
              ],
              correcta: 0,
            },
            {
              texto: "¿Dónde se reunieron por primera vez Simón Bolívar y José de San Martín?",
              opciones: ["En Guayaquil", "En Lima", "En Ayacucho", "En Quito"],
              correcta: 0,
            },
            {
              texto: "¿Qué simboliza el 'sueño de los libertadores'?",
              opciones: [
                "La unión y libertad de los pueblos de América del Sur",
                "La creación de nuevos imperios",
                "La independencia solo del Perú",
                "Una competencia militar entre los héroes",
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

        return (
          <>
            <h3>PREGUNTAS SOBRE {periodo}</h3>
            <p>Pon a prueba tus conocimientos sobre Simón Bolivar.</p>
            <Quizz9 />
          </>
        );

    }
  };

  // video
  const getVideoPeriodo = (periodo) => {
    let videoUrl = "https://www.youtube.com/embed/BgBNLX_3afs?si=Qi8to_v_wdgozoLP";

    switch (periodo) {
      case "EL SUEÑO DE DON JOSE DE SAN MARTIN":
        videoUrl = "https://www.youtube.com/embed/y482QVsjZXk?si=Hutqf33Hc1a53vGy";
        break;
      case "La promesa de Simón Bolívar":
        videoUrl = "https://www.youtube.com/embed/Zzc_I0lt2PQ?si=ZxWmzspzdTqUDnZm";
        break;
      case "El viaje de la bandera peruana":
        videoUrl = "https://www.youtube.com/embed/Zl9k9erUM3A?si=omVlz9Gmt1bW99S3";
        break;
      case "El Perú":
        videoUrl = "https://www.youtube.com/embed/ltWbRUHqtOc?si=MqQSjFxCHQ0J0tOH";
        break;
      case "El sueño de los libertadores":
        videoUrl = "https://www.youtube.com/embed/U9ls4ueMbjg?si=yb1LVPBYm9R6U4no";
        break;
    }

    return (
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
  };

  // QuizFinal
  const getJuegoPeriodo = (periodo) => {
    switch (periodo) {
      case "EL SUEÑO DE DON JOSE DE SAN MARTIN":
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

        return (
          <>
            <h3>JUEGO DE PREGUNTAS SOBRE {periodo}</h3>
            <p>¡Aprende mientras te diviertes con el Sueño de San Martín!</p>
            <Quizz2 />
          </>
        );

      case "La promesa de Simón Bolívar":
        const JuegoBolivar = () => {
          const preguntas = [
            {
              texto: "¿De qué país era originario Simón Bolívar?",
              opciones: ["Venezuela", "Colombia", "Perú", "Argentina"],
              correcta: 0,
            },
            {
              texto: "¿Qué prometió Bolívar en el Monte Sacro?",
              opciones: [
                "Liberar a América del yugo español",
                "Ser presidente de Venezuela",
                "Construir una gran ciudad",
                "Viajar por todo el mundo",
              ],
              correcta: 0,
            },
            {
              texto: "¿En qué año hizo Bolívar su famosa promesa?",
              opciones: ["1805", "1810", "1815", "1820"],
              correcta: 0,
            },
            {
              texto: "¿Qué batalla consolidó la independencia de Perú?",
              opciones: ["Ayacucho", "Junín", "Boyacá", "Carabobo"],
              correcta: 0,
            },
            {
              texto: "¿Cómo se llamaba el ejército liderado por Bolívar?",
              opciones: ["Ejército Libertador", "Ejército Unido", "Gran Colombia", "Ejército Real"],
              correcta: 0,
            },
            {
              texto: "¿Qué título recibió Bolívar?",
              opciones: ["El Libertador", "El Protector", "El Presidente", "El General"],
              correcta: 0,
            },
            {
              texto: "¿En qué ciudad murió Bolívar?",
              opciones: ["Santa Marta", "Caracas", "Bogotá", "Lima"],
              correcta: 0,
            },
            {
              texto: "¿Qué países liberó Bolívar?",
              opciones: ["Venezuela, Colombia, Ecuador, Perú", "Argentina, Chile, Perú", "México, Perú", "Brasil, Uruguay"],
              correcta: 0,
            },
            {
              texto: "¿En qué año murió Bolívar?",
              opciones: ["1830", "1825", "1840", "1850"],
              correcta: 0,
            },
            {
              texto: "¿Qué idea política defendía Bolívar?",
              opciones: ["La Gran Colombia", "El Imperio Americano", "La Monarquía", "El Comunismo"],
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
                <h4>🎉 ¡Felicidades! Has completado el juego de la Promesa de Bolívar.</h4>
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

        return (
          <>
            <h3>JUEGO DE PREGUNTAS SOBRE {periodo}</h3>
            <p>¡Aprende mientras te diviertes con la Promesa de Bolívar!</p>
            <Quizz4 />
          </>
        );

      case "El viaje de la bandera peruana":
        const BanderaPeru = () => {
          const preguntas = [
            {
              texto: "¿Quién creó la primera bandera del Perú?",
              opciones: [
                "José de San Martín",
                "Simón Bolívar",
                "Ramón Castilla",
                "Miguel Grau",
              ],
              correcta: 0,
            },
            {
              texto: "¿En qué año se proclamó la independencia del Perú?",
              opciones: ["1810", "1820", "1821", "1824"],
              correcta: 2,
            },
            {
              texto: "¿En qué lugar fue proclamada la independencia del Perú?",
              opciones: [
                "En la Plaza Mayor de Lima",
                "En el Cusco",
                "En Ayacucho",
                "En Paracas",
              ],
              correcta: 0,
            },
            {
              texto: "¿Dónde fue izada por primera vez la bandera del Perú?",
              opciones: [
                "En la bahía de Paracas",
                "En la Plaza Mayor de Lima",
                "En el Callao",
                "En Trujillo",
              ],
              correcta: 0,
            },
            {
              texto: "¿Qué simboliza el color rojo en la bandera del Perú?",
              opciones: [
                "La sangre de los héroes que lucharon por la independencia",
                "La amistad entre los pueblos",
                "La belleza de las flores peruanas",
                "El color del cielo al amanecer",
              ],
              correcta: 0,
            },
            {
              texto: "¿Qué simboliza el color blanco en la bandera del Perú?",
              opciones: [
                "La pureza y la paz alcanzada tras la independencia",
                "La nieve de los Andes",
                "La unión con España",
                "La riqueza del mar peruano",
              ],
              correcta: 0,
            },
            {
              texto: "¿Qué representa 'El viaje de la bandera peruana' en la historia?",
              opciones: [
                "El recorrido del símbolo patrio acompañando la independencia del Perú",
                "Un desfile militar moderno",
                "Un viaje imaginario por América",
                "Una historia sobre el mar peruano",
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
                <h4>🎉 ¡Felicidades! Has completado el juego de la Promesa de Bolívar.</h4>
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

        return (
          <>
            <h3>JUEGO DE PREGUNTAS SOBRE {periodo}</h3>
            <p>¡Aprende mientras te diviertes con la Promesa de Bolívar!</p>
            <Quizz6 />
          </>
        );

      case "El Perú":
        const JuegoPeru = () => {
          const preguntas = [
            {
              texto: "¿Cuántas regiones naturales tiene el Perú?",
              opciones: ["Dos", "Tres", "Cuatro", "Cinco"],
              correcta: 1,
            },
            {
              texto: "¿Cuáles son las tres regiones naturales del Perú?",
              opciones: [
                "Costa, Sierra y Selva",
                "Norte, Sur y Centro",
                "Desierto, Mar y Bosque",
                "Montaña, Valle y Costa",
              ],
              correcta: 0,
            },
            {
              texto: "¿Qué caracteriza a la región de la costa?",
              opciones: [
                "Es una zona desértica junto al mar",
                "Tiene grandes nevados",
                "Está cubierta de selva y ríos",
                "Es la región más fría del Perú",
              ],
              correcta: 0,
            },
            {
              texto: "¿Cuál es el animal representativo de la sierra?",
              opciones: ["El gallito de las rocas", "La vicuña", "El delfín rosado", "El cóndor de la selva"],
              correcta: 1,
            },
            {
              texto: "¿Cuál es el animal representativo de la selva peruana?",
              opciones: ["El cóndor", "El puma", "El gallito de las rocas", "El oso de anteojos"],
              correcta: 2,
            },
            {
              texto: "¿Qué tipo de clima tiene la selva?",
              opciones: [
                "Cálido y lluvioso",
                "Frío y seco",
                "Ventoso y templado",
                "Nevado todo el año",
              ],
              correcta: 0,
            },
            {
              texto: "¿Qué actividad económica es importante en la costa peruana?",
              opciones: [
                "La pesca y la agricultura",
                "La minería de oro",
                "La tala de árboles",
                "El turismo de montaña",
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
                <h4>🎉 ¡Felicidades! Has completado el juego de la Promesa de Bolívar.</h4>
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

        return (
          <>
            <h3>JUEGO DE PREGUNTAS SOBRE {periodo}</h3>
            <p>¡Aprende mientras te diviertes con la Promesa de Bolívar!</p>
            <Quizz8 />
          </>
        );

      case "El sueño de los libertadores":
        const JuegoLibertadores = () => {
          const preguntas = [
            {
              texto: "¿Quiénes fueron los 'Libertadores' de América del Sur?",
              opciones: [
                "Simón Bolívar y José de San Martín",
                "Miguel Grau y Ramón Castilla",
                "Túpac Amaru y Micaela Bastidas",
                "Francisco Pizarro y Hernando de Soto",
              ],
              correcta: 0,
            },
            {
              texto: "¿Qué buscaban Bolívar y San Martín con sus luchas?",
              opciones: [
                "La libertad de los pueblos americanos",
                "El control del comercio con España",
                "El poder político en Europa",
                "El descubrimiento de nuevas tierras",
              ],
              correcta: 0,
            },
            {
              texto: "¿Dónde se reunieron por primera vez Simón Bolívar y José de San Martín?",
              opciones: ["En Guayaquil", "En Lima", "En Ayacucho", "En Quito"],
              correcta: 0,
            },
            {
              texto: "¿Qué simboliza el 'sueño de los libertadores'?",
              opciones: [
                "La unión y libertad de los pueblos de América del Sur",
                "La creación de nuevos imperios",
                "La independencia solo del Perú",
                "Una competencia militar entre los héroes",
              ],
              correcta: 0,
            },
            {
              texto: "¿Qué país liberó José de San Martín antes de llegar al Perú?",
              opciones: ["Chile", "Colombia", "Venezuela", "Ecuador"],
              correcta: 0,
            },
            {
              texto: "¿Qué país liberó Simón Bolívar antes de ayudar al Perú?",
              opciones: ["Venezuela", "Chile", "Argentina", "Brasil"],
              correcta: 0,
            },
            {
              texto: "¿Qué enseñan Bolívar y San Martín a las futuras generaciones?",
              opciones: [
                "A luchar por la libertad y la unión de los pueblos",
                "A conquistar más territorios",
                "A seguir las órdenes de los reyes",
                "A olvidar la historia del Perú",
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
                <h4>🎉 ¡Felicidades! Has completado el juego de la Promesa de Bolívar.</h4>
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

        return (
          <>
            <h3>JUEGO DE PREGUNTAS SOBRE {periodo}</h3>
            <p>¡Aprende mientras te diviertes con la Promesa de Bolívar!</p>
            <Quizz10 />
          </>
        );


      default:
        return <p>Juego no disponible para este período.</p>;
    }
  };

  const cerrarModal = () => setModalVisible(false);

  const periodos = [
    "EL SUEÑO DE DON JOSE DE SAN MARTIN",
    "La promesa de Simón Bolívar",
    "El viaje de la bandera peruana",
    "El Perú",
    "El sueño de los libertadores",
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