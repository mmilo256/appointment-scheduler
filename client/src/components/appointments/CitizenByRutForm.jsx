import React, { useState } from "react";
import Input from "../ui/Input";
import { checkToken, formatRut } from "../../utils/helpers";
import { getCitizenByRUT } from "../../services/citizenService";

function CitizenByRutForm({ setCitizen }) {
  const [rut, setRut] = useState("");

  const onSubmit = async () => {
    const isTokenExpired = checkToken(localStorage.getItem("jwt"));
    try {
      if (!isTokenExpired) {
        // Llamada a la función getAllUsers del servicio para obtener los usuarios
        const data = await getCitizenByRUT(rut);
        // Actualización del estado con la lista de usuarios obtenida
        if (data) {
          setCitizen(data);
        } else {
          alert(
            "El ciudadano no está en la base de datos. Primero agréguelo y luego cree la audiencia."
          );
        }
      } else {
        logout("expired");
      }
    } catch (error) {
      // Manejo de errores en caso de fallo al obtener los usuarios
      console.log("Error al obtener los usuarios.", error);
    }
  };

  // Validar rut
  const validateRut = (e) => {
    setRut(formatRut(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(rut);
    onSubmit(rut);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-10 gap-4 items-end border bg-gray-100 p-5 rounded shadow mb-4"
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

        <button className="col-span-3 mb-2 p-1 rounded border bg-secondary-500 text-white">
          Buscar
        </button>
      </form>
    </>
  );
}

export default CitizenByRutForm;
