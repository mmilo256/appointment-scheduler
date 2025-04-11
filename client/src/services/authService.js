import { DEV_API_URL } from "../constants";

const API_URL = `${DEV_API_URL}/auth`;

export const login = async (username, password) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        // Si la respuesta no es exitosa, lanzar el error con el mensaje del servidor
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al iniciar sesión");
        }

        const data = await response.json();
        return data.token; // Devuelve directamente el token si todo sale bien

    } catch (error) {
        console.error("Login error:", error.message);
        throw error; // Re-lanza el error para que el componente que llame a esta función pueda manejarlo
    }
};
