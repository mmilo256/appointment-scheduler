import React, { useState } from "react";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { checkToken } from "../../utils/helpers";
import { getCitizenByRUT } from "../../services/citizenService";
import { useNavigate } from "react-router-dom";

function CitizenByRutForm({ setCitizen }) {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (citizenData) => {
    const isTokenExpired = checkToken(localStorage.getItem("jwt"));
    try {
      if (!isTokenExpired) {
        // Llamada a la función getAllUsers del servicio para obtener los usuarios
        const data = await getCitizenByRUT(citizenData.rut);
        // Actualización del estado con la lista de usuarios obtenida
        if (data) {
          setCitizen(data);
          reset();
        } else {
          alert(
            "El ciudadano no está en la base de datos. Primero agréguelo y luego cree la audiencia."
          );
          navigate("/citizens");
        }
      } else {
        logout("expired");
      }
    } catch (error) {
      // Manejo de errores en caso de fallo al obtener los usuarios
      console.log("Error al obtener los usuarios.", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-10 gap-2 items-end border bg-gray-100 p-5 rounded shadow mb-4"
      >
        <Input
          register={{ ...register("rut") }}
          important
          label="RUT del solicitante"
          className="col-span-7"
        />
        <button className="col-span-3 mb-2 p-1 rounded border bg-secondary-500 text-white">
          Buscar
        </button>
      </form>
    </>
  );
}

export default CitizenByRutForm;
