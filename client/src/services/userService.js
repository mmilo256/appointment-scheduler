const API_URL = 'https://appointment-scheduler-api.onrender.com/api/users'; // URL de la API para obtener los usuarios

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

// Función asincrónica para obtener todos los usuarios
export const getAllUsers = async () => {
    try {
        // Llamada a la función httpRequest para obtener todos los usuarios
        const data = await httpRequest(API_URL, { method: 'GET' });
        return data;
    } catch (error) {
        console.error("Error al obtener los usuarios.", error);
        throw error;
    }
};

// Función asincrónica para obtener a un usuario por su ID
export const getUserById = async (id) => {
    try {
        // Llamada a la función httpRequest para obtener un usuario por su ID
        const data = await httpRequest(`${API_URL}/${id}`, { method: 'GET' });
        return data;
    } catch (error) {
        console.error("Error al obtener el usuario.", error);
        throw error;
    }
};

// Función asincrónica para crear un nuevo usuario
export const createUser = async (userData) => {
    try {
        // Llamada a la función httpRequest para crear un nuevo usuario
        const data = await httpRequest(API_URL, {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        return data;
    } catch (error) {
        console.error("Error al crear el usuario.", error);
        throw error;
    }
};

// Función asincrónica para eliminar un usuario
export const deleteUser = async (id) => {
    try {
        // Llamada a la función httpRequest para eliminar un usuario por su ID
        await httpRequest(`${API_URL}/${id}`, { method: 'DELETE' });
    } catch (error) {
        console.error("Error al eliminar el usuario.", error);
        throw error;
    }
};

// Función asincrónica para actualizar un usuario
export const updateUser = async (id, userData) => {
    try {
        // Llamada a la función httpRequest para actualizar un usuario por su ID
        const data = await httpRequest(`${API_URL}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(userData)
        });
        return data;
    } catch (error) {
        console.error("Error al editar el usuario.", error);
        throw error;
    }
};
