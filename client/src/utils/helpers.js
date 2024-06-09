import { jwtDecode } from "jwt-decode"

export const checkToken = (token) => {
    if (!token) {
        return true; // Si el token no existe, considerarlo como expirado
    }

    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // La propiedad 'exp' indica el tiempo de expiración del token en segundos
    const currentTime = Date.now(); // Tiempo actual en milisegundos

    return expirationTime < currentTime; // Devuelve true si el token ha expirado, de lo contrario, devuelve false
};

export const formatDate = (date) => {
    const monthsList = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const rawDate = new Date(date)
    const day = rawDate.getDate();
    const year = rawDate.getFullYear()
    const month = monthsList[rawDate.getMonth()];
    const hours = rawDate.getHours();
    const minutes = rawDate.getMinutes();
    const formattedDate = `${day} de ${month} de ${year} a las ${hours}:${minutes < 10 ? '0' : ''}${minutes}`
    return formattedDate
}