import React, { useContext, useEffect, useState } from "react";
import BaseTable from "../ui/BaseTable";
import ActionsRow from "../ui/ActionsRow";
import { deleteUser, getAllUsers } from "../../services/userService";
import { checkToken } from "../../utils/helpers";
import { AuthContext } from "../../context/AuthContext";

function UserTable() {
  // Estado local para almacenar la lista de usuarios
  const [users, setUsers] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const { logout } = useContext(AuthContext);

  // Efecto de lado para obtener la lista de usuarios al cargar el componente
  useEffect(() => {
    // Función asincrónica para obtener los usuarios
    const getUsers = async () => {
      const isTokenExpired = checkToken(localStorage.getItem("jwt"));
      try {
        if (!isTokenExpired) {
          // Llamada a la función getAllUsers del servicio para obtener los usuarios
          const data = await getAllUsers();
          // Actualización del estado con la lista de usuarios obtenida
          setUsers(data);
        } else {
          logout("expired");
        }
      } catch (error) {
        // Manejo de errores en caso de fallo al obtener los usuarios
        console.log("Error al obtener los usuarios.", error);
      }
    };
    // Llamada a la función para obtener los usuarios al montar el componente
    getUsers();
  }, [refreshData, logout]);

  const onDelete = async (id) => {
    console.log("ID a eliminar:", id);
    try {
      await deleteUser(id);
      console.log("Usuario eliminado correctamente");
      setRefreshData((prevState) => !prevState);
    } catch (error) {
      throw error;
    }
  };

  // Función para dar formato a los datos de los usuarios
  const formatData = () => {
    const formattedData = users.map((user) => {
      // Formato de cada usuario con sus respectivos campos
      const userData = {
        id: user.id,
        name: user.username,
        password: user.password,
        actions: <ActionsRow module="users" id={user.id} onDelete={onDelete} />,
      };
      return userData;
    });
    return formattedData;
  };

  // Configuración de la tabla con columnas y datos formateados
  const table = {
    columns: [
      { label: "N°", styles: "w-44" },
      { label: "USUARIO", styles: "w-44" },
      { label: "CONTRASEÑA", styles: "w-44" },
      { label: "ACCIONES", styles: "w-44" },
    ],
    data: formatData(), // Datos formateados de los usuarios
  };

  // Renderizado de la tabla con los datos configurados
  return <BaseTable table={table} />;
}

export default UserTable;
