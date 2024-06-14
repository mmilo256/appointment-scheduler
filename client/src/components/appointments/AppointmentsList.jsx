import React from "react";
import { groupAppointments } from "../../utils/helpers";
import AppointmentsCardsGroup from "./AppointmentsCardsGroup";
import { useAppointmentStore } from "../../stores/useAppointmentStore";

function AppointmentsList() {
  // Estado local para almacenar la lista de audiencias
  const appointments = useAppointmentStore((state) => state.appointments);

  // Formatear las audiencias para agruparlas por fecha
  const groupedAppointments = groupAppointments(appointments);

  return (
    <div className="grid grid-cols-1 gap-4">
      {groupedAppointments.map((group, index) => {
        return <AppointmentsCardsGroup key={index} data={group} />;
      })}
    </div>
  );
}

export default AppointmentsList;
