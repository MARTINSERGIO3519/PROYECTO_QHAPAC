import React, { useState, useEffect } from "react";

// ===============================
//  PREGUNTAS DEL NIVEL 2 (CHAVÍN)
// ===============================
const preguntasNivel2 = [
  {
    pregunta: "¿Dónde se ubicó el centro principal de la cultura Chavín?",
    opciones: [
      "Chavín de Huántar, en Áncash",
      "Cusco",
      "Chan Chan, La Libertad",
      "Tiahuanaco"
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué famoso monolito representa a un ser mítico de la cultura Chavín?",
    opciones: [
      "El Lanzón Monolítico",
      "La Estela Raimondi",
      "El Obelisco Tello",
      "El Fraile"
    ],
    correcta: 0,
  },
  {
    pregunta: "La cultura Chavín es considerada:",
    opciones: [
      "La cultura madre del Perú",
      "La primera cultura costera",
      "La cultura del altiplano",
      "La última cultura preinca"
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué técnica arquitectónica destacaba en Chavín de Huántar?",
    opciones: [
      "Galerías subterráneas",
      "Construcción de pirámides",
      "Uso de adobe",
      "Murallas defensivas"
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué animal aparece frecuentemente en el arte Chavín?",
    opciones: [
      "El jaguar u otorongo",
      "La llama",
      "El cóndor",
      "El pez"
    ],
    correcta: 0,
  },
];

// ===============================
//     COMPONENTE NIVEL 2
// ===============================
export default function Quizz2() {
  const [actual, setActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [registro, setRegistro] = useState(null);

  // ---------------------------------
  //  Seleccionar respuesta del quiz
  // ---------------------------------
  const seleccionarRespuesta = (index) => {
    if (registro && registro.partidasJugadas >= 3) return; // BLOQUEO TOTAL

    if (index === preguntasNivel2[actual].correcta) {
      setPuntaje(puntaje + 1);
    }

    if (actual + 1 < preguntasNivel2.length) {
      setActual(actual + 1);
    } else {
      const puntajeFinal =
        index === preguntasNivel2[actual].correcta ? puntaje + 1 : puntaje;

      procesarResultado(puntajeFinal);
      setPuntaje(puntajeFinal);
      setFinalizado(true);
    }
  };

  // ---------------------------------
  //  GUARDAR O ACTUALIZAR RESULTADO
  // ---------------------------------
  const procesarResultado = async (puntajeFinal) => {
    const nota = puntajeFinal * 4; // cada correcta vale 4 puntos (máx: 20)

    if (registro) {
      if (registro.partidasJugadas >= 3) return;
      if (nota <= registro.notaPromedio) return;

      const data = {
        idEstadisticaNivel: registro.idEstadisticaNivel,
        nivel: { idNivel: 2 },
        notaPromedio: nota,
        fecha: new Date().toISOString().split("T")[0],
        partidasJugadas: registro.partidasJugadas + 1,
      };

      await fetch("http://localhost:8090/api/estadistica-nivel/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      const data = {
        nivel: { idNivel: 2 },
        notaPromedio: nota,
        fecha: new Date().toISOString().split("T")[0],
        partidasJugadas: 1,
      };

      await fetch("http://localhost:8090/api/estadistica-nivel/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
  };

  // ---------------------------------
  //  Cargar registro del nivel 2
  // ---------------------------------
  const cargarRegistro = async () => {
    const res = await fetch("http://localhost:8090/api/estadistica-nivel");
    const json = await res.json();

    const existente = json.find((e) => e.nivel?.idNivel === 2);
    setRegistro(existente || null);
  };

  useEffect(() => {
    cargarRegistro();
  }, []);

  const bloqueado = registro?.partidasJugadas >= 3;

  // ===============================
  //           INTERFAZ
  // ===============================
  return (
    <div className="p-6">
      <div className="bg-white p-5 rounded-xl shadow max-w-xl mx-auto">
        {bloqueado && (
          <p className="text-red-600 font-bold text-center mb-4">
            Ya no puedes jugar este nivel (3 intentos alcanzados)
          </p>
        )}

        {!finalizado && !bloqueado ? (
          <>
            <h2 className="text-xl font-bold mb-4">
              Pregunta {actual + 1} de {preguntasNivel2.length}
            </h2>

            <p className="mb-4">{preguntasNivel2[actual].pregunta}</p>

            {preguntasNivel2[actual].opciones.map((op, i) => (
              <button
                key={i}
                className="block w-full p-3 mb-2 bg-blue-200 hover:bg-blue-300 rounded"
                onClick={() => seleccionarRespuesta(i)}
              >
                {op}
              </button>
            ))}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold">¡Quiz finalizado!</h2>
            <p className="mt-2 text-lg">
              Puntaje: {puntaje} / {preguntasNivel2.length}
            </p>
            <p className="text-lg font-bold">Nota final: {puntaje * 4} / 20</p>

            {bloqueado && (
              <p className="text-red-500 mt-4">
                Ya no puedes volver a jugar (3 intentos máximo)
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
