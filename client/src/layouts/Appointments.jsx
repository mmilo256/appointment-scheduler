import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import AppointmentsList from "../components/appointments/AppointmentsList";
import { useEffect, useState } from "react";
import { getAllAppointments } from "../services/appointmentService";
import { getAllDepartments } from "../services/departmentService";

function Appointments() {

  const [appointments, setAppointments] = useState([])
  const [departments, setDepartments] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    (async () => {
      const data = await getAllAppointments()
      const departments = await getAllDepartments()
      setDepartments(departments)
      setAppointments(data)
    })();
  }, [refresh]);

  return (
    <Container>
      <Heading>Listado de audiencias</Heading>
      <div className="max-w-40 mb-5">
        <Button color="secondary" href="/appointments/create">
          Crear audiencia
        </Button>
      </div>
      {appointments.length === 0 && <p className="text-2xl text-slate-600">No hay audiencias pendientes</p>}
      <AppointmentsList data={appointments} departments={departments} setRefresh={setRefresh} />
    </Container>
  );
}

export default Appointments;
