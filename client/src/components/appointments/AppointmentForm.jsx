import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import { createAppointment } from "../../services/appointmentService";
import BaseInput from "../ui/BaseInput";
import BaseButton from "../ui/BaseButton";

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
      <BaseInput value={cause} onChange={(e) => { setCause(e.target.value) }} type="textarea" label={"Materia"} placeholder="Motivo de la audiencia" />
      <div className="w-44 ml-auto">
        <BaseButton type="submit" disabled={!isValid} text="Crear audiencia" />
      </div>
    </form>
  );
}

export default AppointmentForm;
