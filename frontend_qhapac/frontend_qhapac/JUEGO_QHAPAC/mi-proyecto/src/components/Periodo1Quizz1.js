import React, { useState, useEffect } from "react";

// ===============================
//  PREGUNTAS DEL NIVEL 1 (CARAL)
// ===============================
const preguntasNivel1 = [
  {
    pregunta: "¿En qué fecha desembarcó José de San Martín en la bahía de Paracas?",
    opciones: [
      "28 de julio de 1821",
      "8 de septiembre de 1820",
      "9 de diciembre de 1824",
      "1 de enero de 1820"
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Dónde se recostó José de San Martín para descansar?",
    opciones: [
      "A la orilla del mar",
      "Bajo una roca",
      "A la sombra de una palmera",
      "Dentro de una tienda militar"
    ],
    correcta: 2,
  },
  {
    pregunta: "¿Qué visualizó San Martín mientras dormía?",
    opciones: [
      "Un ejército enemigo acercándose",
      "Un país libre y próspero",
      "El escudo del Perú",
      "La firma de la independencia"
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué aves vio San Martín al despertar?",
    opciones: [
      "Aves de alas rojas y pechos blancos",
      "Cóndores y gaviotas",
      "Aves con alas negras",
      "Flamencos rosados"
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué inspiró a San Martín a crear la bandera del Perú?",
    opciones: [
      "El mar de Paracas",
      "La Expedición Libertadora",
      "La bandada de aves que vio al despertar",
      "Un sueño que tuvo en Argentina"
    ],
    correcta: 2,
  },
];

// ===============================
//     COMPONENTE NIVEL 1
// ===============================
export default function Quizz1() {
  const [actual, setActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [registro, setRegistro] = useState(null);

  // ---------------------------------
  //  Seleccionar respuesta del quiz
  // ---------------------------------
  const seleccionarRespuesta = (index) => {
    if (registro && registro.partidasJugadas >= 3) return; // BLOQUEO TOTAL

    if (index === preguntasNivel1[actual].correcta) {
      setPuntaje(puntaje + 1);
    }

    if (actual + 1 < preguntasNivel1.length) {
      setActual(actual + 1);
    } else {
      const puntajeFinal =
        index === preguntasNivel1[actual].correcta ? puntaje + 1 : puntaje;

      procesarResultado(puntajeFinal);
      setPuntaje(puntajeFinal);
      setFinalizado(true);
    }
  };

  // ---------------------------------
  //  GUARDAR O ACTUALIZAR RESULTADO
  // ---------------------------------
  const procesarResultado = async (puntajeFinal) => {
    const nota = puntajeFinal * 4;

    // Si ya existe → actualizar
    if (registro) {
      if (registro.partidasJugadas >= 3) return; // Máximo 3 intentos
      if (nota <= registro.notaPromedio) return; // Solo si mejora

      const data = {
        idEstadisticaNivel: registro.idEstadisticaNivel,
        nivel: { idNivel: 1 },
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
      // Primera vez → guardar
      const data = {
        nivel: { idNivel: 1 },
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
  //  Cargar registro del nivel 1
  // ---------------------------------
  const cargarRegistro = async () => {
    const res = await fetch("http://localhost:8090/api/estadistica-nivel");
    const json = await res.json();

    const existente = json.find((e) => e.nivel?.idNivel === 1);
    setRegistro(existente || null);
  };

  useEffect(() => {
    cargarRegistro();
  }, []);

  // -------------------------------
  // BLOQUEO DE INTERFAZ COMPLETO
  // -------------------------------
  const bloqueado = registro?.partidasJugadas >= 3;

  // ===============================
  //           INTERFAZ
  // ===============================
  return (
    <div className="p-6">

      <div className="bg-white p-5 rounded-xl shadow max-w-xl mx-auto">
        {/* Mensaje si está bloqueado */}
        {bloqueado && (
          <p className="text-red-600 font-bold text-center mb-4">
            Ya no puedes jugar este nivel (3 intentos alcanzados)
          </p>
        )}

        {!finalizado && !bloqueado ? (
          <>
            <h2 className="text-xl font-bold mb-4">
              Pregunta {actual + 1} de {preguntasNivel1.length}
            </h2>

            <p className="mb-4">{preguntasNivel1[actual].pregunta}</p>

            {preguntasNivel1[actual].opciones.map((op, i) => (
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

            <p className="mt-2 text-lg">Puntaje: {puntaje} / 5</p>
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
