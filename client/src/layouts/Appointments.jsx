import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import AppointmentsList from "../components/appointments/AppointmentsList";
import { useAppointmentStore } from "../stores/useAppointmentStore";
import { useEffect } from "react";

function Appointments() {
  const getAllAppointments = useAppointmentStore(
    (state) => state.getAllAppointments
  );
  const appointments = useAppointmentStore(state => state.appointments)

  useEffect(() => {
    (async () => {
      await getAllAppointments();
    })();
  }, [getAllAppointments]);

  return (
    <Container>
      <Heading>Listado de audiencias</Heading>
      <div className="max-w-40 mb-5">
        <Button color="secondary" href="/appointments/create">
          Crear audiencia
        </Button>
      </div>
      {appointments.length === 0 && <p className="text-2xl text-slate-600">No hay audiencias pendientes</p>}
      <AppointmentsList />
    </Container>
  );
}

export default Appointments;
