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
export const formatJustDate = (date) => {
    const monthsList = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const rawDate = new Date(date)
    const day = rawDate.getDate();
    const year = rawDate.getFullYear()
    const month = monthsList[rawDate.getMonth()];
    const formattedDate = `${day} de ${month} de ${year}`
    return formattedDate
}

export const splitDateHour = (fulldate) => {
    const splittedFullDate = fulldate.split("T")
    const [date, time] = splittedFullDate
    const splittedTime = time.split(':')
    const timeWithoutSeconds = `${splittedTime[0]}:${splittedTime[1]}`
    const dateAndTime = {
        date,
        time: timeWithoutSeconds
    }

    return dateAndTime
}

export const groupAppointments = (appointments) => {
    const groupedAppointments = appointments.reduce((acc, appointment) => {
        const { date } = appointment;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(appointment);
        return acc;
      }, {});
      
      // Convertir el objeto agrupado en un array de objetos
  const result = Object.keys(groupedAppointments).map((date) => {
    return {
      date,
      appointments: groupedAppointments[date].map(({ id, isReferred, cause, time, citizen }) => ({
        id,
        isReferred,
        cause,
        time,
        citizen
      }))
    };
  });
  return result
}