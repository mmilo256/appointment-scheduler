import { useEffect } from "react";
import BaseTable from "../ui/BaseTable";
import { useUserStore } from "../../stores/useUserStore";
import { useAuthStore } from "../../stores/useAuthStore";

import UserTableActions from "./UserTableActions";

function UserTable() {
  // Estado local para almacenar la lista de usuarios
  const users = useUserStore((state) => state.users);
  const role = useAuthStore(state => state.role)

  // Función para dar formato a los datos de los usuarios
  const formatData = () => {
    const formattedData = users.map((user) => {
      // Formato de cada usuario con sus respectivos campos
      const userData = {
        id: user.id,
        fullName: `${user.first_name} ${user.last_name}`,
        name: user.username,
        password: user.email,
        role: user.role,
        actions: user.id !== 1 ? role === 1 && <UserTableActions data={user} /> : "",
      };
      return userData;
    });
    return formattedData;
  };

  // Configuración de la tabla con columnas y datos formateados
  const table = {
    columns: [
      { label: "N°" },
      { label: "NOMBRE COMPLETO" },
      { label: "USUARIO" },
      { label: "CORREO ELECTRÓNICO" },
      { label: "PERMISOS" },
      { label: "ACCIONES" },
    ],
    data: formatData(), // Datos formateados de los usuarios
  };

  // Renderizado de la tabla con los datos configurados
  return <BaseTable table={table} />;
}

export default UserTable;
