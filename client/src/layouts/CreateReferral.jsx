import React, { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import AppointmentDetails from "../components/referrals/AppointmentDetails";
import ReferralForm from "../components/referrals/ReferralForm";
import { useSearchParams } from "react-router-dom";
import { checkToken } from "../utils/helpers";
import { getAppointmentById } from "../services/appointmentService";

function CreateReferral() {
  const [queryParameters] = useSearchParams();
  const id = queryParameters.get("id");

  const [appointment, setAppointment] = useState({});

  useEffect(() => {
    (async () => {
      const isTokenExpired = checkToken(localStorage.getItem("jwt"));
      try {
        if (!isTokenExpired) {
          // Llamada a la función getAllUsers del servicio para obtener los usuarios
          const data = await getAppointmentById(id);
          // Actualización del estado con la lista de usuarios obtenida
          if (data) {
            setAppointment(data);
          } else {
            alert("Error al obtener la audiencia");
          }
        } else {
          logout("expired");
        }
      } catch (error) {
        // Manejo de errores en caso de fallo al obtener los usuarios
        console.log("Error al obtener los usuarios.", error);
      }
    })();
  }, [id]);

  return (
    <Container>
      <Heading className="text-center">Derivar audiencia</Heading>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-5">
          <AppointmentDetails appointment={appointment} id={id} />
        </div>
        <div className="col-span-7">
          <ReferralForm appointment={appointment} />
        </div>
      </div>
    </Container>
  );
}

export default CreateReferral;