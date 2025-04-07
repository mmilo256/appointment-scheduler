import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../ui/ConfirmationModal";
import { deleteCitizen, getAllCitizens } from "../../services/citizenService";

function CitizenTableActions({ data, setRefresh }) {
  const buttonStyles = "text-white rounded px-1.5 py-0.5";
  const [deleteModal, setDeleteModal] = useState(0);

  const navigate = useNavigate();

  const onDeleteCitizen = async () => {
    await deleteCitizen(data.id);
    setRefresh(prev => !prev)
    setDeleteModal(false);
  };

  const onEditCitizen = async () => {
    await selectCitizen(data.id);
    navigate(`edit?id=${data.id}`);
  };

  return (
    <div className="flex gap-2">
      <button
        className={`bg-blue-500 hover:bg-blue-600 ${buttonStyles}`}
        onClick={onEditCitizen}
      >
        Editar
      </button>
      <button
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
      />
    </div>
  );
}

export default CitizenTableActions;
