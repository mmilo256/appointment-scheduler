const API_URL = 'http://localhost:3000/api/citizens'; // URL de la API para obtener los ciudadanos

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

// Función asincrónica para obtener todos los ciudadanos
export const getAllCitizens = async () => {
    try {
        // Llamada a la función httpRequest para obtener todos los ciudadanos
        const data = await httpRequest(API_URL, { method: 'GET' });
        return data;
    } catch (error) {
        console.error("Error al obtener los ciudadanos.", error);
        throw error;
    }
};

// Función asincrónica para obtener a un ciudadano por su ID
export const getCitizenById = async (id) => {
    try {
        // Llamada a la función httpRequest para obtener un ciudadano por su ID
        const data = await httpRequest(`${API_URL}/${id}`, { method: 'GET' });
        return data;
    } catch (error) {
        console.error("Error al obtener el ciudadano.", error);
        throw error;
    }
};

// Función asincrónica para obtener a un ciudadano por su RUT
export const getCitizenByRUT = async (rut) => {
    try {
        // Llamada a la función httpRequest para obtener un ciudadano por su RUT
        const data = await httpRequest(`${API_URL}/rut/${rut}`, { method: 'GET' });
        return data;
    } catch (error) {
        console.error("Error al obtener el ciudadano.", error);
        throw error;
    }
};

// Función asincrónica para crear un nuevo ciudadano
export const createCitizen = async (citizenData) => {
    try {
        // Llamada a la función httpRequest para crear un nuevo ciudadano
        const data = await httpRequest(API_URL, {
            method: 'POST',
            body: JSON.stringify(citizenData)
        });
        return data;
    } catch (error) {
        console.error("Error al crear el ciudadano.", error);
        throw error;
    }
};

// Función asincrónica para eliminar un ciudadano
export const deleteCitizen = async (id) => {
    try {
        // Llamada a la función httpRequest para eliminar un ciudadano por su ID
        await httpRequest(`${API_URL}/${id}`, { method: 'DELETE' });
    } catch (error) {
        console.error("Error al eliminar el ciudadano.", error);
        throw error;
    }
};

// Función asincrónica para actualizar un ciudadano
export const updateCitizen = async (id, citizenData) => {
    try {
        // Llamada a la función httpRequest para actualizar un ciudadano por su ID
        const data = await httpRequest(`${API_URL}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(citizenData)
        });
        return data;
    } catch (error) {
        console.error("Error al editar el ciudadano.", error);
        throw error;
    }
};
