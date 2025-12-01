import React, { useState, useEffect } from "react";
import { authGet, authPost, authPut } from "../utils/api";

const preguntasNivel6 = [
  {
    pregunta: "¿Quién creó la primera bandera del Perú?",
    opciones: [
      "José de San Martín",
      "Simón Bolívar",
      "Ramón Castilla",
      "Miguel Grau",
    ],
    correcta: 0, // Corregido de "orrecta" a "correcta"
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

export default function Quizz6() {
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
      const existente = json.find((e) => e.nivel?.idNivel === 6);
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

    const nuevaPuntuacion = index === preguntasNivel6[actual].correcta ? puntaje + 1 : puntaje;

    if (actual + 1 < preguntasNivel6.length) {
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
        nivel: { idNivel: 6 },
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
        nivel: { idNivel: 6 },
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
              Pregunta {actual + 1} de {preguntasNivel6.length}
            </h2>

            <p className="mb-4 text-lg">{preguntasNivel6[actual].pregunta}</p>

            {preguntasNivel6[actual].opciones.map((op, i) => (
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
              <p className="text-lg font-semibold">Puntaje: {puntaje} / {preguntasNivel6.length}</p>
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