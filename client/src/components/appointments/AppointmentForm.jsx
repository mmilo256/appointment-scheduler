import React, { useContext, useEffect, useState } from "react";
import BaseForm from "../ui/BaseForm";
import {
  createAppointment,
  getAppointmentById,
} from "../../services/appointmentService";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { checkToken } from "../../utils/helpers";
import { getAllDepartments } from "../../services/departmentService";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import DatePickerInput from "../ui/DatePickerInput";

function AppointmentForm({ citizenData, appointmentId }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { register } = useForm();
  // Estado para almacenar los datos del usuario
  const [appointmentData, setAppointmentData] = useState({});
  const [departments, setDepartments] = useState([]);
  // Hook para la navegación
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // Efecto de lado para obtener la lista de departamentos al cargar el componente
  useEffect(() => {
    // Función asincrónica para obtener los departamentos
    const getDepartments = async () => {
      const isTokenExpired = checkToken(localStorage.getItem("jwt"));
      try {
        if (!isTokenExpired) {
          // Llamada a la función getAllDepartments del servicio para obtener los departamentos
          const data = await getAllDepartments();
          // Actualización del estado con la lista de departamentos obtenida
          const departmentsOptions = data.map((dep) => ({
            value: dep.id,
            label: dep.dep_name,
          }));
          setDepartments(departmentsOptions);
        } else {
          logout("expired");
        }
      } catch (error) {
        // Manejo de errores en caso de fallo al obtener los departamentos
        console.log("Error al obtener las direcciones.", error);
      }
    };
    // Llamada a la función para obtener los departamentos al montar el componente
    getDepartments();
  }, [logout, citizenData]);

  // Definición de los inputs del formulario
  const inputs = [
    {
      label: "Materia",
      id: "cause",
      styles: "col-span-2",
      type: "textarea",
    },
    {
      label: "Fecha",
      id: "date",
      type: "date",
    },
    {
      label: "Hora",
      id: "time",
      type: "time",
    },
  ];

  // Función para manejar la creación de un nuevo usuario
  const onCreateAppointment = async (data) => {
    const isTokenExpired = checkToken(localStorage.getItem("jwt"));
    try {
      if (Object.keys(citizenData).length !== 0) {
        if (!isTokenExpired) {
          const appointmentData = {
            cause: data.cause,
            appointment_date: `${data.date}T${data.time}:00.000Z`,
            citizen_id: citizenData.id,
          };
          // Llamada al servicio para crear un nuevo usuario
          await createAppointment(appointmentData);
          navigate("/appointments");
        } else {
          logout("expired");
        }
      } else {
        alert("Debes buscar al solicitante con su RUT");
      }
    } catch (error) {
      // Manejo de errores en caso de fallo al crear al usuario
      alert(
        "El solicitante no está en la base datos. Primero agregue al solicitante y luego cree la audiencia."
      );
    }
  };

  // Renderización del formulario con los botones y la lógica de envío
  return (
    <form action="">
      <Input
        type="textarea"
        label="Materia"
        register={{ ...register("cause") }}
      />
      <DatePickerInput
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <p>Fecha seleccionada: {currentDate.toDateString()}</p>
      <div className="flex ml-auto mt-5 gap-2 w-96">
        <Button href="/appointments">Volver</Button>
        <Button type="submit">Crear audiencia</Button>
      </div>
    </form>
  );
}

export default AppointmentForm;
