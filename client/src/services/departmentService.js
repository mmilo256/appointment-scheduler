const API_URL = 'http://localhost:3000/api/departments'; // URL de la API para obtener los departamentos

// Función asincrónica para obtener todos los departamentos
export const getAllDepartments = async () => {
    const token = localStorage.getItem('jwt'); // Obtención del token de autenticación almacenado en el localStorage
    try {
        // Realización de la solicitud HTTP GET para obtener los departamentos
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}` // Inclusión del token en los encabezados de la solicitud
            }
        });
        // Verificación de si la respuesta de la solicitud es exitosa
        if (!response.ok) {
            throw new Error("Error al obtener las direcciones"); // Lanzamiento de un error si la respuesta no es satisfactoria
        }
        // Extracción de los datos de la respuesta en formato JSON
        const data = await response.json();
        return data; // Devolución de los datos obtenidos
    } catch(error) {
        // Manejo de errores en caso de fallo en la solicitud
        console.log("Error al obtener las direcciones.", error); // Registro del error en la consola
        throw error; // Relanzamiento del error para su posterior manejo
    }
};
