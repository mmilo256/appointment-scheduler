import React from "react";
import AppointmentCard from "./AppointmentCard";
import { formatDate } from "../../utils/helpers";

function AppointmentsCardsGroup({ data, setRefreshData }) {
  console.log(data);
  return (
    <div>
      {/* Título con la fecha formateada */}
      <h2 className="text-2xl text-primary-500 font-semibold mb-2">
        {formatDate(data.date, 1)}
      </h2>

      {/* Lista de tarjetas de citas */}
      <div className="flex flex-col gap-4">
        {data.appointments.map((appointment) => {
          return (
            <AppointmentCard
              setRefreshData={setRefreshData}
              key={appointment.id}
              data={appointment}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AppointmentsCardsGroup;
