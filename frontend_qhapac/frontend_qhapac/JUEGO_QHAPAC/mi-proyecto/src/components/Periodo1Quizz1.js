import React, { useState, useEffect } from "react";

// ===============================
//  PREGUNTAS DEL NIVEL 1 (CARAL)
// ===============================
const preguntasNivel1 = [
  {
    pregunta: "¿Dónde se desarrolló la cultura Caral?",
    opciones: [
      "En el valle de Supe",
      "En el valle del Mantaro",
      "En la costa sur",
      "En la selva central",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué es considerado uno de los mayores aportes de Caral?",
    opciones: [
      "El descubrimiento del hierro",
      "La construcción de pirámides",
      "El uso de quipus",
      "El cultivo de papa",
    ],
    correcta: 2,
  },
  {
    pregunta: "¿Qué antigüedad aproximada tiene Caral?",
    opciones: ["2,000 años", "5,000 años", "500 años", "1,000 años"],
    correcta: 1,
  },
  {
    pregunta: "Caral es considerada:",
    opciones: [
      "La civilización más antigua de América",
      "La primera cultura inca",
      "Una cultura guerrera",
      "Una ciudad colonial antigua",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué tipo de sociedad tenía Caral?",
    opciones: [
      "Militarista",
      "Agrícola y pacífica",
      "Conquistadora",
      "Basada en la guerra",
    ],
    correcta: 1,
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
