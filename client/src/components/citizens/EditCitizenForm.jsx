import React, { useContext, useState } from "react";
import Button from "../ui/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { checkToken, formatRut, verifyRut } from "../../utils/helpers";
import Input from "../ui/Input";
import { useCitizenStore } from "../../stores/useCitizenStore";

function EditCitizenForm() {
  const selectedCitizen = useCitizenStore((state) => state.selectedCitizen);
  const editCitizen = useCitizenStore((state) => state.editCitizen);

  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));

  const [rut, setRut] = useState(selectedCitizen.rut ?? "");
  const [name, setName] = useState(selectedCitizen.first_name ?? "");
  const [lastName, setLastName] = useState(selectedCitizen.last_name ?? "");
  const [address, setAddress] = useState(selectedCitizen.address ?? "");
  const [email, setEmail] = useState(selectedCitizen.email ?? "");
  const [phone, setPhone] = useState(selectedCitizen.phone ?? "");
  const [phone2, setPhone2] = useState(selectedCitizen.phone_2 ?? "");
  // Hook para la navegación
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // Función para manejar la creación de un nuevo ciudadano
  const onEditCitizen = async (e) => {
    e.preventDefault();
    const dataToEdit = {};
    if (rut) dataToEdit.rut = rut;
    if (name) dataToEdit.first_name = name;
    if (lastName) dataToEdit.last_name = lastName;
    if (address) dataToEdit.address = address;
    if (email) dataToEdit.email = email;
    if (phone) dataToEdit.phone = phone;
    if (phone2) dataToEdit.phone_2 = phone2;

    const isTokenExpired = checkToken(localStorage.getItem("jwt"));
    try {
      if (verifyRut(rut)) {
        if (!isTokenExpired) {
          await editCitizen(selectedCitizen.id, dataToEdit);
          navigate("/citizens");
        } else {
          logout("expired");
        }
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
        <Button type="submit">Editar ciudadano</Button>
      </div>
    </form>
  );
}

export default EditCitizenForm;
