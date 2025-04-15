import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import { formatRut, verifyRut } from "../../utils/helpers";
import { getCitizenByRUT } from "../../services/citizenService";
import CreateCitizenModal from "./CreateCitizenModal";
import { useLocation } from "react-router-dom";
import BaseInput from "../ui/BaseInput";
import BaseButton from "../ui/BaseButton";

function CitizenByRutForm({ setCitizen }) {

  // Obtener rut desde la URL
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const citizenRut = params.get("rut")


  const [rut, setRut] = useState("");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false)

  // Si hay un RUT en la URL, realizar la consulta automáticamente
  useEffect(() => {
    (async () => {
      if (citizenRut) {
        try {
          const data = await getCitizenByRUT(citizenRut);
          setCitizen(data)
        } catch (error) {
          console.log("Error al obtener los ciudadanos.", error);
        }
      }
    })()
  })

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const isValid = verifyRut(rut);
    if (isValid) {
      try {
        const data = await getCitizenByRUT(rut);
        if (data) {
          setCitizen(data);
        } else {
          setModal(true);
        }
      } catch (error) {
        console.log("Error al obtener los ciudadanos.", error);
      }
    } else {
      alert("El RUT no corresponde con el Dígito Verificador");
    }
    setLoading(false)
  };

  // Formatear y validar RUT
  const validateRut = (e) => {
    setRut(formatRut(e.target.value));
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex gap-2 mb-4"
      >
        <BaseInput max={12} placeholder="RUT" value={rut} onChange={validateRut} />
        <div className="w-40">
          <BaseButton color="secondary" isLoading={loading} text="Buscar" type="submit" />
        </div>
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
