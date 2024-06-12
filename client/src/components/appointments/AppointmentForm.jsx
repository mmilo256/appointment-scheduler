import React, { useContext, useEffect, useState } from "react";
import BaseForm from "../ui/BaseForm";
import {
  createAppointment,
  getAppointmentById,
  getAvailableTimes,
} from "../../services/appointmentService";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { checkToken } from "../../utils/helpers";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import DatePickerInput from "../ui/DatePickerInput";
import { format } from "date-fns";
import { es } from "date-fns/locale";

function AppointmentForm({ citizenData, appointmentId }) {
  const [selectedDate, setSelectedDate] = useState();
  const [cause, setCause] = useState("");
  const [refreshTimes, setRefreshTimes] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(
    availableTimes ? availableTimes[0] : null
  );
  // Estado para almacenar los datos del usuario
  const [appointmentData, setAppointmentData] = useState({});
  // Hook para la navegación
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const getAllAvailableTimes = async (date) => {
      const isTokenExpired = checkToken(localStorage.getItem("jwt"));
      try {
        if (!isTokenExpired) {
          // Llamada a la función getAllDepartments del servicio para obtener los departamentos
          const data = await getAvailableTimes(date);
          setAvailableTimes(data);
        } else {
          logout("expired");
        }
      } catch (error) {
        // Manejo de errores en caso de fallo al obtener los departamentos
        console.log("Error al obtener las direcciones.", error);
      }
    };
    if (selectedDate) {
      getAllAvailableTimes(format(selectedDate, "yyyy-MM-dd"));
    }
  }, [refreshTimes]);

  // Función para manejar la creación de un nuevo usuario
  const onCreateAppointment = async (data) => {
    const isTokenExpired = checkToken(localStorage.getItem("jwt"));
    try {
      if (!isTokenExpired) {
        // Llamada al servicio para crear un nuevo usuario
        await createAppointment(data);
        alert("La audiencia fue creada exitosamente");
        navigate("/appointments");
      } else {
        logout("expired");
      }
    } catch (error) {
      // Manejo de errores en caso de fallo al crear al usuario
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(citizenData).length !== 0) {
      if (cause) {
        if (selectedDate && selectedTime) {
          const data = {
            cause,
            appointment_date: new Date(
              `${format(selectedDate, "yyyy-MM-dd")} ${selectedTime}`
            ),
            citizen_id: citizenData.id,
          };
          onCreateAppointment(data);
        } else {
          alert("Debes ingresar la fecha de la audiencia");
        }
      } else {
        alert("Debes ingresar la materia de la audiencia");
      }
    } else {
      alert("Debes ingresar el RUT de un ciudadano para realizar la solicitud");
    }
  };

  const onSelectTimeHandler = (e) => {
    setSelectedTime(e.target.value);
  };

  const onChangeCause = (e) => {
    setCause(e.target.value);
  };

  // Renderización del formulario con los botones y la lógica de envío
  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="textarea"
        label="Materia"
        value={cause}
        onChange={onChangeCause}
      />
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2">
          <DatePickerInput
            refreshTimes={refreshTimes}
            setRefreshTimes={setRefreshTimes}
            selectedtDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <div className="bg-white p-2 text-center rounded shadow">
          <p className="font-semibold">Fecha</p>
          <p className="mb-2">
            {selectedDate &&
              format(selectedDate, "d 'de' MMMM 'de' yyyy", { locale: es })}
          </p>
          {selectedDate && (
            <label htmlFor="available_times">
              <p className="font-semibold">Hora</p>
              <select
                className="border w-full rounded p-2"
                name="available_times"
                id="available_times"
                value={selectedTime}
                onChange={onSelectTimeHandler}
              >
                <option value="">Seleccione una hora</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
        <p
          className={`col-span-3 bg-green-200 text-center text-green-800 p-1 ${
            Object.keys(citizenData).length !== 0 &&
            cause &&
            selectedDate &&
            selectedTime
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          La audiencia será el{" "}
          {selectedDate &&
            format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: es })}{" "}
          a las {selectedTime && selectedTime}
        </p>
      </div>
      <div className="flex ml-auto mt-5 gap-2 w-96">
        <Button href="/appointments">Volver</Button>
        <Button color="secondary" type="submit">
          Crear audiencia
        </Button>
      </div>
    </form>
  );
}

export default AppointmentForm;
