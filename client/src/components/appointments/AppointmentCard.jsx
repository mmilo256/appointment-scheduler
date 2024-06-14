import { useNavigate } from "react-router-dom";
import { useAppointmentStore } from "../../stores/useAppointmentStore";
import { useState } from "react";
import AddSolutionModal from "./AddSolutionModal";

function AppointmentCard({ data }) {
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const selectAppointment = useAppointmentStore(
    (state) => state.selectAppointment
  );

  const deleteAppointment = useAppointmentStore(
    (state) => state.deleteAppointment
  );

  const getAllAppointments = useAppointmentStore(
    (state) => state.getAllAppointments
  );

  const onDeleteAppointment = async () => {
    await deleteAppointment(data.id);
    alert("Audiencia eliminada");
    await getAllAppointments();
  };

  const onEditAppointment = async () => {
    await selectAppointment(data.id);
    navigate(`edit?id=${data.id}&citizen=${data.citizenId}`);
  };

  const onAddSolution = () => {
    setModal(true);
  };

  const buttonStyles = "text-white text-sm px-2 py-1 rounded";

  return (
    <div
      className={`${
        data.response ? "bg-green-50" : "bg-slate-50"
      } p-3 rounded shadow`}
    >
      {/* Información de la cita */}
      <div className="flex flex-col gap-1">
        <p className="text-xl font-bold">{data.cause}</p>
        <p className="text-lg">
          {" "}
          <span className="font-semibold">Ciudadano:</span> {data.citizen}
        </p>
        <p className="text-lg">
          {" "}
          <span className="font-semibold">Hora:</span> {data.time}
        </p>
        {data.response && (
          <p className="bg-green-100 rounded shadow p-2 mb-4">
            {" "}
            <span className="font-semibold">Propuesta:</span> {data.response}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        {data.response ? (
          <button className={`bg-green-500 hover:bg-green-600 ${buttonStyles}`}>
            Derivar
          </button>
        ) : (
          <button
            onClick={onAddSolution}
            className={`bg-amber-500 hover:bg-amber-600 ${buttonStyles}`}
          >
            Agregar propuesta
          </button>
        )}
        <button
          onClick={onEditAppointment}
          className={`bg-blue-500 hover:bg-blue-600 ${buttonStyles}`}
        >
          Editar
        </button>
        <button
          onClick={onDeleteAppointment}
          className={`bg-red-500 hover:bg-red-600 ${buttonStyles}`}
        >
          Eliminar
        </button>
      </div>
      <AddSolutionModal
        id={data.id}
        modal={modal}
        setModal={setModal}
        title={data.cause}
      />
    </div>
  );
}

export default AppointmentCard;
