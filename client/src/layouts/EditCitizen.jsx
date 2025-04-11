import Heading from "../components/ui/Heading";
import Container from "../components/ui/Container";
import EditCitizenForm from "../components/citizens/EditCitizenForm";
import { useEffect, useState } from "react";
import { getCitizenById } from "../services/citizenService";
import { useLocation } from "react-router-dom";

function CreateCitizen() {

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const id = params.get("id")

  const [citizen, setCitizen] = useState({})

  useEffect(() => {
    (async () => {
      const data = await getCitizenById(id)
      setCitizen(data)
    })()
  }, [id])

  return (
    <Container>
      <Heading className="text-center">Editar ciudadano</Heading>
      <EditCitizenForm data={citizen} />
    </Container>
  );
}

export default CreateCitizen;
