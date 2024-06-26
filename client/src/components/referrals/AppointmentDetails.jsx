import React from "react";
import { formatDate } from "../../utils/helpers";

function AppointmentDetails({ data }) {
  return (
    <div className="bg-white h-full p-5 rounded-md shadow">
      <h2 className="text-center text-2xl font-light border-b pb-5 mb-5">
        Información de la audiencia
      </h2>

      <ul className="flex flex-col gap-1">
        <li className="font-bold">
          <p>Ciudadano</p>{" "}
          <span className="font-normal">
            {data.citizen &&
              `${data.citizen.first_name} ${data.citizen.last_name}`}
          </span>{" "}
        </li>
        <li className="font-bold">
          <p>Fecha</p>
          <span className="font-normal">{formatDate(data.date)}</span>
        </li>
        <li className="font-bold">
          <p>Hora</p>
          <span className="font-normal">{data.time}</span>
        </li>
        <li className="font-bold">
          <p>Materia</p>{" "}
          <span className="font-normal">{data.cause && data.cause}</span>
        </li>
        <li className="font-bold">
          <p>Solución propuesta</p>{" "}
          <span className="font-normal">{data.response && data.response}</span>
        </li>
      </ul>
    </div>
  );
}

export default AppointmentDetails;
