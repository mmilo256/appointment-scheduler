import AppointmentCard from "./AppointmentCard";
import { formatDate } from "../../utils/helpers";

function AppointmentsCardsGroup({ data, setRefreshData }) {
  const checkEmptyAppointmentsGroup = () => {
    let isNotReferred = 0
    data.appointments.forEach(appointment => {
      if (appointment.isReferred === false) {
        isNotReferred += 1
      }
    });
    return isNotReferred
  }

  let notReferredCount = checkEmptyAppointmentsGroup()

  return (
    <div>
      {/* Título con la fecha formateada */}
      {notReferredCount > 0 && <h2 className="text-2xl text-primary-500 font-semibold mb-2">
        {formatDate(data.date, 1)}
      </h2>}

      {/* Lista de tarjetas de citas */}
      <div className="flex flex-col gap-4">
        {data.appointments.map((appointment) => {
          return (
            <AppointmentCard
              setRefreshData={setRefreshData}
              key={appointment.id}
              data={appointment}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AppointmentsCardsGroup;
