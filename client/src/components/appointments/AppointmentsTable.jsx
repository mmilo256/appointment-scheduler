import React, { useContext, useEffect, useState } from "react";
import BaseTable from "../ui/BaseTable";
import ActionsRow from "../ui/ActionsRow";
import {
  deleteAppointment,
  getAllAppointments,
} from "../../services/appointmentService";
import { checkToken, formatDate } from "../../utils/helpers";
import { AuthContext } from "../../context/AuthContext";
import StatusTag from "./StatusTag";

function AppointmentTable() {
  // Estado local para almacenar la lista de audiencias
  const [appointments, setAppointments] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const { logout } = useContext(AuthContext);

  // Efecto de lado para obtener la lista de audiencias al cargar el componente
  useEffect(() => {
    // Función asincrónica para obtener los audiencias
    const getAppointments = async () => {
      const isTokenExpired = checkToken(localStorage.getItem("jwt"));
      try {
        if (!isTokenExpired) {
          // Llamada a la función getAllAppointments del servicio para obtener los audiencias
          const data = await getAllAppointments();
          // Actualización del estado con la lista de audiencias obtenida
          setAppointments(data);
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

  const onDelete = async (id) => {
    console.log("ID a eliminar:", id);
    try {
      await deleteAppointment(id);
      console.log("Audiencia eliminado correctamente");
      setRefreshData((prevState) => !prevState);
    } catch (error) {
      throw error;
    }
  };

  // Función para dar formato a los datos de los audiencias
  const formatData = () => {
    const formattedData = appointments.map((appointment) => {
      // Formato de cada audiencia con sus respectivos campos
      const formattedDate = formatDate(appointment.appointment_date);
      const appointmentData = {
        id: appointment.id,
        citizenName: `${appointment.citizen.first_name} ${appointment.citizen.last_name}`,
        cause: appointment.cause,
        department: appointment.department.dep_name,
        date: formattedDate,
        status: <StatusTag status={appointment.appointment_status} />,
        actions: (
          <ActionsRow
            module="appointments"
            id={appointment.id}
            onDelete={onDelete}
          />
        ),
      };
      return appointmentData;
    });
    return formattedData;
  };

  // Configuración de la tabla con columnas y datos formateados
  const table = {
    columns: [
      { label: "N°", styles: "w-content" },
      { label: "SOLICITANTE", styles: "w-content" },
      { label: "MATERIA", styles: "w-content" },
      { label: "DERIVACIÓN", styles: "w-content" },
      { label: "FECHA AUDIENCIA", styles: "w-content" },
      { label: "ESTADO", styles: "w-content" },
      { label: "ACCIONES", styles: "w-content" },
    ],
    data: formatData(), // Datos formateados de los audiencias
  };

  // Renderizado de la tabla con los datos configurados
  return <BaseTable table={table} />;
}

export default AppointmentTable;