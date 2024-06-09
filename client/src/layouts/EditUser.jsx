import { useParams, useSearchParams } from "react-router-dom";
import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import UserForm from "../components/users/UserForm";

function EditUser() {
  const [queryParameters] = useSearchParams();
  const id = queryParameters.get("id");
  return (
    <Container>
      <Heading>Editar usuario</Heading>
      <UserForm edit userId={id} />
    </Container>
  );
}

export default EditUser;
