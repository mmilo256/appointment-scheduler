import BaseTable from "../ui/BaseTable";
import { useCitizenStore } from "../../stores/useCitizenStore";
import CitizenTableActions from "./CitizenTableActions";

function CitizensTable() {
  const citizens = useCitizenStore((state) => state.citizens);

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
