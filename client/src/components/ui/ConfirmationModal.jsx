import BaseModal from "./BaseModal";
import Button from "./Button";
function ConfirmationModal({ modal, setModal, title, message, onConfirm }) {
  return (
    <BaseModal
      isOpen={modal}
      onClose={() => {
        setModal(false);
      }}
      title={title}
    >
      <p className="text-center py-5">{message}</p>
      <div className="flex gap-5 py-2">
        <Button
          onClick={() => {
            setModal(false);
          }}
        >
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="secondary">
          Borrar
        </Button>
      </div>
    </BaseModal>
  );
}

export default ConfirmationModal;
