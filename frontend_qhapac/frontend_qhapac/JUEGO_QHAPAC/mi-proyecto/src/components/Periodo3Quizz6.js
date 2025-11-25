import React, { useState, useEffect } from "react";

// ===============================
//  PREGUNTAS DEL NIVEL 6 
// ===============================
const preguntasNivel6 = [
  {
    pregunta: "¿Quién creó la primera bandera del Perú?",
    opciones: [
      "José de San Martín",
      "Simón Bolívar",
      "Ramón Castilla",
      "Miguel Grau",
    ],
    orrecta: 0,
  },
  {
    pregunta: "¿En qué año se proclamó la independencia del Perú?",
    opciones: ["1810", "1820", "1821", "1824"],
    correcta: 2,
  },
  {
    pregunta: "¿En qué lugar fue proclamada la independencia del Perú?",
    opciones: [
      "En la Plaza Mayor de Lima",
      "En el Cusco",
      "En Ayacucho",
      "En Paracas",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Dónde fue izada por primera vez la bandera del Perú?",
    opciones: [
      "En la bahía de Paracas",
      "En la Plaza Mayor de Lima",
      "En el Callao",
      "En Trujillo",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué simboliza el color rojo en la bandera del Perú?",
    opciones: [
      "La sangre de los héroes que lucharon por la independencia",
      "La amistad entre los pueblos",
      "La belleza de las flores peruanas",
      "El color del cielo al amanecer",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué simboliza el color blanco en la bandera del Perú?",
    opciones: [
      "La pureza y la paz alcanzada tras la independencia",
      "La nieve de los Andes",
      "La unión con España",
      "La riqueza del mar peruano",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué representa 'El viaje de la bandera peruana' en la historia?",
    opciones: [
      "El recorrido del símbolo patrio acompañando la independencia del Perú",
      "Un desfile militar moderno",
      "Un viaje imaginario por América",
      "Una historia sobre el mar peruano",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿De qué ave se inspiró San Martín para elegir los colores de la bandera?",
    opciones: ["Del cóndor", "De las parihuanas", "Del gallito de las rocas", "Del pelícano"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué representa la bandera peruana para el pueblo a lo largo de la historia?",
    opciones: [
      "Un símbolo de identidad y unión nacional",
      "Un mapa del territorio peruano",
      "Un emblema religioso",
      "Un símbolo usado solo en batallas"
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué ha ocurrido con la bandera peruana a lo largo del tiempo?",
    opciones: [
      "Ha tenido varias modificaciones antes de llegar al diseño actual",
      "Siempre ha sido igual desde su creación",
      "Cambió solo una vez durante la Guerra del Pacífico",
      "Fue reemplazada por un símbolo distinto por muchos años"
    ],
    correcta: 0,
  },
];
  
// ===============================
//     COMPONENTE NIVEL 4
// ===============================
export default function Quizz6() {
  const [actual, setActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [registro, setRegistro] = useState(null);

  const seleccionarRespuesta = (index) => {
    if (registro && registro.partidasJugadas >= 3) return;

    if (index === preguntasNivel6[actual].correcta) {
      setPuntaje(puntaje + 1);
    }

    if (actual + 1 < preguntasNivel6.length) {
      setActual(actual + 1);
    } else {
      const puntajeFinal =
        index === preguntasNivel6[actual].correcta ? puntaje + 1 : puntaje;

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
        nivel: { idNivel: 6 },
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
        nivel: { idNivel: 6 },
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

    const existente = json.find((e) => e.nivel?.idNivel === 6);
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
              Pregunta {actual + 1} de {preguntasNivel6.length}
            </h2>

            <p className="mb-4">{preguntasNivel6[actual].pregunta}</p>

            {preguntasNivel6[actual].opciones.map((op, i) => (
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
              Puntaje: {puntaje} / {preguntasNivel6.length}
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
