import React, { useState } from "react";
import BaseModal from "../ui/BaseModal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useAppointmentStore } from "../../stores/useAppointmentStore";

function AddSolutionModal({ id, modal, setModal, title }) {
  const [response, setResponse] = useState("");
  const editAppointment = useAppointmentStore((state) => state.editAppointment);
  const getAllAppointments = useAppointmentStore(
    (state) => state.getAllAppointments
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const dataToEdit = { response };
    console.log(dataToEdit);
    await editAppointment(id, dataToEdit);
    await getAllAppointments();
    alert("Propuesta agregada");
    setModal(false);
  };

  return (
    <BaseModal
      isOpen={modal}
      onClose={() => {
        setModal(false);
      }}
      title={title}
    >
      <form onSubmit={onSubmit}>
        <Input
          value={response}
          onChange={(e) => {
            setResponse(e.target.value);
          }}
          label="Propuesta"
          type="textarea"
        />
        <div className="flex gap-5 mt-5">
          <Button onClick={() => setModal(false)} color="primary" type="button">
            Cerrar
          </Button>
          <Button color="secondary" type="submit">
            Agregar propuesta
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}

export default AddSolutionModal;
