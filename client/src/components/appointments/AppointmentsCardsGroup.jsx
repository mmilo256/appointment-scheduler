import React from "react";
import AppointmentCard from "./AppointmentCard";
import { formatJustDate } from "../../utils/helpers";

function AppointmentsCardsGroup({ data }) {
  const formattedDate = formatJustDate(data.date);
  return (
    <div className="bg-white p-4 rounded">
      <h2 className="text-2xl text-primary-500 font-semibold mb-2">
        {formattedDate}
      </h2>
      <div className="flex flex-col gap-4">
        {data.appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} data={appointment} />
        ))}
      </div>
    </div>
  );
}

export default AppointmentsCardsGroup;
