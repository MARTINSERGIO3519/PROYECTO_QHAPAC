import React, { useState, useEffect } from "react";
import { authGet, authPost, authPut } from "../utils/api";

// ===============================
//  PREGUNTAS DEL NIVEL 2 (CHAVÍN)
// ===============================
const preguntasNivel2 = [
  {
    pregunta: "¿Dónde soñó José de San Martín con la bandera del Perú?",
    opciones: ["En Lima", "En Paracas", "En Mendoza", "En Buenos Aires"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué vio San Martín en su sueño que le dio una idea para la bandera?",
    opciones: [
      "Un arcoíris",
      "Unas aves llamadas parihuanas",
      "Una montaña nevada",
      "El mar azul y el cielo blanco",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿De qué colores eran las aves que inspiraron la bandera peruana?",
    opciones: [
      "Rojas y blancas",
      "Verdes y amarillas",
      "Azules y rojas",
      "Negras y grises",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué simboliza la bandera que soñó San Martín?",
    opciones: [
      "La libertad del Perú",
      "La fuerza del ejército",
      "La amistad con España",
      "La riqueza del país",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿En qué año tuvo su sueño en Paracas?",
    opciones: ["1810", "1815", "1820", "1825"],
    correcta: 2,
  },
  {
    pregunta: "¿Qué sintió San Martín al ver a las parihuanas volar?",
    opciones: [
      "Alegría y esperanza por la libertad",
      "Miedo a las aves",
      "Tristeza por el viaje",
      "Cansancio por el calor",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué nombre tienen las aves del sueño de San Martín?",
    opciones: ["Parihuanas", "Cóndores", "Gaviotas", "Flamencos"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué quería lograr San Martín con su sueño?",
    opciones: [
      "Liberar al Perú y traer libertad",
      "Hacer una gran fiesta",
      "Construir un castillo",
      "Vender banderas",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué parte del cuerpo de las parihuanas era blanca?",
    opciones: ["El pecho", "Las alas", "La cabeza", "Las patas"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué parte del cuerpo de las parihuanas era roja?",
    opciones: ["Las alas", "El pico", "Las patas", "El cuello"],
    correcta: 0,
  },
];

// ===============================
//     COMPONENTE NIVEL 2
// ===============================
export default function Quizz2() {
  const [actual, setActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [registro, setRegistro] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------------------------------
  //  Cargar registro del nivel 2
  // ---------------------------------
  const cargarRegistro = async () => {
    try {
      setError("");
      const res = await authGet("http://localhost:8090/api/estadistica-nivel");
      
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }

      const json = await res.json();
      const existente = json.find((e) => e.nivel?.idNivel === 2);
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

  // ---------------------------------
  //  Seleccionar respuesta del quiz
  // ---------------------------------
  const seleccionarRespuesta = async (index) => {
    if (registro && registro.partidasJugadas >= 3) return; // BLOQUEO TOTAL

    const nuevaPuntuacion = index === preguntasNivel2[actual].correcta ? puntaje + 1 : puntaje;

    if (actual + 1 < preguntasNivel2.length) {
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

  // ---------------------------------
  //  GUARDAR O ACTUALIZAR RESULTADO
  // ---------------------------------
  const procesarResultado = async (puntajeFinal) => {
    const nota = puntajeFinal * 2; // cada correcta vale 2 puntos (máx: 20)

    // Si ya existe → actualizar
    if (registro) {
      if (registro.partidasJugadas >= 3) {
        throw new Error("Máximo de intentos alcanzado");
      }

      const data = {
        idEstadisticaNivel: registro.idEstadisticaNivel,
        nivel: { idNivel: 2 },
        notaPromedio: nota,
        fecha: new Date().toISOString().split("T")[0],
        partidasJugadas: registro.partidasJugadas + 1,
      };

      const res = await authPut("http://localhost:8090/api/estadistica-nivel/update", data);
      
      if (!res.ok) {
        throw new Error(`Error actualizando: ${res.status}`);
      }

      // Actualizar el registro local
      const updatedRegistro = await res.json();
      setRegistro(updatedRegistro);
    } else {
      // Primera vez → guardar
      const data = {
        nivel: { idNivel: 2 },
        notaPromedio: nota,
        fecha: new Date().toISOString().split("T")[0],
        partidasJugadas: 1,
      };

      const res = await authPost("http://localhost:8090/api/estadistica-nivel/save", data);
      
      if (!res.ok) {
        throw new Error(`Error guardando: ${res.status}`);
      }

      // Establecer el nuevo registro
      const nuevoRegistro = await res.json();
      setRegistro(nuevoRegistro);
    }
  };

  useEffect(() => {
    cargarRegistro();
  }, []);

  // -------------------------------
  // BLOQUEO DE INTERFAZ COMPLETO
  // -------------------------------
  const bloqueado = registro?.partidasJugadas >= 3;

  // Reiniciar quiz
  const reiniciarQuiz = () => {
    setActual(0);
    setPuntaje(0);
    setFinalizado(false);
    setError("");
  };

  // ===============================
  //           INTERFAZ
  // ===============================
  return (
    <div className="p-6">
      <div className="bg-white p-5 rounded-xl shadow max-w-xl mx-auto">
        
        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Mensaje si está bloqueado */}
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
              Pregunta {actual + 1} de {preguntasNivel2.length}
            </h2>

            <p className="mb-4 text-lg">{preguntasNivel2[actual].pregunta}</p>

            {preguntasNivel2[actual].opciones.map((op, i) => (
              <button
                key={i}
                className="block w-full p-3 mb-2 bg-blue-200 hover:bg-blue-300 rounded transition duration-200"
                onClick={() => seleccionarRespuesta(i)}
                disabled={loading}
              >
                {op}
              </button>
            ))}

            {/* Información de progreso */}
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
              <p className="text-lg font-semibold">Puntaje: {puntaje} / {preguntasNivel2.length}</p>
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