import React, { useState } from "react";
import { useCitizenStore } from "../../stores/useCitizenStore";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../ui/ConfirmationModal";

function CitizenTableActions({ data }) {
  const buttonStyles = "text-white rounded px-1.5 py-0.5";
  const [deleteModal, setDeleteModal] = useState(0);

  const deleteCitizen = useCitizenStore((state) => state.deleteCitizen);
  const getAllCitizens = useCitizenStore((state) => state.getAllCitizens);
  const selectCitizen = useCitizenStore((state) => state.selectCitizen);

  const navigate = useNavigate();

  const onDeleteCitizen = async () => {
    await deleteCitizen(data.id);
    await getAllCitizens();
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
        message={`¿Seguro que desea borrar al ciudadano ${data.first_name} ${data.last_name}?`}
      />
    </div>
  );
}

export default CitizenTableActions;
