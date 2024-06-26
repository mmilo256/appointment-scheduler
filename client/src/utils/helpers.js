import { format } from "date-fns-tz";
import { jwtDecode } from "jwt-decode";

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
  const splittedFullDate = fulldate.split("T");
  const [date, time] = splittedFullDate;
  const splittedTime = time.split(":");
  const timeWithoutSeconds = `${splittedTime[0]}:${splittedTime[1]}`;
  const dateAndTime = {
    date,
    time: timeWithoutSeconds,
  };

  return dateAndTime;
};

export const formatDate = (date, format = 1) => {
  const monthsList = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const splittedDate = date.split("-");
  const year = splittedDate[0];
  const monthNum =
    splittedDate[1] > 9 ? splittedDate[1] : "0" + splittedDate[1];
  const month = Number(splittedDate[1]);
  const day =
    String(splittedDate[2]).length > 1
      ? splittedDate[2]
      : "0" + splittedDate[2];

  let dateString;
  if (format === 1) {
    // dateString = `${day} de ${month} de ${year}`;
    dateString = `${day} de ${monthsList[month - 1]} de ${year}`;
  } else if (format === 2) {
    dateString = `${year}-${monthNum}-${day}`;
  }
  return dateString;
};

// Formatear rut
export const formatRut = (value) => {
  // Remover todos los caracteres que no sean dígitos o 'k'/'K'
  let cleanValue = value.replace(/[^0-9kK]/g, "").toUpperCase();

  // Si el RUT tiene más de un dígito, agregar el guion antes del dígito verificador
  if (cleanValue.length > 1) {
    cleanValue = cleanValue.slice(0, -1) + "-" + cleanValue.slice(-1);
  }

  // Separar la parte numérica del dígito verificador
  const parts = cleanValue.split("-");
  const numericPart = parts[0];
  const verifier = parts[1] ? `-${parts[1]}` : "";

  // Agregar puntos cada tres dígitos a la parte numérica desde el final
  let result = "";
  let count = 0;
  for (let i = numericPart.length - 1; i >= 0; i--) {
    result = numericPart[i] + result;
    count++;
    if (count === 3 && i > 0) {
      result = "." + result;
      count = 0;
    }
  }

  return result + verifier;
};

// Verificación del RUT con el algoritmo Modulo 11
function validarRut(number, dv) {
  if (number.length === 0 || number.length > 8) {
    console.error("El número del RUT debe tener entre 1 y 8 dígitos.");
    return false;
  } else {
    return getDV(number) == dv;
  }
}

function getDV(number) {
  let newNumber = number.toString().split("").reverse().join("");
  let sum = 0;
  let j = 2;

  for (let i = 0; i < newNumber.length; i++) {
    sum += parseInt(newNumber.charAt(i)) * j;
    j = j < 7 ? j + 1 : 2;
  }

  let n_dv = 11 - (sum % 11);
  return n_dv === 11 ? 0 : n_dv === 10 ? "K" : n_dv;
}

export const verifyRut = (rut) => {
  if (!rut.includes("-")) {
    console.error(
      "El RUT debe tener un guion para separar el número del dígito verificador."
    );
    return false;
  }

  const [number, dv] = rut.split("-");
  const cleanedNumber = number.replace(/\./g, "");

  if (isNaN(cleanedNumber) || dv.length !== 1) {
    console.error("Formato de RUT inválido.");
    return false;
  }

  return validarRut(cleanedNumber, dv.toUpperCase());
};

// Buscar una hora disponible

export const groupAppointments = (appointments) => {
  const formattedAppointments = appointments.map((app) => ({
    id: app.id,
    cause: app.cause,
    isReferred: app.is_referred,
    date: app.date,
    response: app.response,
    time: app.time,
    citizenId: app.citizen_id,
    citizen: `${app.citizen.first_name} ${app.citizen.last_name}`,
  }));
  const groupedAppointments = formattedAppointments.reduce(
    (acc, appointment) => {
      if (!acc[appointment.date]) {
        acc[appointment.date] = [];
      }
      acc[appointment.date].push(appointment);
      return acc;
    },
    {}
  );

  // Convertir el objeto agrupado en un array de objetos
  const result = Object.keys(groupedAppointments).map((date) => {
    return {
      date,
      appointments: groupedAppointments[date].map(
        ({
          id,
          isReferred,
          citizenId,
          response,
          cause,
          date,
          time,
          citizen,
        }) => ({
          id,
          isReferred,
          response,
          citizenId,
          cause,
          date,
          time,
          citizen,
        })
      ),
    };
  });
  return result;
};
