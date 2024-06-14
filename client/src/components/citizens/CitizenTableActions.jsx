import React from "react";
import { useCitizenStore } from "../../stores/useCitizenStore";
import { useNavigate } from "react-router-dom";

function CitizenTableActions({ id }) {
  const buttonStyles = "text-white rounded px-1.5 py-0.5";

  const deleteCitizen = useCitizenStore((state) => state.deleteCitizen);
  const getAllCitizens = useCitizenStore((state) => state.getAllCitizens);
  const selectCitizen = useCitizenStore((state) => state.selectCitizen);

  const navigate = useNavigate();

  const onDeleteCitizen = async () => {
    await deleteCitizen(id);
    await getAllCitizens();
  };

  const onEditCitizen = async () => {
    await selectCitizen(id);
    navigate(`edit?id=${id}`);
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
        onClick={onDeleteCitizen}
      >
        Eliminar
      </button>
    </div>
  );
}

export default CitizenTableActions;
