import Heading from "../components/ui/Heading";
import Container from "../components/ui/Container";
import CreateCitizenForm from "../components/citizens/CreateCitizenForm";

function CreateCitizen() {
  return (
    <Container>
      <Heading className="text-center">Crear ciudadano</Heading>
      <CreateCitizenForm />
    </Container>
  );
}

export default CreateCitizen;
