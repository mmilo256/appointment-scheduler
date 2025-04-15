import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { formatRut, verifyRut } from "../../utils/helpers";
import Input from "../ui/Input";
import { updateCitizen } from "../../services/citizenService";
import BaseInput from "../ui/BaseInput";
import BaseButton from "../ui/BaseButton";

function EditCitizenForm({ data }) {

  const [rut, setRut] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");

  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setRut(data.rut || "")
    setName(data.nombres || "")
    setLastName(data.apellidos || "")
    setAddress(data.direccion || "")
    setEmail(data.email || "")
    setPhone(data.telefono || "")
    setPhone2(data.telefono_2 || "")
  }, [data])

  useEffect(() => {
    if (rut && name && lastName && address && phone) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [address, lastName, name, phone, rut])

  // Hook para la navegación
  const navigate = useNavigate();

  // Función para manejar la creación de un nuevo ciudadano
  const onEditCitizen = async (e) => {
    e.preventDefault();
    const dataToEdit = {
      rut,
      nombres: name,
      apellidos: lastName,
      direccion: address,
      email,
      telefono: phone,
      telefono_2: phone2
    };

    try {
      if (verifyRut(rut)) {
        console.log(dataToEdit)
        await updateCitizen(data.id, dataToEdit);
        navigate("/citizens");
      } else {
        alert("El RUT es inválido");
      }
    } catch (error) {
      console.log("No se pudo crear el ciudadano", error);
    }
  };

  // Formatear y validar RUT
  const validateRut = (e) => {
    setRut(formatRut(e.target.value));
  };

  // Renderización del formulario con los botones y la lógica de envío
  return (
    <form onSubmit={onEditCitizen}>
      <BaseInput
        value={rut}
        onChange={validateRut}
        max={12}
        label="RUT" />
      <div className=" grid grid-cols-2 gap-5">
        <BaseInput
          label="Nombres"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <BaseInput
          label="Apellidos"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <BaseInput
          label="Dirección"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <BaseInput
          label="Correo electrónico"
          type="email"
          required={false}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <BaseInput
          label="Teléfono"
          type="number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <BaseInput
          label="Teléfono 2"
          required={false}
          type="number"
          value={phone2}
          onChange={(e) => {
            setPhone2(e.target.value);
          }}
        />
      </div>
      <div className="flex gap-2 max-w-80 my-4 ml-auto">
        <BaseButton color="secondary" text="Volver" href="/citizens" />
        <BaseButton disabled={!isValid} type="submit" text="Guardar cambios" />
      </div>
    </form>
  );
}

export default EditCitizenForm;
