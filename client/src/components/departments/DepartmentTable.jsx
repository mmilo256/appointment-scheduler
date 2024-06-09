import React, { useEffect, useState } from "react";
import BaseTable from "../ui/BaseTable";
import { getAllDepartments } from "../../services/departmentService";
import DepartmentRowActions from "./DepartmentRowActions";

function DepartmentTable() {
  // Estado local para almacenar la lista de departamentos
  const [departments, setDepartments] = useState([]);

  // Efecto de lado para obtener la lista de departamentos al cargar el componente
  useEffect(() => {
    // Función asincrónica para obtener los departamentos
    const getDepartments = async () => {
      try {
        // Llamada a la función getAllDepartments del servicio para obtener los departamentos
        const data = await getAllDepartments();
        // Actualización del estado con la lista de departamentos obtenida
        setDepartments(data);
        console.log("Direcciones cargadas");
      } catch (error) {
        // Manejo de errores en caso de fallo al obtener los departamentos
        console.log("Error al obtener las direcciones.", error);
      }
    };
    // Llamada a la función para obtener los departamentos al montar el componente
    getDepartments();
  }, []);

  // Función para dar formato a los datos de los departamentos
  const formatData = () => {
    const formattedData = departments.map((department) => {
      // Formato de cada departamento con sus respectivos campos
      const departmentData = {
        id: department.id,
        name: department.dep_name,
        description:
          "En esta columna va una descripción breve y concisa de las responsabilidades de este departamento municipal.",
        actions: <DepartmentRowActions />, // Componente de acciones por fila
      };
      return departmentData;
    });
    return formattedData;
  };

  // Configuración de la tabla con columnas y datos formateados
  const table = {
    columns: ["N°", "NOMBRE DE LA DIRECCIÓN", "DESCRIPCIÓN", "ACCIONES"],
    data: formatData(), // Datos formateados de los departamentos
  };

  // Renderizado de la tabla con los datos configurados
  return <BaseTable table={table} />;
}

export default DepartmentTable;
