import React, { useState, useEffect } from "react";
import { authGet, authPost, authPut } from "../utils/api";

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

export default function Quizz10() {
  const [actual, setActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [registro, setRegistro] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const cargarRegistro = async () => {
    try {
      setError("");
      const res = await authGet("http://localhost:8090/api/estadistica-nivel");
      
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }

      const json = await res.json();
      const existente = json.find((e) => e.nivel?.idNivel === 10);
      setRegistro(existente || null);
    } catch (error) {
      console.error("❌ Error cargando registro:", error);
      if (error.message === 'Authentication failed') {
        setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
      } else {
        setError(`Error al cargar el registro: ${error.message}`);
      }
    }
  };

  const seleccionarRespuesta = async (index) => {
    if (registro && registro.partidasJugadas >= 3) return;

    const nuevaPuntuacion = index === preguntasNivel10[actual].correcta ? puntaje + 1 : puntaje;

    if (actual + 1 < preguntasNivel10.length) {
      setPuntaje(nuevaPuntuacion);
      setActual(actual + 1);
    } else {
      setLoading(true);
      try {
        await procesarResultado(nuevaPuntuacion);
        setPuntaje(nuevaPuntuacion);
        setFinalizado(true);
      } catch (error) {
        console.error("❌ Error procesando resultado:", error);
        setError("Error al guardar el resultado. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    }
  };

  const procesarResultado = async (puntajeFinal) => {
    const nota = puntajeFinal * 2;

    if (registro) {
      if (registro.partidasJugadas >= 3) {
        throw new Error("Máximo de intentos alcanzado");
      }

      const data = {
        idEstadisticaNivel: registro.idEstadisticaNivel,
        nivel: { idNivel: 10 },
        notaPromedio: nota,
        fecha: new Date().toISOString().split("T")[0],
        partidasJugadas: registro.partidasJugadas + 1,
      };

      const res = await authPut("http://localhost:8090/api/estadistica-nivel/update", data);
      
      if (!res.ok) {
        throw new Error(`Error actualizando: ${res.status}`);
      }

      const updatedRegistro = await res.json();
      setRegistro(updatedRegistro);
    } else {
      const data = {
        nivel: { idNivel: 10 },
        notaPromedio: nota,
        fecha: new Date().toISOString().split("T")[0],
        partidasJugadas: 1,
      };

      const res = await authPost("http://localhost:8090/api/estadistica-nivel/save", data);
      
      if (!res.ok) {
        throw new Error(`Error guardando: ${res.status}`);
      }

      const nuevoRegistro = await res.json();
      setRegistro(nuevoRegistro);
    }
  };

  useEffect(() => {
    cargarRegistro();
  }, []);

  const bloqueado = registro?.partidasJugadas >= 3;

  const reiniciarQuiz = () => {
    setActual(0);
    setPuntaje(0);
    setFinalizado(false);
    setError("");
  };

  return (
    <div className="p-6">
      <div className="bg-white p-5 rounded-xl shadow max-w-xl mx-auto">
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {bloqueado && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">¡Nivel completado!</p>
            <p>Ya no puedes jugar este nivel (3 intentos alcanzados)</p>
            <p className="mt-2">Tu mejor nota: {registro?.notaPromedio || 0}/20</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-3">Guardando resultado...</p>
          </div>
        ) : !finalizado && !bloqueado ? (
          <>
            <h2 className="text-xl font-bold mb-4">
              Pregunta {actual + 1} de {preguntasNivel10.length}
            </h2>

            <p className="mb-4 text-lg">{preguntasNivel10[actual].pregunta}</p>

            {preguntasNivel10[actual].opciones.map((op, i) => (
              <button
                key={i}
                className="block w-full p-3 mb-2 bg-blue-200 hover:bg-blue-300 rounded transition duration-200"
                onClick={() => seleccionarRespuesta(i)}
                disabled={loading}
              >
                {op}
              </button>
            ))}

            {registro && (
              <div className="mt-4 p-3 bg-gray-100 rounded">
                <p className="text-sm">
                  Intentos: {registro.partidasJugadas}/3 - Mejor nota: {registro.notaPromedio}/20
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">¡Quiz finalizado!</h2>

            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              <p className="text-lg font-semibold">Puntaje: {puntaje} / {preguntasNivel10.length}</p>
              <p className="text-xl font-bold">Nota final: {puntaje * 2} / 20</p>
            </div>

            {!bloqueado && (
              <button
                onClick={reiniciarQuiz}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded mt-4"
              >
                Intentar de nuevo
              </button>
            )}

            {bloqueado && (
              <p className="text-red-500 mt-4 font-semibold">
                ¡Has completado este nivel! No puedes volver a jugar.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}