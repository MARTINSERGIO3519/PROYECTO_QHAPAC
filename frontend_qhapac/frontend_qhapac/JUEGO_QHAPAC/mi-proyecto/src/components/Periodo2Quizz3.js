import React, { useState, useEffect } from "react";

// ===============================
//  PREGUNTAS DEL NIVEL 3 (INICIOS DEL INCA)
// ===============================
const preguntasNivel3 = [
  {
    pregunta: "¿Quién fue el primer emperador inca?",
    opciones: ["Pachacútec", "Manco Cápac", "Atahualpa", "Túpac Yupanqui"],
    correcta: 1,
  },
  {
    pregunta: "¿Cuál era la capital del Imperio Inca?",
    opciones: ["Cusco", "Lima", "Quito", "Chan Chan"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué sistema utilizaban para registrar información?",
    opciones: ["Quipus", "Jeroglíficos", "Tablillas de barro", "Piedras grabadas"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué estructura era característica de la arquitectura inca?",
    opciones: ["Muro de piedra perfectamente encajada", "Pirámide escalonada", "Templo redondo", "Palacio de madera"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué territorio abarcaba el Imperio Inca en su apogeo?",
    opciones: [
      "Solo el valle del Cusco",
      "Gran parte de la costa peruana",
      "Actual Perú, Bolivia, Ecuador, Chile y Argentina",
      "Solo el sur de Perú",
    ],
    correcta: 2,
  },
];

// ===============================
//     COMPONENTE NIVEL 3
// ===============================
export default function Quizz3() {
  const [actual, setActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [registro, setRegistro] = useState(null);

  // ---------------------------------
  //  Seleccionar respuesta del quiz
  // ---------------------------------
  const seleccionarRespuesta = (index) => {
    if (registro && registro.partidasJugadas >= 3) return;

    if (index === preguntasNivel3[actual].correcta) {
      setPuntaje(puntaje + 1);
    }

    if (actual + 1 < preguntasNivel3.length) {
      setActual(actual + 1);
    } else {
      const puntajeFinal =
        index === preguntasNivel3[actual].correcta ? puntaje + 1 : puntaje;

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
        nivel: { idNivel: 3 },
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
        nivel: { idNivel: 3 },
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

    const existente = json.find((e) => e.nivel?.idNivel === 3);
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
              Pregunta {actual + 1} de {preguntasNivel3.length}
            </h2>

            <p className="mb-4">{preguntasNivel3[actual].pregunta}</p>

            {preguntasNivel3[actual].opciones.map((op, i) => (
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
              Puntaje: {puntaje} / {preguntasNivel3.length}
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
