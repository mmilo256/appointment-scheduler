import React, { useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
// import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../ui/ConfirmationModal";

function UserTableActions({ data }) {
  const buttonStyles = "text-white rounded px-1.5 py-0.5";
  const [deleteModal, setDeleteModal] = useState(0);

  const deleteUser = useUserStore((state) => state.deleteUser);
  const getAllUsers = useUserStore((state) => state.getAllUsers);
  // const selectUser = useUserStore((state) => state.selectUser);

  // const navigate = useNavigate();

  const onDeleteUser = async () => {
    await deleteUser(data.id);
    await getAllUsers();
    setDeleteModal(false);
  };

  /* const onEditUser = async () => {
    await selectUser(data.id);
    navigate(`edit?id=${data.id}`);
  }; */

  return (
    <div className="flex gap-2">
      {/* <button
        className={`bg-blue-500 hover:bg-blue-600 ${buttonStyles}`}
        onClick={onEditUser}
      >
        Editar
      </button> */}
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
        title="Borrar usuario"
        onConfirm={onDeleteUser}
        message={`¿Seguro que desea borrar el usuario ${data.first_name} ${data.last_name}?`}
      />
    </div>
  );
}

export default UserTableActions;
