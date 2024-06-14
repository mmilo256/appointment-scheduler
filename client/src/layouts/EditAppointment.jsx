import { useSearchParams } from "react-router-dom";
import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import EditAppointmentForm from "../components/appointments/EditAppointmentForm";

function EditAppointment() {
  const [queryParameters] = useSearchParams();
  const id = queryParameters.get("id");
  return (
    <Container>
      <Heading className="text-center">Editar audiencia</Heading>
      <EditAppointmentForm />
    </Container>
  );
}

export default EditAppointment;
