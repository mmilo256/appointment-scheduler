import Button from "../ui/Button";
import { deleteAppointment } from "../../services/appointmentService";

function AppointmentCard({ data, setRefreshData }) {
  const onClickHandler = (e) => {
    e.preventDefault();
  };

  const onDeleteAppointment = async () => {
    try {
      await deleteAppointment(data.id);
      // Refrescar la lista de ciudadanos después de la eliminación
      setRefreshData((prevState) => !prevState);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div
      className={`flex justify-between items-center ${
        data.isReferred ? "bg-green-100" : "bg-slate-100"
      } rounded shadow p-4`}
    >
      {/* Información de la cita */}
      <div className="flex flex-col gap-1">
        <p className="text-lg">
          <strong>Hora:</strong> {data.time}
        </p>
        <p className="text-lg">
          <strong>Ciudadano:</strong> {data.citizen}
        </p>
        <p className="text-lg">
          <strong>Motivo:</strong> {data.cause}
        </p>
        {data.isReferred ? (
          <p className="font-bold text-green-600">Derivada</p>
        ) : (
          <p className="font-bold text-gray-500">Por derivar</p>
        )}
      </div>

      {/* Acciones disponibles para la cita */}
      <div>
        <div className="flex gap-2">
          <Button
            onClick={data.isReferred && onClickHandler}
            href={`/referrals/create?id=${data.id}`}
            color="secondary"
            className={
              data.isReferred &&
              "bg-secondary-200 hover:bg-secondary-200 cursor-not-allowed"
            }
          >
            {data.isReferred ? "Derivada" : "Derivar"}
          </Button>
          <Button onClick={onDeleteAppointment}>Eliminar</Button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCard;
