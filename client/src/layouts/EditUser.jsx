import { useSearchParams } from "react-router-dom";
import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";

function EditUser() {
  const [queryParameters] = useSearchParams();
  const id = queryParameters.get("id");
  return (
    <Container>
      <Heading className="text-center">Editar usuario</Heading>
    </Container>
  );
}

export default EditUser;
