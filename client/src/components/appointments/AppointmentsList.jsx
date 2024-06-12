import React, { useContext, useEffect, useState } from "react";
import { checkToken, groupAppointments } from "../../utils/helpers";
import { getAllAppointments } from "../../services/appointmentService";
import { AuthContext } from "../../context/AuthContext";
import AppointmentsCardsGroup from "./AppointmentsCardsGroup";
import { format } from "date-fns";

function AppointmentsList() {
  // Estado local para almacenar la lista de audiencias
  const [appointments, setAppointments] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const { logout } = useContext(AuthContext);

  // Efecto para obtener la lista de audiencias al cargar el componente
  useEffect(() => {
    const getAppointments = async () => {
      const isTokenExpired = checkToken(localStorage.getItem("jwt"));
      try {
        if (!isTokenExpired) {
          const data = await getAllAppointments();
          // Formatear audiencias
          const formattedData = data.map((appointment) => {
            return {
              id: appointment.id,
              cause: appointment.cause,
              isReferred: appointment.is_referred,
              date: appointment.appointment_date,
              time: format(appointment.appointment_date, "hh:mm"),
              citizen: `${appointment.citizen.first_name} ${appointment.citizen.last_name}`,
            };
          });
          // Actualización del estado con la lista de audiencias obtenida
          setAppointments(formattedData);
        } else {
          logout("expired");
        }
      } catch (error) {
        console.log("Error al obtener las audiencias.", error);
      }
    };
    getAppointments();
  }, [refreshData, logout]);

  // Formatear las audiencias para agruparlas por fecha
  const groupedAppointments = groupAppointments(appointments);

  return (
    <div className="grid grid-cols-1 gap-4">
      {groupedAppointments.map((group, index) => {
        return (
          <AppointmentsCardsGroup
            setRefreshData={setRefreshData}
            key={index}
            data={group}
          />
        );
      })}
    </div>
  );
}

export default AppointmentsList;
