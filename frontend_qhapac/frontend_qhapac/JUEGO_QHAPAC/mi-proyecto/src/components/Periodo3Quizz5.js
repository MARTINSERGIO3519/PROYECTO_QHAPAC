import React, { useState, useEffect } from "react";

// ===============================
//  PREGUNTAS DEL NIVEL 4 (CONQUISTA INCA)
// ===============================
const preguntasNivel5 = [
  {
    pregunta: "¿Quién creó la primera versión de la bandera peruana?",
    opciones: [
      "Simón Bolívar",
      "José de San Martín",
      "Miguel Grau",
      "Francisco Bolognesi"
    ],
    correcta: 1,
  },
  {
    pregunta: "¿En qué se inspiraron los colores rojo y blanco de la bandera peruana?",
    opciones: [
      "En una montaña nevada",
      "En el cielo y el mar",
      "En las parihuanas",
      "En un escudo antiguo"
    ],
    correcta: 2,
  },
  {
    pregunta: "¿Qué ocurrió con la bandera peruana después de su creación?",
    opciones: [
      "Se mantuvo igual desde el inicio",
      "Pasó por varias modificaciones",
      "Fue reemplazada por otra bandera",
      "No se usó durante muchos años"
    ],
    correcta: 1,
  },
  {
    pregunta: "¿En qué momentos históricos ha ondeado la bandera peruana?",
    opciones: [
      "Solo en desfiles escolares",
      "Solo en celebraciones deportivas",
      "En batallas históricas y ceremonias oficiales",
      "Solo en eventos religiosos"
    ],
    correcta: 2,
  },
  {
    pregunta: "¿Qué representa la bandera peruana para el pueblo?",
    opciones: [
      "La identidad del pueblo peruano",
      "La historia de España",
      "La cultura europea",
      "El clima del país"
    ],
    correcta: 0,
  },
];

// ===============================
//     COMPONENTE NIVEL 4
// ===============================
export default function Quizz5() {
  const [actual, setActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [registro, setRegistro] = useState(null);

  const seleccionarRespuesta = (index) => {
    if (registro && registro.partidasJugadas >= 3) return;

    if (index === preguntasNivel5[actual].correcta) {
      setPuntaje(puntaje + 1);
    }

    if (actual + 1 < preguntasNivel5.length) {
      setActual(actual + 1);
    } else {
      const puntajeFinal =
        index === preguntasNivel5[actual].correcta ? puntaje + 1 : puntaje;

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
        nivel: { idNivel: 5 },
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
        nivel: { idNivel: 5 },
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

    const existente = json.find((e) => e.nivel?.idNivel === 5);
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
              Pregunta {actual + 1} de {preguntasNivel5.length}
            </h2>

            <p className="mb-4">{preguntasNivel5[actual].pregunta}</p>

            {preguntasNivel5[actual].opciones.map((op, i) => (
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
              Puntaje: {puntaje} / {preguntasNivel5.length}
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
