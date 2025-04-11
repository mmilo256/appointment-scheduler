import { DEV_API_URL } from "../constants";
import { expiredLogout } from "../utils/helpers";

const API_URL = `${DEV_API_URL}/departments`; // URL de la API para obtener los departamentos

// Función para obtener el token almacenado en localStorage
const getToken = () => localStorage.getItem('jwt');

// Función auxiliar para realizar solicitudes HTTP
const httpRequest = async (url, options) => {
    // Obtener el token de autenticación
    const token = getToken();
    // Agregar los encabezados de autorización y tipo de contenido a las opciones
    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    // Realizar la solicitud HTTP con fetch
    const response = await fetch(url, options);
    // Verificar si la respuesta es exitosa
    if (!response.ok) {
        const errorData = await response.json()
        expiredLogout()
        throw new Error(errorData.message || "Error en la solicitud")
    }

    // Si el método es DELETE, devolver solo la respuesta
    if (options.method === 'DELETE') {
        return response;
    }
    // De lo contrario, devolver los datos en formato JSON
    return response.json();
};

// Función asincrónica para obtener todos las las direcciones
export const getAllDepartments = async () => {
    try {
        // Llamada a la función httpRequest para obtener todos los ciudadanos
        const data = await httpRequest(API_URL, { method: 'GET' });
        return data;
    } catch (error) {
        console.error("Error al obtener las direcciones.", error);
        throw error;
    }
};



