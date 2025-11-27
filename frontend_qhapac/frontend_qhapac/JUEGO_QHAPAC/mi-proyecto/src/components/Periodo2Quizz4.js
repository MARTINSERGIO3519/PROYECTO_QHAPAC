import React, { useState, useEffect } from "react";
import { authGet, authPost, authPut } from "../utils/api";

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

export default function Quizz4() {
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
      const existente = json.find((e) => e.nivel?.idNivel === 4);
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

    const nuevaPuntuacion = index === preguntasNivel4[actual].correcta ? puntaje + 1 : puntaje;

    if (actual + 1 < preguntasNivel4.length) {
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
        nivel: { idNivel: 4 },
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
        nivel: { idNivel: 4 },
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
              Pregunta {actual + 1} de {preguntasNivel4.length}
            </h2>

            <p className="mb-4 text-lg">{preguntasNivel4[actual].pregunta}</p>

            {preguntasNivel4[actual].opciones.map((op, i) => (
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
              <p className="text-lg font-semibold">Puntaje: {puntaje} / {preguntasNivel4.length}</p>
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