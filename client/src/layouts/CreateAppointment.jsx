import Heading from "../components/ui/Heading";
import Container from "../components/ui/Container";
import AppointmentForm from "../components/appointments/AppointmentForm";
import CitizenDetails from "../components/appointments/CitizenDetails";
import { useState } from "react";
import CitizenByRutForm from "../components/appointments/CitizenByRutForm";
function CreateAppointment() {

  const [citizen, setCitizen] = useState({});

  return (
    <Container>
      <Heading className="text-center">Crear audiencia</Heading>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <CitizenDetails data={citizen} />
        </div>
        <div className="md:col-span-7">
          <CitizenByRutForm setCitizen={setCitizen} />
          <AppointmentForm citizenData={citizen} />
        </div>
      </div>
    </Container>
  );
}

export default CreateAppointment;
