import React, { useEffect, useState } from "react";
import { checkToken } from "../../utils/helpers";

import { getAppointmentById } from "../../services/appointmentService";
import { format } from "date-fns-tz";
import { es } from "date-fns/locale";

function AppointmentDetails({ appointment }) {
  return (
    <div className="bg-white h-full p-5 rounded-md shadow">
      <h2 className="text-center text-2xl font-light border-b pb-5 mb-5">
        Información de la audiencia
      </h2>

      <ul className="flex flex-col gap-1">
        <li className="font-bold">
          <p>Ciudadano</p>{" "}
          <span className="font-normal">
            {appointment.citizen &&
              `${appointment.citizen.first_name} ${appointment.citizen.last_name}`}
          </span>{" "}
        </li>
        <li className="font-bold">
          <p>Fecha</p>
          <span className="font-normal">
            {appointment.appointment_date &&
              format(appointment.appointment_date, "dd 'de' MMMM 'de' yyyy", {
                locale: es,
              })}
          </span>
        </li>
        <li className="font-bold">
          <p>Hora</p>
          <span className="font-normal">
            {appointment.appointment_date &&
              format(appointment.appointment_date, "HH:mm", {
                locale: es,
              })}
          </span>
        </li>
        <li className="font-bold">
          <p>Materia</p>{" "}
          <span className="font-normal">
            {appointment.cause && appointment.cause}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default AppointmentDetails;
