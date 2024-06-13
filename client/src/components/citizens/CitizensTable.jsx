import React, { useContext, useEffect, useState } from "react";
import BaseTable from "../ui/BaseTable";
import ActionsRow from "../ui/ActionsRow";
import { deleteCitizen, getAllCitizens } from "../../services/citizenService";
import { checkToken } from "../../utils/helpers";
import { AuthContext } from "../../context/AuthContext";
import { useCitizenStore } from "../../stores/useCitizenStore";
import CitizenTableActions from "./CitizenTableActions";

function CitizensTable() {
  const getAllCitizens = useCitizenStore((state) => state.getAllCitizens);
  const citizens = useCitizenStore((state) => state.citizens);

  // Estado local para almacenar la lista de ciudadanos
  const [refreshData, setRefreshData] = useState(false);
  const { logout } = useContext(AuthContext);

  // Efecto de lado para obtener la lista de ciudadanos al cargar el componente
  useEffect(() => {
    // Función asincrónica para obtener los ciudadanos
    const getCitizens = async () => {
      const isTokenExpired = checkToken(localStorage.getItem("jwt"));
      try {
        if (!isTokenExpired) {
          getAllCitizens();
        } else {
          logout("expired");
        }
      } catch (error) {
        console.log("Error al obtener los ciudadanos.", error);
      }
    };
    getCitizens();
  }, [logout, getAllCitizens]);

  // Función para eliminar un ciudadano
  const onDelete = async (id) => {
    try {
      await deleteCitizen(id);
      // Refrescar la lista de ciudadanos después de la eliminación
      setRefreshData((prevState) => !prevState);
    } catch (error) {
      throw error;
    }
  };

  // Función para dar formato a los datos de los ciudadanos
  const formatTableData = () => {
    const formattedData = citizens.map((citizen) => {
      const citizenData = {
        rut: citizen.rut,
        fullName: `${citizen.first_name} ${citizen.last_name}`,
        address: citizen.address,
        email: citizen.email ?? "(Sin correo)",
        phone: citizen.phone,
        phone2: citizen.phone_2 ?? "(Sin número)",
        actions: <CitizenTableActions id={citizen.id} />,
      };
      return citizenData;
    });
    return formattedData;
  };

  // Configuración de la tabla con columnas y datos formateados
  const table = {
    columns: [
      { label: "RUT" },
      { label: "NOMBRE COMPLETO" },
      { label: "DIRECCIÓN" },
      { label: "CORREO ELECTRÓNICO" },
      { label: "TELEFONO" },
      { label: "TELÉFONO 2" },
      { label: "ACCIONES" },
    ],
    data: formatTableData(), // Datos formateados de los ciudadanos
  };

  // Renderizado de la tabla con los datos configurados
  return <BaseTable table={table} />;
}

export default CitizensTable;
