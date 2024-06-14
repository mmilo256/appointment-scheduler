import React, { useContext, useEffect, useState } from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Input from "../ui/Input";
import DatePickerInput from "../ui/DatePickerInput";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useAppointmentStore } from "../../stores/useAppointmentStore";
import { ALL_TIMES } from "../../constants";
import { formatDate } from "../../utils/helpers";

function EditAppointmentForm() {
  const selectedAppointment = useAppointmentStore(
    (state) => state.selectedAppointment
  );

  const editAppointment = useAppointmentStore((state) => state.editAppointment);
  const getAllAppointments = useAppointmentStore(
    (state) => state.getAllAppointments
  );

  const [date, setDate] = useState(selectedAppointment.date ?? "");
  const [cause, setCause] = useState(selectedAppointment.cause ?? "");
  const [time, setTime] = useState(selectedAppointment.time ?? "");
  const [response, setResponse] = useState(selectedAppointment.response ?? "");
  const navigate = useNavigate();

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const appDate = `${new Date(date).getFullYear()}-${
      new Date(date).getMonth() + 1
    }-${new Date(date).getDate()}`;
    const dataToEdit = { response };
    if (cause) dataToEdit.cause = cause;
    if (date) dataToEdit.date = formatDate(appDate, 2);
    if (time) dataToEdit.time = time;
    if (response) {
      dataToEdit.response = response;
    } else {
      setResponse("");
      dataToEdit.response = response;
    }

    console.log(dataToEdit);
    await editAppointment(selectedAppointment.id, dataToEdit);
    await getAllAppointments();
    alert("Audiencia modificada");
    navigate("/appointments");
  };

  useEffect(() => {
    setTime("");
  }, [date]);

  // Renderización del formulario con los botones y la lógica de envío
  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="textarea"
        label="Materia"
        value={cause}
        onChange={(e) => {
          setCause(e.target.value);
        }}
      />
      <Input
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        label="Solución propuesta"
        type="textarea"
      />
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2">
          <DatePickerInput selectedtDate={date} setSelectedDate={setDate} />
        </div>
        <div className="bg-white p-2 text-center rounded shadow">
          <p className="font-semibold">Fecha</p>
          <p className="mb-2">
            {date && format(date, "d 'de' MMMM 'de' yyyy", { locale: es })}
          </p>

          <Input
            label="Hora"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
            options={getTimesOptions()}
            type="select"
          />
        </div>
      </div>
      <div className="flex ml-auto mt-5 gap-2 w-96">
        <Button href="/appointments">Volver</Button>
        <Button color="secondary" type="submit">
          Editar audiencia
        </Button>
      </div>
    </form>
  );
}

export default EditAppointmentForm;
