import React, { useState, useEffect } from "react";

// ===============================
//  PREGUNTAS DEL NIVEL 4 (CONQUISTA INCA)
// ===============================
const preguntasNivel10 = [
  {
    pregunta: "¿Quiénes fueron los 'Libertadores' de América del Sur?",
    opciones: [
      "Simón Bolívar y José de San Martín",
      "Miguel Grau y Ramón Castilla",
      "Túpac Amaru y Micaela Bastidas",
      "Francisco Pizarro y Hernando de Soto",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué buscaban Bolívar y San Martín con sus luchas?",
    opciones: [
      "La libertad de los pueblos americanos",
      "El control del comercio con España",
      "El poder político en Europa",
      "El descubrimiento de nuevas tierras",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Dónde se reunieron por primera vez Simón Bolívar y José de San Martín?",
    opciones: ["En Guayaquil", "En Lima", "En Ayacucho", "En Quito"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué simboliza el 'sueño de los libertadores'?",
    opciones: [
      "La unión y libertad de los pueblos de América del Sur",
      "La creación de nuevos imperios",
      "Una competencia militar entre los héroes",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué país liberó José de San Martín antes de llegar al Perú?",
    opciones: ["Chile", "Colombia", "Venezuela", "Ecuador"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué país liberó Simón Bolívar antes de ayudar al Perú?",
    opciones: ["Venezuela", "Chile", "Argentina", "Brasil"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué enseñan Bolívar y San Martín a las futuras generaciones?",
    opciones: [
      "A luchar por la libertad y la unión de los pueblos",
      "A conquistar más territorios",
      "A seguir las órdenes de los reyes",
      "A olvidar la historia del Perú",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué batalla consolidó definitivamente la independencia de América del Sur?",
    opciones: ["Ayacucho", "Junín", "Maipú", "Pichincha"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué ideal compartían tanto San Martín como Bolívar?",
    opciones: [
      "La creación de naciones libres y soberanas",
      "La expansión territorial hacia Europa",
      "El establecimiento de un solo rey en América",
      "El control exclusivo del comercio marítimo"
    ],
   correcta: 0,
  },
  {
    pregunta: "¿Qué representación tiene el legado de los libertadores en la historia?",
    opciones: [
      "El esfuerzo conjunto por formar países independientes",
      "Una competencia militar entre caudillos",
      "La búsqueda de riquezas personales",
      "Un mito sin importancia histórica",
    ],
    correcta: 0,
  },
];

// ===============================
//     COMPONENTE NIVEL 4
// ===============================
export default function Quizz10() {
  const [actual, setActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [registro, setRegistro] = useState(null);

  const seleccionarRespuesta = (index) => {
    if (registro && registro.partidasJugadas >= 3) return;

    if (index === preguntasNivel10[actual].correcta) {
      setPuntaje(puntaje + 1);
    }

    if (actual + 1 < preguntasNivel10.length) {
      setActual(actual + 1);
    } else {
      const puntajeFinal =
        index === preguntasNivel10[actual].correcta ? puntaje + 1 : puntaje;

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
        nivel: { idNivel: 10 },
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
        nivel: { idNivel: 10 },
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

    const existente = json.find((e) => e.nivel?.idNivel === 10);
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
              Pregunta {actual + 1} de {preguntasNivel10.length}
            </h2>

            <p className="mb-4">{preguntasNivel10[actual].pregunta}</p>

            {preguntasNivel10[actual].opciones.map((op, i) => (
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
              Puntaje: {puntaje} / {preguntasNivel10.length}
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
