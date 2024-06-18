import Heading from "../components/ui/Heading";
import Container from "../components/ui/Container";
import AddUserForm from "../components/users/AddUserForm";

function CreateUser() {
  return (
    <Container>
      <Heading className="text-center">Crear usuario</Heading>
      <AddUserForm />
    </Container>
  );
}

export default CreateUser;
