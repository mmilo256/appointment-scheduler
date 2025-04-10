import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import { useEffect, useState } from "react";
import Pagination from "../components/ui/Pagination";
import { getAllCitizens } from "../services/citizenService";
import BaseTable from "../components/ui/BaseTable";
import CitizenTableActions from "../components/citizens/CitizenTableActions";

function Citizens() {

  const [citizens, setCitizens] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    (async () => {
      const data = await getAllCitizens()
      const formattedData = data.citizens.map((citizen) => ({
        rut: citizen.rut,
        fullName: `${citizen.nombres} ${citizen.apellidos}`,
        address: citizen.direccion,
        email: citizen.email ?? "(Sin correo)",
        phone: citizen.telefono,
        phone2: citizen.telefono_2 ?? "(Sin número)",
        actions: <CitizenTableActions setRefresh={setRefresh} data={citizen} />
      }))
      setCitizens(formattedData)
    })();
  }, [refresh]);

  const columns = [
    { label: "RUT" },
    { label: "NOMBRE COMPLETO" },
    { label: "DIRECCIÓN" },
    { label: "CORREO ELECTRÓNICO" },
    { label: "TELEFONO" },
    { label: "TELÉFONO 2" },
    { label: "ACCIONES" },
  ]

  return (
    <Container>
      <Heading>Listado de ciudadanos</Heading>
      <div className="max-w-40 mb-5">
        <Button href="/citizens/create">Nuevo ciudadano</Button>
      </div>
      <BaseTable data={citizens} columns={columns} />
      <div className="flex justify-center py-4">
        {/* <Pagination getItems={citizens} currentPage={currentPage} totalPages={totalPages} /> */}
      </div>
    </Container>
  );
}

export default Citizens;
