import Heading from "../components/ui/Heading";
import Container from "../components/ui/Container";
import CitizenForm from "../components/citizens/CitizenForm";

function CreateCitizen() {
  return (
    <Container>
      <Heading className="text-center">Crear ciudadano</Heading>
      <CitizenForm />
    </Container>
  );
}

export default CreateCitizen;
