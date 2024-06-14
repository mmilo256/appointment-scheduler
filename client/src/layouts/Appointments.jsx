import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import AppointmentsList from "../components/appointments/AppointmentsList";
import BaseModal from "../components/ui/BaseModal";
import { useAppointmentStore } from "../stores/useAppointmentStore";
import { useEffect } from "react";

function Appointments() {
  const getAllAppointments = useAppointmentStore(
    (state) => state.getAllAppointments
  );

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
      <AppointmentsList />
    </Container>
  );
}

export default Appointments;
