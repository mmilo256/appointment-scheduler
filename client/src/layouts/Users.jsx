import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import UsersTable from "../components/users/UsersTable";
import Button from "../components/ui/Button";
import Pagination from "../components/ui/Pagination";
import { getAllUsers } from "../services/userService";
import BaseTable from "../components/ui/BaseTable";

function Users() {

  const [users, setUsers] = useState([])

  // Efecto de lado para obtener la lista de usuarios al cargar el componente
  useEffect(() => {
    (async () => {
      const data = await getAllUsers()
      const formattedData = data.users.map(user => ({
        username: user.username,
        fullName: `${user.nombres} ${user.apellidos}`,
        email: user.email
      }))
      setUsers(formattedData)
    })()
  }, []);

  const columns = [
    { label: "Nombre funcionario" },
    { label: "Nombre de usuario" },
    { label: "Correo electrónico" }
  ]



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
      <BaseTable data={users} columns={columns} />
    </Container>
  );
}

export default Users;
