import React, { useState } from "react";
import Input from "../ui/Input";
import { checkToken, formatRut, verifyRut } from "../../utils/helpers";
import { getCitizenByRUT } from "../../services/citizenService";
import CreateCitizenModal from "./CreateCitizenModal";

function CitizenByRutForm({ setCitizen }) {
  const [rut, setRut] = useState("");
  const [modal, setModal] = useState(false);

  const onSubmit = async () => {
    const isTokenExpired = checkToken(localStorage.getItem("jwt"));
    try {
      if (!isTokenExpired) {
        const data = await getCitizenByRUT(rut);
        if (data) {
          setCitizen(data);
        } else {
          setModal(true);
        }
      } else {
        logout("expired");
      }
    } catch (error) {
      console.log("Error al obtener los ciudadanos.", error);
    }
  };

  // Formatear y validar RUT
  const validateRut = (e) => {
    setRut(formatRut(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = verifyRut(rut);
    isValid
      ? onSubmit(rut)
      : alert("El RUT no corresponde con el Dígito Verificador");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-10 gap-4 items-end border"
      >
        <Input
          important
          onChange={validateRut}
          max={12}
          value={rut}
          type="text"
          className="col-span-7"
          label="RUT del solicitante"
        />
        <button className="col-span-3 mb-2 p-1 rounded border bg-secondary-500 hover:bg-secondary-600 text-white">
          Buscar
        </button>
      </form>
      <CreateCitizenModal
        rut={rut}
        modal={modal}
        setModal={setModal}
        title="Ciudadano no encontrado"
      />
    </>
  );
}

export default CitizenByRutForm;
