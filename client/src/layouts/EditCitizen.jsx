import Heading from "../components/ui/Heading";
import Container from "../components/ui/Container";
import EditCitizenForm from "../components/citizens/EditCitizenForm";

function CreateCitizen() {
  return (
    <Container>
      <Heading className="text-center">Editar ciudadano</Heading>
      <EditCitizenForm />
    </Container>
  );
}

export default CreateCitizen;
