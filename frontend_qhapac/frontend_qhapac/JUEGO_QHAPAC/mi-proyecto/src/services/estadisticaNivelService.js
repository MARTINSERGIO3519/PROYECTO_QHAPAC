// estadisticaNivelService.js
export const registrarNivel = async (idNivel, puntaje, correctas) => {
  try {
    const data = {
      idUsuario: idUsuario, // usuario logueado
      idNivel: idNivel,
      puntaje: puntaje,
      correctas: correctas,
      periodo: 1,
      fecha: new Date().toISOString().split("T")[0]
    };

    const response = await fetch("http://localhost:8090/api/estadistica-nivel/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("Error registrando nivel", error);
    throw error;
  }
};
