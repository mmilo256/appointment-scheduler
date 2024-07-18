import { DEV_API_URL } from "../constants";

const API_URL = `${DEV_API_URL}/referrals`; // URL de la API para obtener los audiencias

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
        throw new Error("Error en la solicitud");
    }

    // Si el método es DELETE, devolver solo la respuesta
    if (options.method === 'DELETE') {
        return response;
    }
    // De lo contrario, devolver los datos en formato JSON
    return response.json();
};

// Función asincrónica para obtener todos los audiencias
export const getAllPendingReferrals = async (page = 1) => {
    try {
        // Llamada a la función httpRequest para obtener todos los audiencias
        const data = await httpRequest(`${API_URL}/pendings?page=${page}&pageSize=10`, { method: 'GET' });
        return data;
    } catch (error) {
        console.error("Error al obtener los audiencias.", error);
        throw error;
    }
};
export const getAllInProgressReferrals = async (page = 1) => {
    try {
        // Llamada a la función httpRequest para obtener todos los audiencias
        const data = await httpRequest(`${API_URL}/in-progress?page=${page}&pageSize=10`, { method: 'GET' });
        return data;
    } catch (error) {
        console.error("Error al obtener los audiencias.", error);
        throw error;
    }
};
export const getAllFinishedReferrals = async (page = 1) => {
    try {
        // Llamada a la función httpRequest para obtener todos los audiencias
        const data = await httpRequest(`${API_URL}/finished?page=${page}&pageSize=10`, { method: 'GET' });
        return data;
    } catch (error) {
        console.error("Error al obtener los audiencias.", error);
        throw error;
    }
};

export const getReferralById = async (id) => {
    try {
        // Llamada a la función httpRequest para obtener un audiencia por su ID
        const data = await httpRequest(`${API_URL}/${id}`, { method: 'GET' });
        return data;
    } catch (error) {
        console.error("Error al obtener el audiencia.", error);
        throw error;
    }
};

// Función asincrónica para crear un nuevo audiencia
export const createReferral = async (referralData) => {
    try {
        // Llamada a la función httpRequest para crear un nuevo audiencia
        const data = await httpRequest(API_URL, {
            method: 'POST',
            body: JSON.stringify(referralData)
        });
        return data;
    } catch (error) {
        console.error("Error al crear la derivacion.", error);
        throw error;
    }
};

// Función asincrónica para eliminar un audiencia
export const deleteReferral = async (id) => {
    try {
        // Llamada a la función httpRequest para actualizar un audiencia por su ID
        const data = await httpRequest(`${API_URL}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ is_deleted: true })
        });
        return data;
    } catch (error) {
        console.error("Error al editar el audiencia.", error);
        throw error;
    }
};

// Función asincrónica para actualizar un audiencia
export const updateReferral = async (id, referralData) => {
    try {
        // Llamada a la función httpRequest para actualizar un audiencia por su ID
        const data = await httpRequest(`${API_URL}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(referralData)
        });
        return data;
    } catch (error) {
        console.error("Error al editar el audiencia.", error);
        throw error;
    }
};