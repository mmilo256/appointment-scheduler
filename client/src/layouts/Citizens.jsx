import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import CitizensTable from "../components/citizens/CitizensTable";
import { useCitizenStore } from "../stores/useCitizenStore";
import { useEffect } from "react";

function Citizens() {
  const getAllCitizens = useCitizenStore((state) => state.getAllCitizens);

  useEffect(() => {
    (async () => {
      await getAllCitizens();
    })();
  }, [getAllCitizens]);

  return (
    <Container>
      <Heading>Listado de ciudadanos</Heading>
      <div className="max-w-40 mb-5">
        <Button href="/citizens/create">Nuevo ciudadano</Button>
      </div>
      <CitizensTable />
    </Container>
  );
}

export default Citizens;
