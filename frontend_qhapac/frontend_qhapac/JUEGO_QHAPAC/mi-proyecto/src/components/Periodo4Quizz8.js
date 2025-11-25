import React, { useState, useEffect } from "react";

// ===============================
//  PREGUNTAS DEL NIVEL 4 (CONQUISTA INCA)
// ===============================
const preguntasNivel8 = [
  {
    pregunta: "¿Cuántas regiones naturales tiene el Perú?",
    opciones: ["Dos", "Tres", "Cuatro", "Cinco"],
    correcta: 1,
  },
  {
    pregunta: "¿Cuáles son las tres regiones naturales del Perú?",
    opciones: [
      "Costa, Sierra y Selva",
      "Norte, Sur y Centro",
      "Desierto, Mar y Bosque",
      "Montaña, Valle y Costa",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué caracteriza a la región de la costa?",
    opciones: [
      "Es una zona desértica junto al mar",
      "Tiene grandes nevados",
      "Está cubierta de selva y ríos",
      "Es la región más fría del Perú",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Cuál es el animal representativo de la sierra?",
    opciones: ["El gallito de las rocas", "La vicuña", "El delfín rosado", "El cóndor de la selva"],
    correcta: 1,
  },
  {
    pregunta: "¿Cuál es el animal representativo de la selva peruana?",
    opciones: ["El cóndor", "El puma", "El gallito de las rocas", "El oso de anteojos"],
    correcta: 2,
  },
  {
    pregunta: "¿Qué tipo de clima tiene la selva?",
    opciones: [
      "Cálido y lluvioso",
      "Frío y seco",
      "Ventoso y templado",
      "Nevado todo el año",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué actividad económica es importante en la costa peruana?",
    opciones: [
      "La pesca y la agricultura",
      "La minería de oro",
      "La tala de árboles",
      "El turismo de montaña",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué región del Perú es conocida por su gran biodiversidad?",
    opciones: ["Costa", "Sierra", "Selva", "Altiplano"],
    correcta: 2,
  },
  {
    pregunta: "¿Qué civilización antigua se desarrolló en gran parte de la sierra?",
    opciones: ["Los Incas", "Los Mayas", "Los Aztecas", "Los Moche"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué característica distingue a la sierra peruana?",
    opciones: [
      "Presencia de cordilleras y altiplanos",
      "Grandes bosques tropicales",
      "Playas extensas",
      "Llanuras sin montañas"
    ],
    correcta: 0,
  },
];

// ===============================
//     COMPONENTE NIVEL 4
// ===============================
export default function Quizz8() {
  const [actual, setActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [registro, setRegistro] = useState(null);

  const seleccionarRespuesta = (index) => {
    if (registro && registro.partidasJugadas >= 3) return;

    if (index === preguntasNivel8[actual].correcta) {
      setPuntaje(puntaje + 1);
    }

    if (actual + 1 < preguntasNivel8.length) {
      setActual(actual + 1);
    } else {
      const puntajeFinal =
        index === preguntasNivel8[actual].correcta ? puntaje + 1 : puntaje;

      procesarResultado(puntajeFinal);
      setPuntaje(puntajeFinal);
      setFinalizado(true);
    }
  };

  const procesarResultado = async (puntajeFinal) => {
    const nota = puntajeFinal * 2;

    if (registro) {
      if (registro.partidasJugadas >= 3) return;
      if (nota <= registro.notaPromedio) return;

      const data = {
        idEstadisticaNivel: registro.idEstadisticaNivel,
        nivel: { idNivel: 8 },
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
        nivel: { idNivel: 8 },
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

    const existente = json.find((e) => e.nivel?.idNivel === 8);
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
              Pregunta {actual + 1} de {preguntasNivel8.length}
            </h2>

            <p className="mb-4">{preguntasNivel8[actual].pregunta}</p>

            {preguntasNivel8[actual].opciones.map((op, i) => (
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
              Puntaje: {puntaje} / {preguntasNivel8.length}
            </p>
            <p className="text-lg font-bold">Nota final: {puntaje * 2} / 20</p>

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
