import { DEV_API_URL } from "../constants";

const API_URL = `${DEV_API_URL}/auth`;

const login = async (username, password) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password }) // Envía el nombre de usuario y la contraseña en el cuerpo de la solicitud
        });
        if (!response.ok) {
            console.log("Error al iniciar sesión"); // Muestra un mensaje de error si la respuesta no es satisfactoria
        }
        const data = await response.json(); // Convierte la respuesta en un objeto JSON
        const token = data.token; // Extrae el token de los datos recibidos
        return token; // Devuelve el token
    } catch (error) {
        console.log("Error al iniciar sesión"); // Muestra un mensaje de error si ocurre un problema durante la solicitud
    }
};

export const authService = {
    login
};
