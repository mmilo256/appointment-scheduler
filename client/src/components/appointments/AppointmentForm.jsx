import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import { createAppointment } from "../../services/appointmentService";

function AppointmentForm({ citizenData }) {

  const [cause, setCause] = useState("");
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (Object.values(citizenData).length !== 0 && cause) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [cause, citizenData])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const data = {
      materia: cause,
      ciudadano_id: citizenData.id
    };
    try {
      await createAppointment(data);
      navigate("/appointments");
    } catch (error) {
      console.log(error)
      alert("No se pudo crear la audiencia")
    } finally {
      setIsLoading(false)
    }
  };

  // Renderización del formulario con los botones y la lógica de envío
  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="textarea"
        label="Materia"
        value={cause}
        onChange={(e) => { setCause(e.target.value) }}
      />
      <div className="flex ml-auto mt-5 gap-2 w-60 md:w-96">
        <Button href="/appointments">Volver</Button>
        <Button disabled={isLoading || !isValid} color="secondary" type="submit">
          Crear audiencia
        </Button>
      </div>
    </form>
  );
}

export default AppointmentForm;
