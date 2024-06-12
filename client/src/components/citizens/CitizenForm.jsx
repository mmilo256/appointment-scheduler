import React, { useContext, useEffect, useState } from "react";
import BaseForm from "../ui/BaseForm";
import {
  createCitizen,
  getCitizenById,
  updateCitizen,
} from "../../services/citizenService";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { checkToken } from "../../utils/helpers";

function CitizenForm({ edit, citizenId }) {
  // Estado para almacenar los datos del ciudadano
  const [citizenData, setCitizenData] = useState({});
  // Hook para la navegación
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // Efecto de lado para obtener un ciudadano por su ID cuando se está editando
  useEffect(() => {
    if (edit) {
      const getCitizen = async () => {
        const isTokenExpired = checkToken(localStorage.getItem("jwt"));
        try {
          if (!isTokenExpired) {
            const data = await getCitizenById(citizenId);
            setCitizenData(data);
          } else {
            logout("expired");
          }
        } catch (error) {
          console.log("Error al obtener al ciudadano.", error);
        }
      };
      getCitizen();
    }
  }, [citizenId, edit, logout]);

  // Datos por defecto para los inputs del formulario
  const defaultData = {
    rut: citizenData?.rut,
    firstName: citizenData?.first_name,
    lastName: citizenData?.last_name,
    address: citizenData?.address,
    email: citizenData?.email,
    phone: citizenData?.phone,
    phone2: citizenData?.phone_2,
  };

  // Definición de los inputs del formulario
  const inputs = [
    {
      label: "RUT",
      id: "rut",
      type: "text",
      styles: "col-span-2",
      defaultValue: defaultData.rut,
    },
    {
      label: "Nombres",
      id: "first_name",
      type: "text",
      defaultValue: defaultData.firstName,
    },
    {
      label: "Apellidos",
      id: "last_name",
      type: "text",
      defaultValue: defaultData.lastName,
    },
    {
      label: "Dirección",
      id: "address",
      type: "text",
      defaultValue: defaultData.address,
    },
    {
      label: "Correo electrónico",
      id: "email",
      type: "text",
      defaultValue: defaultData.email,
    },
    {
      label: "Telefono",
      id: "phone",
      type: "text",
      defaultValue: defaultData.phone,
    },
    {
      label: "Telefono 2",
      id: "phone_2",
      type: "text",
      defaultValue: defaultData.phone2,
    },
  ];

  // Función para manejar la creación de un nuevo ciudadano
  const onCreateCitizen = async (data) => {
    const isTokenExpired = checkToken(localStorage.getItem("jwt"));
    try {
      if (!isTokenExpired) {
        await createCitizen(data);
        navigate("/citizens");
      } else {
        logout("expired");
      }
    } catch (error) {
      console.log("No se pudo crear el ciudadano");
      throw error;
    }
  };

  // Función para manejar la edición de un ciudadano existente
  const onEditCitizen = async (data) => {
    const newData = {};
    if (data.rut) newData.rut = data.rut;
    if (data.first_name) newData.first_name = data.first_name;
    if (data.last_name) newData.last_name = data.last_name;
    if (data.address) newData.address = data.address;
    if (data.email) newData.email = data.email;
    if (data.phone) newData.phone = data.phone;
    if (data.phone_2) newData.phone_2 = data.phone_2;

    if (newData && Object.keys(newData).length > 0) {
      const isTokenExpired = checkToken(localStorage.getItem("jwt"));
      try {
        if (!isTokenExpired) {
          await updateCitizen(citizenId, newData);
          navigate("/citizens");
          (defaultData.rut = ""),
            (defaultData.firstName = ""),
            (defaultData.lastName = ""),
            (defaultData.address = ""),
            (defaultData.email = ""),
            (defaultData.phone = ""),
            (defaultData.phone2 = "");
        } else {
          logout("expired");
        }
      } catch (error) {
        console.log("No se pudo editar el ciudadano");
        throw error;
      }
    }
  };

  // Renderización del formulario con los botones y la lógica de envío
  return (
    <BaseForm
      footer={
        <div className="flex gap-2 max-w-80 ml-auto">
          <Button href="/citizens">Volver</Button>
          {edit ? (
            <Button type="submit">Editar ciudadano</Button>
          ) : (
            <Button type="submit">Crear ciudadano</Button>
          )}
        </div>
      }
      onSubmit={edit ? onEditCitizen : onCreateCitizen}
      inputs={inputs}
    />
  );
}

export default CitizenForm;
