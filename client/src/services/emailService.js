import { DEV_API_URL } from "../constants";

const API_URL = `${DEV_API_URL}/email/send-email`;

export const sendEmail = async (to, subject, html) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ to, subject, html }) // Envía el nombre de usuario y la contraseña en el cuerpo de la solicitud
        });
        if (!response.ok) {
            console.log("Error al enviar correo"); // Muestra un mensaje de error si la respuesta no es satisfactoria
        }
    } catch (error) {
        console.log("Error al enviar correo"); // Muestra un mensaje de error si ocurre un problema durante la solicitud
    }
};