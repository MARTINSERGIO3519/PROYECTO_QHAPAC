import React, { useState, useEffect } from "react";
import { authGet, authPost, authPut } from "../utils/api";

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

export default function Quizz8() {
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
      const existente = json.find((e) => e.nivel?.idNivel === 8);
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

    const nuevaPuntuacion = index === preguntasNivel8[actual].correcta ? puntaje + 1 : puntaje;

    if (actual + 1 < preguntasNivel8.length) {
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
        nivel: { idNivel: 8 },
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
        nivel: { idNivel: 8 },
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
              Pregunta {actual + 1} de {preguntasNivel8.length}
            </h2>

            <p className="mb-4 text-lg">{preguntasNivel8[actual].pregunta}</p>

            {preguntasNivel8[actual].opciones.map((op, i) => (
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
              <p className="text-lg font-semibold">Puntaje: {puntaje} / {preguntasNivel8.length}</p>
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