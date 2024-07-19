import { useEffect } from "react";
import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import UsersTable from "../components/users/UsersTable";
import { useUserStore } from "../stores/useUserStore";
import Button from "../components/ui/Button";
import { useAuthStore } from "../stores/useAuthStore";
import Pagination from "../components/ui/Pagination";

function Users() {
  const getAllUsers = useUserStore((state) => state.getAllUsers);
  const currentPage = useUserStore(state => state.currentPage)
  const totalPages = useUserStore(state => state.totalPages)
  const role = useAuthStore(state => state.role)

  // Efecto de lado para obtener la lista de usuarios al cargar el componente
  useEffect(() => {
    getAllUsers(1)
  }, [getAllUsers]);

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
      {role === 1 && <div className="w-52 my-5">
        <Button color="secondary" href="/users/create">
          Crear usuario
        </Button>
      </div>}
      <UsersTable />
      <div className="flex justify-center py-4">
      <Pagination getItems={getAllUsers} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </Container>
  );
}

export default Users;
