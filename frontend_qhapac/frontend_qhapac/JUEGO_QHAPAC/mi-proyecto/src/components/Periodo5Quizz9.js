import React, { useState, useEffect } from "react";
import { authGet, authPost, authPut } from "../utils/api";

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

export default function Quizz9() {
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
      const existente = json.find((e) => e.nivel?.idNivel === 9);
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

    const nuevaPuntuacion = index === preguntasNivel9[actual].correcta ? puntaje + 1 : puntaje;

    if (actual + 1 < preguntasNivel9.length) {
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
    const nota = puntajeFinal * 4;

    if (registro) {
      if (registro.partidasJugadas >= 3) {
        throw new Error("Máximo de intentos alcanzado");
      }

      const data = {
        idEstadisticaNivel: registro.idEstadisticaNivel,
        nivel: { idNivel: 9 },
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
        nivel: { idNivel: 9 },
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
              Pregunta {actual + 1} de {preguntasNivel9.length}
            </h2>

            <p className="mb-4 text-lg">{preguntasNivel9[actual].pregunta}</p>

            {preguntasNivel9[actual].opciones.map((op, i) => (
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
              <p className="text-lg font-semibold">Puntaje: {puntaje} / {preguntasNivel9.length}</p>
              <p className="text-xl font-bold">Nota final: {puntaje * 4} / 20</p>
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