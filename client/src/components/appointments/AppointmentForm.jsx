import React, { useContext, useEffect, useState } from "react";
import BaseForm from "../ui/BaseForm";
import {
  createAppointment,
  getAppointmentById,
  updateAppointment,
} from "../../services/appointmentService";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { checkToken } from "../../utils/helpers";

function AppointmentForm({ edit, appointmentId }) {
  // Estado para almacenar los datos del usuario
  const [appointmentData, setAppointmentData] = useState({});
  // Hook para la navegación
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // Datos por defecto para los inputs del formulario
  const defaultData = {
    appointmentname: appointmentData?.appointmentname,
    password: appointmentData?.password,
  };

  // Efecto de lado para obtener un usuario por su ID cuando se está editando
  useEffect(() => {
    if (edit) {
      // Función asincrónica para obtener al usuario
      const getAppointments = async () => {
        const isTokenExpired = checkToken(localStorage.getItem("jwt"));
        try {
          if (!isTokenExpired) {
            // Llamada al servicio para obtener al usuario por su ID
            const data = await getAppointmentById(appointmentId);
            // Actualización del estado con los datos del usuario obtenidos
            setAppointmentData(data);
          } else {
            logout("expired");
          }
        } catch (error) {
          // Manejo de errores en caso de fallo al obtener al usuario
          console.log("Error al obtener al usuario.", error);
        }
      };
      // Llamada a la función para obtener al usuario al montar el componente
      getAppointments();
    }
  }, [appointmentId, edit, logout]); // Dependencias del efecto: se ejecuta cuando cambian appointmentId o edit

  // Definición de los inputs del formulario
  const inputs = [
    {
      label: "Materia",
      id: "appointmentname",
      styles: "col-span-2",
      type: "text",
      defaultValue: defaultData.appointmentname,
    },
    {
      label: "Derivación",
      id: "appointmentname",
      styles: "col-span-2",
      type: "text",
      defaultValue: defaultData.appointmentname,
    },
    {
      label: "Fecha",
      id: "appointmentname",
      styles: "col-span-2",
      type: "text",
      defaultValue: defaultData.appointmentname,
    },
  ];

  // Función para manejar la creación de un nuevo usuario
  const onCreateAppointment = async (data) => {
    console.log("Data:", data);
    const isTokenExpired = checkToken(localStorage.getItem("jwt"));
    try {
      if (!isTokenExpired) {
        // Llamada al servicio para crear un nuevo usuario
        await createAppointment(data);
        navigate("/appointments");
      } else {
        logout("expired");
      }
    } catch (error) {
      // Manejo de errores en caso de fallo al crear al usuario
      console.log("No se pudo crear el usuario");
      throw error;
    }
  };

  // Función para manejar la edición de un usuario existente
  const onEditAppointment = async (data) => {
    // Preparar un objeto con los nuevos datos del usuario
    const newData = {};
    if (data.appointmentname) newData.appointmentname = data.appointmentname;
    if (data.password) newData.password = data.password;

    console.log("newData:", newData);
    // Comprobar que newData no está vacío antes de intentar actualizar el usuario
    if (newData && Object.keys(newData).length > 0) {
      // Verificar si el nombre de usuario ha cambiado antes de actualizar
      if (newData.appointmentname !== appointmentData.appointmentname) {
        const isTokenExpired = checkToken(localStorage.getItem("jwt"));
        try {
          if (!isTokenExpired) {
            // Llamada al servicio para actualizar al usuario
            await updateAppointment(appointmentId, newData);
            // Limpiar los datos por defecto después de la actualización
            defaultData.appointmentname = "";
            defaultData.password = "";
            // Navegar de vuelta a la lista de usuarios
            navigate("/appointments");
          } else {
            logout("expired");
          }
        } catch (error) {
          // Manejo de errores en caso de fallo al actualizar al usuario
          console.log("No se pudo editar el usuario");
          throw error;
        }
      }
    }
  };

  // Renderización del formulario con los botones y la lógica de envío
  return (
    <BaseForm
      footer={
        <div className="flex gap-2 max-w-80 ml-auto">
          <Button href="/appointments">Volver</Button>
          {<Button type="submit">Crear audiencia</Button>}
        </div>
      }
      onSubmit={edit ? onEditAppointment : onCreateAppointment}
      inputs={inputs}
    />
  );
}

export default AppointmentForm;
