import React, { useContext, useEffect, useState } from "react";
import {
  checkToken,
  groupAppointments,
  splitDateHour,
} from "../../utils/helpers";
import {
  deleteAppointment,
  getAllAppointments,
} from "../../services/appointmentService";
import { AuthContext } from "../../context/AuthContext";
import AppointmentsCardsGroup from "./AppointmentsCardsGroup";

function AppointmentsList() {
  // Estado local para almacenar la lista de audiencias
  const [appointments, setAppointments] = useState([]);
  const { logout } = useContext(AuthContext);
  const [refreshData, setRefreshData] = useState(false);
  // Efecto de lado para obtener la lista de audiencias al cargar el componente
  useEffect(() => {
    // Función asincrónica para obtener los audiencias
    const getAppointments = async () => {
      const isTokenExpired = checkToken(localStorage.getItem("jwt"));
      try {
        if (!isTokenExpired) {
          // Llamada a la función getAllAppointments del servicio para obtener los audiencias
          const data = await getAllAppointments();
          // Formatear audiencias
          const formattedData = data.map((appointment) => {
            const fullDate = splitDateHour(appointment.appointment_date);
            const { date, time } = fullDate;
            return {
              id: appointment.id,
              cause: appointment.cause,
              isReferred: appointment.is_referred,
              date,
              time,
              citizen: `${appointment.citizen.first_name} ${appointment.citizen.last_name}`,
            };
          });
          // Actualización del estado con la lista de audiencias obtenida
          setAppointments(formattedData);
        } else {
          logout("expired");
        }
      } catch (error) {
        // Manejo de errores en caso de fallo al obtener los audiencias
        console.log("Error al obtener los audiencias.", error);
      }
    };
    // Llamada a la función para obtener los audiencias al montar el componente
    getAppointments();
  }, [refreshData, logout]);

  // Formatear las audiencias para agruparlas por fecha
  const groupedAppointments = groupAppointments(appointments);
  console.log(groupedAppointments);

  return (
    <div className="flex flex-col gap-5 ">
      {groupedAppointments.map((group, index) => (
        <AppointmentsCardsGroup key={index} data={group} />
      ))}
    </div>
  );
}

export default AppointmentsList;
