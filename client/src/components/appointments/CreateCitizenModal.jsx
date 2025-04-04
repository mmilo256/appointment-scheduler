import React from "react";
import BaseModal from "../ui/BaseModal";
import Button from "../ui/Button";

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
        <Button
          onClick={() => {
            setModal(false);
          }}
        >
          Cerrar
        </Button>
        <Button href={`/citizens/create?rut=${rut}`} color="secondary">
          Agregar ciudadano
        </Button>
      </div>
    </BaseModal>
  );
}

export default CreateCitizenModal;
