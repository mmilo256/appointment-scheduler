import { checkAppointment, getAllAppointments } from "../../services/appointmentService";
import { formatDate } from "../../utils/helpers";

function AppointmentCard({ data, setRefresh }) {

  const onCheck = async () => {
    try {
      await checkAppointment(data.id)
      setRefresh(prev => !prev)
    } catch (error) {
      console.log("No se pudo")
    }
  };

  const onReferral = () => {
    setModal(true);
  };

  const buttonStyles = "text-white text-sm px-2 py-1 rounded";

  return (
    <div
      className={`${data.status === "pendiente" ? "bg-white" : "bg-green-50"} p-3 rounded shadow`}
    >
      {/* Información de la cita */}
      <div className="flex flex-col gap-1">
        <p className="text-lg font-bold">Motivo: {data.cause}</p>
        <p>
          <span className="font-semibold">Ciudadano:</span> {`${data.citizen.first_name} ${data.citizen.last_name}`}
        </p>
        <p>
          <span className="font-semibold">Fecha:</span> {`${formatDate(data.createdAt, 1)}`}
        </p>
        <p>
          <span className="font-semibold">Hora de llegada:</span> {`${formatDate(data.createdAt, 2)}`}
        </p>
      </div>

      <div className="flex justify-end gap-2">
        {data.status === "pendiente" && <button
          onClick={onCheck}
          className={`bg-green-500 hover:bg-green-600 ${buttonStyles}`}
        >
          Marcar como terminada
        </button>}
        {/* <button
          onClick={onReferral}
          className={`bg-amber-500 hover:bg-amber-600 ${buttonStyles}`}
        >
          Derivar
        </button> */}
      </div>
    </div>
  );
}

export default AppointmentCard;
