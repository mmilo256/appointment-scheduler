import React, { useContext, useEffect, useState } from "react";
import BaseTable from "../ui/BaseTable";
import ActionsRow from "../ui/ActionsRow";
import { deleteCitizen, getAllCitizens } from "../../services/citizenService";
import { checkToken } from "../../utils/helpers";
import { AuthContext } from "../../context/AuthContext";

function CitizensTable() {
  // Estado local para almacenar la lista de ciudadanos
  const [citizens, setCitizens] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const { logout } = useContext(AuthContext);

  // Efecto de lado para obtener la lista de ciudadanos al cargar el componente
  useEffect(() => {
    // Función asincrónica para obtener los ciudadanos
    const getCitizens = async () => {
      const isTokenExpired = checkToken(localStorage.getItem("jwt"));
      try {
        if (!isTokenExpired) {
          // Llamada a la función getAllCitizens del servicio para obtener los ciudadanos
          const data = await getAllCitizens();
          // Actualización del estado con la lista de ciudadanos obtenida
          setCitizens(data);
        } else {
          logout("expired");
        }
      } catch (error) {
        // Manejo de errores en caso de fallo al obtener los ciudadanos
        console.log("Error al obtener los ciudadanos.", error);
      }
    };
    // Llamada a la función para obtener los ciudadanos al montar el componente
    getCitizens();
  }, [refreshData, logout]);

  const onDelete = async (id) => {
    console.log("ID a eliminar:", id);
    try {
      await deleteCitizen(id);
      console.log("Ciudadano eliminado correctamente");
      setRefreshData((prevState) => !prevState);
    } catch (error) {
      throw error;
    }
  };

  // Función para dar formato a los datos de los ciudadanos
  const formatData = () => {
    const formattedData = citizens.map((citizen) => {
      // Formato de cada ciudadano con sus respectivos campos
      const citizenData = {
        rut: citizen.rut,
        fullName: `${citizen.first_name} ${citizen.last_name}`,
        address: citizen.address,
        email: citizen.email,
        phone: citizen.phone,
        phone2: citizen.phone_2 ?? "(Sin número)",
        actions: (
          <ActionsRow module="citizens" id={citizen.id} onDelete={onDelete} />
        ),
      };
      return citizenData;
    });
    return formattedData;
  };

  // Configuración de la tabla con columnas y datos formateados
  const table = {
    columns: [
      { label: "RUT", styles: "w-44" },
      { label: "NOMBRE COMPLETO", styles: "w-44" },
      { label: "DIRECCIÓN", styles: "w-44" },
      { label: "CORREO ELECTRÓNICO", styles: "w-44" },
      { label: "TELEFONO", styles: "w-44" },
      { label: "TELÉFONO 2", styles: "w-44" },
      { label: "ACCIONES", styles: "w-44" },
    ],
    data: formatData(), // Datos formateados de los ciudadanos
  };

  // Renderizado de la tabla con los datos configurados
  return <BaseTable table={table} />;
}

export default CitizensTable;
