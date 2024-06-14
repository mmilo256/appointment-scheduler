import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import UsersTable from "../components/users/UsersTable";

function Users() {
  return (
    <Container>
      <Heading>Listado de usuarios</Heading>
      <div className="bg-blue-200 p-2 rounded mb-5">
        <p className="font-bold text-lg">Permisos de usuario</p>
        <p>
          <span className="font-semibold">1 - Administrador:</span> Puede
          realizar todas las operaciones
        </p>
        <p>
          <span className="font-semibold">2 - Gestor:</span> Puede realizar
          todas las operaciones menos crear usuarios
        </p>
        <p>
          <span className="font-semibold">3 - Operador:</span> Puede realizar
          todas las operaciones menos crear usuarios, agregar propuestas a las
          audiencias, derivar audiencias ni editar derivaciones
        </p>
      </div>
      <UsersTable />
    </Container>
  );
}

export default Users;
