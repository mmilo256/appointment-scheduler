import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../ui/ConfirmationModal";
import { deleteCitizen } from "../../services/citizenService";

function CitizenTableActions({ data, setRefresh }) {
  const buttonStyles = "text-white rounded px-1.5 py-0.5";
  /* const [deleteModal, setDeleteModal] = useState(0); */

  const navigate = useNavigate();

  /* const onDeleteCitizen = async () => {
    await deleteCitizen(data.id);
    setRefresh(prev => !prev)
    setDeleteModal(false);
  }; */

  const onEditCitizen = async () => {
    navigate(`edit?id=${data.id}`);
  };

  const onCreateAppointment = async () => {
    navigate(`/appointments/create?rut=${data.rut}`);
  }

  return (
    <div className="flex gap-2">
      <button
        className={`bg-green-500 hover:bg-green-600 ${buttonStyles}`}
        onClick={onCreateAppointment}
      >
        Crear audiencia
      </button>
      <button
        className={`bg-blue-500 hover:bg-blue-600 ${buttonStyles}`}
        onClick={onEditCitizen}
      >
        Editar
      </button>
      {/* <button
        className={`bg-red-500 hover:bg-red-600 ${buttonStyles}`}
        onClick={() => {
          setDeleteModal(true);
        }}
      >
        Eliminar
      </button>
      <ConfirmationModal
        modal={deleteModal}
        setModal={setDeleteModal}
        title="Borrar ciudadano"
        onConfirm={onDeleteCitizen}
        message={`¿Seguro que desea borrar al ciudadano ${data.nombres} ${data.apellidos}?`}
      /> */}
    </div>
  );
}

export default CitizenTableActions;
