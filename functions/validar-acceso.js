// functions/validar-acceso.js
// Netlify Function — valida códigos de acceso del lado del servidor

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método no permitido" };
  }

  const { codigo } = JSON.parse(event.body || "{}");

  // Códigos válidos — agregar/remover según necesidad
  // En producción: mover a variables de entorno en Netlify Dashboard
  const CODIGOS_VALIDOS = process.env.CODIGOS_ACCESO
    ? process.env.CODIGOS_ACCESO.split(",")
    : ["SENDERO2024", "BECA2024"]; // fallback de desarrollo

  const esValido = CODIGOS_VALIDOS.includes((codigo || "").trim().toUpperCase());

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      valido: esValido,
      redireccion: esValido ? "/contenido/index.html" : null,
    }),
  };
};
