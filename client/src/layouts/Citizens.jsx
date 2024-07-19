import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import CitizensTable from "../components/citizens/CitizensTable";
import { useCitizenStore } from "../stores/useCitizenStore";
import { useEffect } from "react";
import Pagination from "../components/ui/Pagination";

function Citizens() {
  const getAllCitizens = useCitizenStore((state) => state.getAllCitizens);
  const totalPages = useCitizenStore(state => state.totalPages)
  const currentPage = useCitizenStore(state => state.currentPage)

  useEffect(() => {
    (async () => {
      await getAllCitizens(1);
    })();
  }, [getAllCitizens]);

  return (
    <Container>
      <Heading>Listado de ciudadanos</Heading>
      <div className="max-w-40 mb-5">
        <Button href="/citizens/create">Nuevo ciudadano</Button>
      </div>
      <CitizensTable />
      <div className="flex justify-center py-4">
      <Pagination getItems={getAllCitizens} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </Container>
  );
}

export default Citizens;
