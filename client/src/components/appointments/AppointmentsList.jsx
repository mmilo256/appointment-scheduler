import React, { useEffect, useState } from "react";
import AppointmentCard from "./AppointmentCard";
import { getAllAppointments } from "../../services/appointmentService";

function AppointmentsList() {
  // Estado local para almacenar la lista de audiencias
  /* const appointments = useAppointmentStore((state) => state.appointments); */
  const [appointments, setAppointments] = useState([])
  const [finishedAppointments, setFinishedAppointments] = useState([])
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    (async () => {
      const data = await getAllAppointments()
      const pendingAppointments = data.filter(appointment => appointment.status === "pendiente");
      const checkedAppointments = data.filter(appointment => appointment.status === "terminada");
      setAppointments(pendingAppointments)
      setFinishedAppointments(checkedAppointments)
    })()
  }, [refresh])

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-xl font-bold">Audiencias pendientes</h2>
        {appointments.map((appointment, index) => (
          <AppointmentCard key={index} data={appointment} setRefresh={setRefresh} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Audiencias finalizadas</h2>
        {finishedAppointments.map((appointment, index) => (
          <AppointmentCard key={index} data={appointment} setRefresh={setRefresh} />
        ))}
      </div>
    </div>
  );
}

export default AppointmentsList;
