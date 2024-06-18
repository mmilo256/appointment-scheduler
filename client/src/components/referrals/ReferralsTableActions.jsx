import React, { useState } from "react";
import { useReferralStore } from "../../stores/useReferralStore";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../ui/ConfirmationModal";

function ReferralsTableActions({ data }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const buttonStyles = "text-white rounded px-1.5 py-0.5";

  const deleteReferral = useReferralStore((state) => state.deleteReferral);
  const getAllReferrals = useReferralStore((state) => state.getAllReferrals);
  const selectReferral = useReferralStore((state) => state.selectReferral);

  const navigate = useNavigate();

  const onDeleteReferral = async () => {
    await deleteReferral(data.id);
    await getAllReferrals();
  };

  const onEditReferral = async () => {
    await selectReferral(data.id);
    navigate(`/referrals/edit?id=${data.id}`);
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
        onClick={() => {
          setDeleteModal(true);
        }}
      >
        Eliminar
      </button>
      <ConfirmationModal
        modal={deleteModal}
        setModal={setDeleteModal}
        title="Borrar derivación"
        onConfirm={onDeleteReferral}
        message={`¿Seguro que desea borrar la derivación?`}
      />
    </div>
  );
}

export default ReferralsTableActions;
