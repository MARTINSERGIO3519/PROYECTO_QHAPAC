import React, { useState, useEffect } from "react";

// ===============================
//  PREGUNTAS DEL NIVEL 4 (CONQUISTA INCA)
// ===============================
const preguntasNivel9 = [
  {
    pregunta: "¿Qué sueño compartieron San Martín y Bolívar?",
    opciones: [
      "Unir a América con Europa",
      "Ver a América libre y soberana",
      "Formar un solo imperio americano",
      "Dominar políticamente el continente"
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Cómo se relacionaban las visiones de San Martín y Bolívar?",
    opciones: [
      "Eran completamente opuestas",
      "No tenían relación entre sí",
      "Se complementaron para lograr la independencia",
      "Eran idénticas en todo sentido"
    ],
    correcta: 2,
  },
  {
    pregunta: "¿Qué aspecto destaca el texto sobre el período de independencia?",
    opciones: [
      "La competencia militar entre los libertadores",
      "Cómo sus ideales y estrategias se entrelazaron",
      "El apoyo de Europa en las batallas",
      "La creación inmediata de un solo país"
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué lograron las acciones de San Martín y Bolívar según el texto?",
    opciones: [
      "La creación de un nuevo imperio español",
      "La independencia del continente",
      "Una alianza militar con Europa",
      "La división permanente de América"
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué se menciona sobre el legado de ambos libertadores?",
    opciones: [
      "Se olvidó con el paso del tiempo",
      "Solo es importante en sus países natales",
      "No tiene relevancia actual",
      "Perdura en la memoria histórica de los pueblos americanos"
    ],
    correcta: 3,
  },
];

// ===============================
//     COMPONENTE NIVEL 4
// ===============================
export default function Quizz9() {
  const [actual, setActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [registro, setRegistro] = useState(null);

  const seleccionarRespuesta = (index) => {
    if (registro && registro.partidasJugadas >= 3) return;

    if (index === preguntasNivel9[actual].correcta) {
      setPuntaje(puntaje + 1);
    }

    if (actual + 1 < preguntasNivel9.length) {
      setActual(actual + 1);
    } else {
      const puntajeFinal =
        index === preguntasNivel9[actual].correcta ? puntaje + 1 : puntaje;

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
        nivel: { idNivel: 9 },
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
        nivel: { idNivel: 9 },
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

    const existente = json.find((e) => e.nivel?.idNivel === 9);
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
              Pregunta {actual + 1} de {preguntasNivel9.length}
            </h2>

            <p className="mb-4">{preguntasNivel9[actual].pregunta}</p>

            {preguntasNivel9[actual].opciones.map((op, i) => (
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
              Puntaje: {puntaje} / {preguntasNivel9.length}
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
