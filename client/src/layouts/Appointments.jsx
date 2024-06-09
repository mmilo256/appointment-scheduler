import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import AppointmentsTable from "../components/appointments/AppointmentsTable";

function Appointments() {
  return (
    <Container>
      <Heading>Listado de audiencias</Heading>
      <div className="max-w-40 mb-5">
        <Button href="/appointments/create">Crear audiencia</Button>
      </div>
      <AppointmentsTable />
    </Container>
  );
}

export default Appointments;
