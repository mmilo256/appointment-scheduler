import { useSearchParams } from "react-router-dom";
import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import AppointmentForm from "../components/appointments/AppointmentForm";

function EditAppointment() {
  const [queryParameters] = useSearchParams();
  const id = queryParameters.get("id");
  return (
    <Container>
      <Heading className="text-center">Editar audiencia</Heading>
      <AppointmentForm edit appointmentId={id} />
    </Container>
  );
}

export default EditAppointment;
