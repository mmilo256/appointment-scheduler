import Heading from "../components/ui/Heading";
import Container from "../components/ui/Container";
import UserForm from "../components/users/UserForm";

function CreateUser() {
  return (
    <Container>
      <Heading>Crear usuario</Heading>
      <UserForm />
    </Container>
  );
}

export default CreateUser;
