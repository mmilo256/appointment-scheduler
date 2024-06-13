import React, { useContext, useEffect, useState } from "react";
import {
  createAppointment,
  getAvailableTimes,
} from "../../services/appointmentService";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { checkToken } from "../../utils/helpers";
import Input from "../ui/Input";
import DatePickerInput from "../ui/DatePickerInput";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useAppointmentStore } from "../../stores/useAppointmentStore";
import { ALL_TIMES } from "../../constants";

function AppointmentForm({ citizenData }) {
  const [selectedDate, setSelectedDate] = useState();
  const [cause, setCause] = useState("");
  const [selectedTime, setSelectedTime] = useState();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const availableTimes = useAppointmentStore((state) => state.availableTimes);

  const getTimesOptions = () => {
    return ALL_TIMES.map((time) => {
      const isOcuppied = availableTimes.includes(time);
      return {
        value: time,
        label: time,
        disabled: isOcuppied,
      };
    });
  };

  // Función para manejar la creación de una nueva cita
  const onCreateAppointment = async (data) => {
    const isTokenExpired = checkToken(localStorage.getItem("jwt"));
    try {
      if (!isTokenExpired) {
        await createAppointment(data);
        alert("La audiencia fue creada exitosamente");
        navigate("/appointments");
      } else {
        logout("expired");
      }
    } catch (error) {
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
            <Input
              label="Hora"
              value={selectedTime}
              onChange={onSelectTimeHandler}
              options={getTimesOptions()}
              type="select"
            />
          )}
          {/*  {selectedDate && (
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
                {ALL_TIMES.map((time) => (
                  <option disabled key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </label>
          )} */}
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
