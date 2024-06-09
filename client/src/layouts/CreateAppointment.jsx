import Heading from "../components/ui/Heading";
import Container from "../components/ui/Container";
import AppointmentForm from "../components/appointments/AppointmentForm";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import CitizenDetails from "../components/appointments/CitizenDetails";
import { getCitizenByRUT } from "../services/citizenService";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { checkToken } from "../utils/helpers";
function CreateAppointment() {
  const { register, handleSubmit } = useForm();
  const [citizen, setCitizen] = useState({});

  const onRutSubmit = async (citizenData) => {
    const isTokenExpired = checkToken(localStorage.getItem("jwt"));
    try {
      if (!isTokenExpired) {
        // Llamada a la función getAllUsers del servicio para obtener los usuarios
        const data = await getCitizenByRUT(citizenData.rut);
        // Actualización del estado con la lista de usuarios obtenida
        setCitizen(data);
      } else {
        logout("expired");
      }
    } catch (error) {
      // Manejo de errores en caso de fallo al obtener los usuarios
      console.log("Error al obtener los usuarios.", error);
    }
  };

  return (
    <Container>
      <Heading className="text-center">Crear audiencia</Heading>
      <div className="grid grid-cols-7 gap-10">
        <div className="col-span-2">
          <CitizenDetails data={citizen} />
        </div>
        <div className="col-span-3">
          <form
            onSubmit={handleSubmit(onRutSubmit)}
            className="flex items-end gap-10"
          >
            <Input
              register={{ ...register("rut") }}
              className="w-full"
              label="RUT del solicitante"
            />
            <div className="mb-5 w-48">
              <Button type="submit">Buscar</Button>
            </div>
          </form>
          <AppointmentForm />
        </div>
        <div className="col-span-2">
          <p>Próximas audiencias</p>
        </div>
      </div>
    </Container>
  );
}

export default CreateAppointment;
