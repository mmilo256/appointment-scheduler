import React, { useContext, useEffect, useState } from "react";
import BaseTable from "../ui/BaseTable";
import { getAllDepartments } from "../../services/departmentService";
import DepartmentRowActions from "./DepartmentRowActions";
import { checkToken } from "../../utils/helpers";
import { AuthContext } from "../../context/AuthContext";

function DepartmentTable() {
  // Estado local para almacenar la lista de departamentos
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useContext(AuthContext);

  // Efecto de lado para obtener la lista de departamentos al cargar el componente
  useEffect(() => {
    // Función asincrónica para obtener los departamentos
    const getDepartments = async () => {
      setIsLoading(true);
      const isTokenExpired = checkToken(localStorage.getItem("jwt"));
      try {
        if (!isTokenExpired) {
          // Llamada a la función getAllDepartments del servicio para obtener los departamentos
          const data = await getAllDepartments();
          // Actualización del estado con la lista de departamentos obtenida
          setDepartments(data);
        } else {
          logout("expired");
        }
      } catch (error) {
        // Manejo de errores en caso de fallo al obtener los departamentos
        console.log("Error al obtener las direcciones.", error);
      } finally {
        setIsLoading(false);
      }
    };
    // Llamada a la función para obtener los departamentos al montar el componente
    getDepartments();
  }, [logout]);

  // Función para dar formato a los datos de los departamentos
  const formatData = () => {
    const formattedData = departments.map((department) => {
      // Formato de cada departamento con sus respectivos campos
      const departmentData = {
        id: department.id,
        name: department.dep_name,
        description:
          "Descripción breve y concisa de las responsabilidades de este departamento municipal.",
        actions: <DepartmentRowActions />, // Componente de acciones por fila
      };
      return departmentData;
    });
    return formattedData;
  };

  // Configuración de la tabla con columnas y datos formateados
  const table = {
    columns: [
      { label: "N°", styles: "w-16" },
      { label: "NOMBRE DE LA DIRECCIÓN", styles: "w-32" },
      { label: "DESCRIPCIÓN", styles: "w-96" },
      { label: "ACCIONES", styles: "w-40" },
    ],
    data: formatData(), // Datos formateados de los departamentos
  };

  // Renderizado de la tabla con los datos configurados
  return <BaseTable isLoading={isLoading} table={table} />;
}

export default DepartmentTable;
