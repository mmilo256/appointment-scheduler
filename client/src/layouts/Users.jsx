import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import UsersTable from "../components/users/UsersTable";
import Button from "../components/ui/Button";

function Users() {
  return (
    <Container>
      <Heading>Listado de usuarios</Heading>
      <div className="max-w-40 mb-5">
        <Button href="/users/create">Nuevo usuario</Button>
      </div>
      <UsersTable />
    </Container>
  );
}

export default Users;
