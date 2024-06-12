import React, { useContext, useState } from "react";
import { createCitizen } from "../../services/citizenService";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { checkToken, formatRut } from "../../utils/helpers";
import Input from "../ui/Input";

function CreateCitizenForm() {
  const [rut, setRut] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");
  // Hook para la navegación
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // Función para manejar la creación de un nuevo ciudadano
  const onCreateCitizen = async (e) => {
    e.preventDefault();
    const data = {
      rut,
      first_name: name,
      last_name: lastName,
      address,
      phone,
    };
    if (phone2) {
      data.phone_2 = phone2;
    }
    if (email) {
      data.email = email;
    }
    if (rut && name && lastName && address && phone) {
      const isTokenExpired = checkToken(localStorage.getItem("jwt"));
      try {
        if (!isTokenExpired) {
          await createCitizen(data);
          navigate("/citizens");
        } else {
          logout("expired");
        }
      } catch (error) {
        console.log("No se pudo crear el ciudadano", error);
      }
    } else {
      alert("Rellene los campos requeridos");
    }
  };

  // Formatear y validar RUT
  const validateRut = (e) => {
    setRut(formatRut(e.target.value));
  };

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
        <Button type="submit">Crear ciudadano</Button>
      </div>
    </form>
  );
}

export default CreateCitizenForm;
