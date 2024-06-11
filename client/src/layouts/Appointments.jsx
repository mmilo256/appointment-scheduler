import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import AppointmentsTable from "../components/appointments/AppointmentsTable";
import AppointmentsList from "../components/appointments/AppointmentsList";

function Appointments() {
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
