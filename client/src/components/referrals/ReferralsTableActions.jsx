import React from "react";
import { useReferralStore } from "../../stores/useReferralStore";
import { useNavigate } from "react-router-dom";

function ReferralsTableActions({ id }) {
  const buttonStyles = "text-white rounded px-1.5 py-0.5";

  const deleteReferral = useReferralStore((state) => state.deleteReferral);
  const getAllReferrals = useReferralStore((state) => state.getAllReferrals);
  const selectReferral = useReferralStore((state) => state.selectReferral);

  const navigate = useNavigate();

  const onDeleteReferral = async () => {
    await deleteReferral(id);
    await getAllReferrals();
  };

  const onEditReferral = async () => {
    await selectReferral(id);
    navigate(`edit?id=${id}`);
  };

  return (
    <div className="flex gap-2">
      <button
        className={`bg-blue-500 hover:bg-blue-600 ${buttonStyles}`}
        onClick={onEditReferral}
      >
        Editar
      </button>
      <button
        className={`bg-red-500 hover:bg-red-600 ${buttonStyles}`}
        onClick={onDeleteReferral}
      >
        Eliminar
      </button>
    </div>
  );
}

export default ReferralsTableActions;
