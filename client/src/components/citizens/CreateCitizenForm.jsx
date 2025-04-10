import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { formatRut, verifyRut } from "../../utils/helpers";
import Input from "../ui/Input";
import { createCitizen } from "../../services/citizenService";

function CreateCitizenForm() {

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const rutParam = queryParams.get("rut")

  const [rut, setRut] = useState(rutParam ?? "");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  // Hook para la navegación
  const navigate = useNavigate();

  // Función para manejar la creación de un nuevo ciudadano
  const onCreateCitizen = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const data = {
      rut,
      nombres: name,
      apellidos: lastName,
      direccion: address,
      telefono: phone,
    };
    if (phone2) {
      data.telefono_2 = phone2;
    }
    if (email) {
      data.email = email;
    }
    if (verifyRut(rut)) {
      try {
        await createCitizen(data);
        navigate("/citizens");
      } catch (error) {
        alert(error.message)
        console.log(error.message);
      }
    } else {
      alert("El RUT no es válido");
    }
    setIsLoading(false)
  };

  // Formatear y validar RUT
  const validateRut = (e) => {
    setRut(formatRut(e.target.value));
  };

  useEffect(() => {
    const validateForm = () => {
      if (rut && name && lastName && address && phone) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };

    validateForm();
  }, [address, lastName, name, phone, rut]);

  // Renderización del formulario con los botones y la lógica de envío
  return (
    <form onSubmit={onCreateCitizen}>
      <Input
        label="RUT"
        max={12}
        type="text"
        value={rut}
        onChange={validateRut}
      />
      <div className=" grid grid-cols-2 gap-5">
        <Input
          label="Nombres"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          label="Apellidos"
          type="text"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Input
          label="Dirección"
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <Input
          label="Correo electrónico"
          type="email"
          optional
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Input
          label="Teléfono"
          type="number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <Input
          label="Teléfono 2"
          optional
          type="number"
          value={phone2}
          onChange={(e) => {
            setPhone2(e.target.value);
          }}
        />
      </div>
      <div className="flex gap-2 max-w-80 my-4 ml-auto">
        <Button href="/citizens">Volver</Button>
        <Button disabled={!isValid || isLoading} type="submit">
          Crear ciudadano
        </Button>
      </div>
    </form>
  );
}

export default CreateCitizenForm;
