import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import { useEffect, useState } from "react";
import Pagination from "../components/ui/Pagination";
import { getAllCitizens } from "../services/citizenService";
import BaseTable from "../components/ui/BaseTable";
import CitizenTableActions from "../components/citizens/CitizenTableActions";
import SearchBar from "../components/ui/SearchBar";

function Citizens() {

  const [citizens, setCitizens] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 10
  const [searchQuery, setSearchQuery] = useState("")
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    (async () => {
      const data = await getAllCitizens(currentPage, pageSize, searchQuery)
      setTotalPages(data.totalPages)
      const formattedData = data.citizens.map((citizen) => ({
        rut: citizen.rut,
        fullName: `${citizen.nombres} ${citizen.apellidos}`,
        address: citizen.direccion,
        email: citizen.email ?? "",
        phone: citizen.telefono,
        phone2: citizen.telefono_2 ?? "",
        actions: <CitizenTableActions setRefresh={setRefresh} data={citizen} />
      }))
      setCitizens(formattedData)
    })();
  }, [refresh, currentPage, searchQuery]);

  const columns = [
    { label: "RUT" },
    { label: "NOMBRE COMPLETO" },
    { label: "DIRECCIÓN" },
    { label: "CORREO ELECTRÓNICO" },
    { label: "TELEFONO" },
    { label: "TELÉFONO 2" },
    { label: "ACCIONES" }
  ]

  return (
    <Container>
      <Heading>Listado de ciudadanos</Heading>
      <div className="max-w-40 mb-5">
        <Button href="/citizens/create">Nuevo ciudadano</Button>
      </div>
      <div className='my-2'>
        <SearchBar query={searchQuery} setQuery={setSearchQuery} />
      </div>
      <BaseTable data={citizens} columns={columns} />
      <div className="flex justify-center py-4">
        <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </Container>
  );
}

export default Citizens;
