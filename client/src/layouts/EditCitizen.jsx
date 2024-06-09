import { useSearchParams } from "react-router-dom";
import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import CitizenForm from "../components/citizens/CitizenForm";

function EditCitizen() {
  const [queryParameters] = useSearchParams();
  const id = queryParameters.get("id");
  return (
    <Container>
      <Heading className="text-center">Editar ciudadano</Heading>
      <CitizenForm edit citizenId={id} />
    </Container>
  );
}

export default EditCitizen;
