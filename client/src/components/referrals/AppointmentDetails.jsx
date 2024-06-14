import React from "react";
import { format } from "date-fns-tz"; // Importa la función de formato de fecha desde date-fns-tz
import { es } from "date-fns/locale"; // Importa el idioma español desde date-fns
import { useAppointmentStore } from "../../stores/useAppointmentStore";
import { formatDate } from "../../utils/helpers";

function AppointmentDetails() {
  const selectedAppointment = useAppointmentStore(
    (state) => state.selectedAppointment
  );

  return (
    <div className="bg-white h-full p-5 rounded-md shadow">
      <h2 className="text-center text-2xl font-light border-b pb-5 mb-5">
        Información de la audiencia
      </h2>

      <ul className="flex flex-col gap-1">
        <li className="font-bold">
          <p>Ciudadano</p>{" "}
          <span className="font-normal">
            {selectedAppointment.citizen &&
              `${selectedAppointment.citizen.first_name} ${selectedAppointment.citizen.last_name}`}
          </span>{" "}
        </li>
        <li className="font-bold">
          <p>Fecha</p>
          <span className="font-normal">
            {formatDate(selectedAppointment.date)}
          </span>
        </li>
        <li className="font-bold">
          <p>Hora</p>
          <span className="font-normal">{selectedAppointment.time}</span>
        </li>
        <li className="font-bold">
          <p>Materia</p>{" "}
          <span className="font-normal">
            {selectedAppointment.cause && selectedAppointment.cause}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default AppointmentDetails;
