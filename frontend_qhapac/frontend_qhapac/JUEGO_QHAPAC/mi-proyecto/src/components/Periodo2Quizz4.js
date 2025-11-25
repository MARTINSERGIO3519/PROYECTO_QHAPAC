import React, { useState, useEffect } from "react";

// ===============================
//  PREGUNTAS DEL NIVEL 4 
// ===============================
const preguntasNivel4 = [
  {
    pregunta: "¿De qué país era originario Simón Bolívar?",
    opciones: ["Venezuela", "Colombia", "Perú", "Argentina"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué prometió Bolívar en el Monte Sacro?",
    opciones: [
      "Liberar a América del yugo español",
      "Ser presidente de Venezuela",
      "Construir una gran ciudad",
      "Viajar por todo el mundo",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿En qué año hizo Bolívar su famosa promesa?",
    opciones: ["1805", "1810", "1815", "1820"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué batalla consolidó la independencia de Perú?",
    opciones: ["Ayacucho", "Junín", "Boyacá", "Carabobo"],
    correcta: 0,
  },
  {
    pregunta: "¿Cómo se llamaba el ejército liderado por Bolívar?",
    opciones: ["Ejército Libertador", "Ejército Unido", "Gran Colombia", "Ejército Real"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué título recibió Bolívar?",
    opciones: ["El Libertador", "El Protector", "El Presidente", "El General"],
    correcta: 0,
  },
  {
    pregunta: "¿En qué ciudad murió Bolívar?",
    opciones: ["Santa Marta", "Caracas", "Bogotá", "Lima"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué países liberó Bolívar?",
    opciones: ["Venezuela, Colombia, Ecuador, Perú", "Argentina, Chile, Perú", "México, Perú", "Brasil, Uruguay"],
    correcta: 0,
  },
  {
    pregunta: "¿En qué año murió Bolívar?",
    opciones: ["1830", "1825", "1840", "1850"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué idea política defendía Bolívar?",
    opciones: ["La Gran Colombia", "El Imperio Americano", "La Monarquía", "El Comunismo"],
    correcta: 0,
  },
];

// ===============================
//     COMPONENTE NIVEL 4
// ===============================
export default function Quizz4() {
  const [actual, setActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [registro, setRegistro] = useState(null);

  const seleccionarRespuesta = (index) => {
    if (registro && registro.partidasJugadas >= 3) return;

    if (index === preguntasNivel4[actual].correcta) {
      setPuntaje(puntaje + 1);
    }

    if (actual + 1 < preguntasNivel4.length) {
      setActual(actual + 1);
    } else {
      const puntajeFinal =
        index === preguntasNivel4[actual].correcta ? puntaje + 1 : puntaje;

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
        nivel: { idNivel: 4 },
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
        nivel: { idNivel: 4 },
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

    const existente = json.find((e) => e.nivel?.idNivel === 4);
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
              Pregunta {actual + 1} de {preguntasNivel4.length}
            </h2>

            <p className="mb-4">{preguntasNivel4[actual].pregunta}</p>

            {preguntasNivel4[actual].opciones.map((op, i) => (
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
              Puntaje: {puntaje} / {preguntasNivel4.length}
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
