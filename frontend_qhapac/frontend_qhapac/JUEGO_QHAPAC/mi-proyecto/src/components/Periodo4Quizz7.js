import React, { useState, useEffect } from "react";

// ===============================
//  PREGUNTAS DEL NIVEL 4 (CONQUISTA INCA)
// ===============================
const preguntasNivel7 = [
  {
    pregunta: "¿Qué tipo de riqueza destaca el Perú según el texto?",
    opciones: [
      "Tecnológica",
      "Cultural e histórica",
      "Económica exclusivamente",
      "Industrial"
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué civilizaciones milenarias se mencionan del Perú?",
    opciones: [
      "Mayas y Aztecas",
      "Mochica, Chavín y Wari",
      "Incas, Nazca y Moche",
      "Olmecas y Toltecas"
    ],
    correcta: 2,
  },
  {
    pregunta: "¿En qué año se independizó el Perú?",
    opciones: [
      "1821",
      "1800",
      "1901",
      "1780"
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué caracteriza la identidad peruana según el texto?",
    opciones: [
      "Solo costumbres modernas",
      "Tradiciones ancestrales mezcladas con influencias modernas",
      "Únicamente herencia colonial",
      "Costumbres importadas de Europa"
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué regiones geográficas conforman el Perú?",
    opciones: [
      "Selva y desierto",
      "Altiplano y costa",
      "Costa, sierra y selva",
      "Meseta y tundra"
    ],
    correcta: 2,
  },
];

// ===============================
//     COMPONENTE NIVEL 4
// ===============================
export default function Quizz7() {
  const [actual, setActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [registro, setRegistro] = useState(null);

  const seleccionarRespuesta = (index) => {
    if (registro && registro.partidasJugadas >= 3) return;

    if (index === preguntasNivel7[actual].correcta) {
      setPuntaje(puntaje + 1);
    }

    if (actual + 1 < preguntasNivel7.length) {
      setActual(actual + 1);
    } else {
      const puntajeFinal =
        index === preguntasNivel7[actual].correcta ? puntaje + 1 : puntaje;

      procesarResultado(puntajeFinal);
      setPuntaje(puntajeFinal);
      setFinalizado(true);
    }
  };

  const procesarResultado = async (puntajeFinal) => {
    const nota = puntajeFinal * 4;

    if (registro) {
      if (registro.partidasJugadas >= 3) return;
      if (nota <= registro.notaPromedio) return;

      const data = {
        idEstadisticaNivel: registro.idEstadisticaNivel,
        nivel: { idNivel: 7 },
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
        nivel: { idNivel: 7 },
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

  const cargarRegistro = async () => {
    const res = await fetch("http://localhost:8090/api/estadistica-nivel");
    const json = await res.json();

    const existente = json.find((e) => e.nivel?.idNivel === 7);
    setRegistro(existente || null);
  };

  useEffect(() => {
    cargarRegistro();
  }, []);

  const bloqueado = registro?.partidasJugadas >= 3;

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
              Pregunta {actual + 1} de {preguntasNivel7.length}
            </h2>

            <p className="mb-4">{preguntasNivel7[actual].pregunta}</p>

            {preguntasNivel7[actual].opciones.map((op, i) => (
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
              Puntaje: {puntaje} / {preguntasNivel7.length}
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
