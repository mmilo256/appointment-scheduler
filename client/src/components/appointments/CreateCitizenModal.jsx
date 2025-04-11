import React from "react";
import BaseModal from "../ui/BaseModal";
import Button from "../ui/Button";
import BaseButton from "../ui/BaseButton";

function CreateCitizenModal({ modal, setModal, title, rut }) {
  return (
    <BaseModal
      isOpen={modal}
      onClose={() => {
        setModal(false);
      }}
      title={title}
    >
      <p className="text-center">
        ¿Desea agregar al ciudadano a la base de datos?
      </p>
      <div className="flex gap-4 mt-5">
        <BaseButton color="secondary" text="Cerrar" onClick={() => { setModal(false) }} />
        <BaseButton text="Agregar ciudadano" href={`/citizens/create?rut=${rut}`} />
      </div>
    </BaseModal>
  );
}

export default CreateCitizenModal;
