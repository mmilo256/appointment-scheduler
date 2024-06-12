import React, { useContext, useEffect, useState } from "react";
import BaseForm from "../ui/BaseForm";
import {
  createUser,
  getUserById,
  updateUser,
} from "../../services/userService";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { checkToken } from "../../utils/helpers";

function UserForm({ edit, userId }) {
  // Estado para almacenar los datos del usuario
  const [userData, setUserData] = useState({});
  // Hook para la navegación
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // Datos por defecto para los inputs del formulario
  const defaultData = {
    username: userData?.username,
    password: userData?.password,
  };

  // Efecto de lado para obtener un usuario por su ID cuando se está editando
  useEffect(() => {
    if (edit) {
      // Función asincrónica para obtener al usuario
      const getUsers = async () => {
        const isTokenExpired = checkToken(localStorage.getItem("jwt"));
        try {
          if (!isTokenExpired) {
            // Llamada al servicio para obtener al usuario por su ID
            const data = await getUserById(userId);
            // Actualización del estado con los datos del usuario obtenidos
            setUserData(data);
          } else {
            logout("expired");
          }
        } catch (error) {
          // Manejo de errores en caso de fallo al obtener al usuario
          console.log("Error al obtener al usuario.", error);
        }
      };
      // Llamada a la función para obtener al usuario al montar el componente
      getUsers();
    }
  }, [userId, edit, logout]); // Dependencias del efecto: se ejecuta cuando cambian userId o edit

  // Definición de los inputs del formulario
  const inputs = [
    {
      label: "Nombre de usuario",
      id: "username",
      styles: "col-span-2",
      type: "text",
      defaultValue: defaultData.username,
    },
    {
      label: "Contraseña",
      id: "password",
      type: "password",
      styles: "col-span-2",
      defaultValue: defaultData.password,
    },
  ];

  // Función para manejar la creación de un nuevo usuario
  const onCreateUser = async (data) => {
    console.log("Data:", data);
    const isTokenExpired = checkToken(localStorage.getItem("jwt"));
    try {
      if (!isTokenExpired) {
        // Llamada al servicio para crear un nuevo usuario
        await createUser(data);
        navigate("/users");
      } else {
        logout("expired");
      }
    } catch (error) {
      // Manejo de errores en caso de fallo al crear al usuario
      alert("Debes completar todos los campos");
      throw error;
    }
  };

  // Función para manejar la edición de un usuario existente
  const onEditUser = async (data) => {
    // Preparar un objeto con los nuevos datos del usuario
    const newData = {};
    if (data.username) newData.username = data.username;
    if (data.password) newData.password = data.password;

    console.log("newData:", newData);
    // Comprobar que newData no está vacío antes de intentar actualizar el usuario
    if (newData && Object.keys(newData).length > 0) {
      // Verificar si el nombre de usuario ha cambiado antes de actualizar
      if (newData.username !== userData.username) {
        const isTokenExpired = checkToken(localStorage.getItem("jwt"));
        try {
          if (!isTokenExpired) {
            // Llamada al servicio para actualizar al usuario
            await updateUser(userId, newData);
            // Limpiar los datos por defecto después de la actualización
            defaultData.username = "";
            defaultData.password = "";
            // Navegar de vuelta a la lista de usuarios
            navigate("/users");
          } else {
            logout("expired");
          }
        } catch (error) {
          // Manejo de errores en caso de fallo al actualizar al usuario
          console.log("No se pudo editar el usuario");
          throw error;
        }
      }
    }
  };

  // Renderización del formulario con los botones y la lógica de envío
  return (
    <BaseForm
      footer={
        <div className="flex gap-2 max-w-80 ml-auto">
          <Button href="/users">Volver</Button>
          {
            <Button type="submit">
              {edit ? "Editar usuario" : "Crear usuario"}
            </Button>
          }
        </div>
      }
      onSubmit={edit ? onEditUser : onCreateUser}
      inputs={inputs}
    />
  );
}

export default UserForm;
