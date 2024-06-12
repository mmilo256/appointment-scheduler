import React from "react";
import AppointmentCard from "./AppointmentCard";
import { format } from "date-fns";
import { es } from "date-fns/locale";

function AppointmentsCardsGroup({ data, setRefreshData }) {
  return (
    <div>
      {/* Título con la fecha formateada */}
      <h2 className="text-2xl text-primary-500 font-semibold mb-2">
        {format(new Date(data.date), "d 'de' MMMM 'de' yyyy", { locale: es })}
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
