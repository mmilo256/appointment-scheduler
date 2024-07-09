import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import DatePickerInput from "../ui/DatePickerInput";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useAppointmentStore } from "../../stores/useAppointmentStore";
import { ALL_TIMES } from "../../constants";
import { formatDate } from "../../utils/helpers";

function AppointmentForm({ citizenData }) {
  const [selectedDate, setSelectedDate] = useState();
  const [cause, setCause] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const availableTimes = useAppointmentStore((state) => state.availableTimes);
  const createAppointment = useAppointmentStore(
    (state) => state.createAppointment
  );
  const getAllAppointments = useAppointmentStore(
    (state) => state.getAllAppointments
  );

  useEffect(() => {
    /* Object.keys(citizenData).length !== 0 &&
            cause &&
            selectedDate &&
            selectedTime !== ""
              ? "opacity-100"
              : "opacity-0" */

    if (Object.keys(citizenData).length !== 0 && cause && selectedDate && selectedTime !== "") {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [cause, citizenData, selectedDate, selectedTime])

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    if (Object.keys(citizenData).length !== 0) {
      if (cause) {
        if (selectedDate && selectedTime) {
          const appDate = `${new Date(selectedDate).getFullYear()}-${
            new Date(selectedDate).getMonth() + 1
          }-${new Date(selectedDate).getDate()}`;
          const data = {
            cause,
            date: formatDate(appDate, 2),
            time: selectedTime,
            citizen_id: citizenData.id,
          };
          await createAppointment(data);
          await getAllAppointments();
          
          navigate("/appointments");
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

  useEffect(() => {
    setSelectedTime("");
  }, [selectedDate]);

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
        </div>
        <p
          className={`col-span-3 bg-green-200 text-center text-green-800 p-1 ${
            Object.keys(citizenData).length !== 0 &&
            cause &&
            selectedDate &&
            selectedTime !== ""
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
        <Button disabled={!isValid || isLoading} color="secondary" type="submit">
          Crear audiencia
        </Button>
      </div>
    </form>
  );
}

export default AppointmentForm;
