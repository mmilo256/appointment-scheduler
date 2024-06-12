import React from "react";
import AppointmentCard from "./AppointmentCard";
import { format } from "date-fns";
import { es } from "date-fns/locale";
function AppointmentsCardsGroup({ data }) {
  return (
    <div>
      <h2 className="text-2xl text-primary-500 font-semibold mb-2">
        {format(new Date(data.date), "d 'de' MMMM 'de' yyyy", { locale: es })}
      </h2>
      <div className="flex flex-col gap-4">
        {data.appointments.map((appointment) => {
          return <AppointmentCard key={appointment.id} data={appointment} />;
        })}
      </div>
    </div>
  );
}

export default AppointmentsCardsGroup;
