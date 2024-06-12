import { format } from "date-fns-tz";
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

// Formatera rut
export const formatRut = (value) => {
   // Remover todos los caracteres que no sean dígitos o 'k'/'K'
   let cleanValue = value.replace(/[^0-9kK]/g, '').toUpperCase();
    
   // Si el RUT tiene más de un dígito, agregar el guion antes del dígito verificador
   if (cleanValue.length > 1) {
       cleanValue = cleanValue.slice(0, -1) + '-' + cleanValue.slice(-1);
   }

   // Separar la parte numérica del dígito verificador
   const parts = cleanValue.split('-');
   const numericPart = parts[0];
   const verifier = parts[1] ? `-${parts[1]}` : '';

   // Agregar puntos cada tres dígitos a la parte numérica desde el final
   let result = '';
   let count = 0;
   for (let i = numericPart.length - 1; i >= 0; i--) {
       result = numericPart[i] + result;
       count++;
       if (count === 3 && i > 0) {
           result = '.' + result;
           count = 0;
       }
   }

   return result + verifier;
}

// Buscar una hora disponible


export const groupAppointments = (appointments) => {
    const groupedAppointments = appointments.reduce((acc, appointment) => {
        const { date } = appointment;
        const newDate = format(new Date(date), 'yyy-MM-ddd', {timeZone: 'America/Santiago'})
        if (!acc[newDate]) {
          acc[newDate] = [];
        }
        acc[newDate].push(appointment);
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