import BaseTable from "../ui/BaseTable";
import { useReferralStore } from "../../stores/useReferralStore";
import ReferralsTableActions from "./ReferralsTableActions";
import { useAuthStore } from "../../stores/useAuthStore";
import Pagination from "../ui/Pagination";

function InProgressReferralsTable() {
  // Estado local para almacenar la lista de ciudadanos
  const referrals = useReferralStore((state) => state.inProgressReferrals);
  const getAllInProgressReferrals = useReferralStore(state => state.getAllInProgressReferrals)
  const currentPage = useReferralStore(state => state.currentPage)
  const totalPages = useReferralStore(state => state.inProgressTotalPages)
  const role = useAuthStore((state) => state.role);

  const formatData = () => {
    const formattedData = referrals.map((ref) => {
      // Formato de cada ciudadano con sus respectivos campos

      const refData = {
        fullName: `${ref.citizen.first_name} ${ref.citizen.last_name}`,
        cause: ref.appointment.cause,
        response: ref.appointment.response,
        referral: ref.department.dep_name,
        actions: role <= 2 && <ReferralsTableActions data={ref} />,
      };
      return refData;
    });
    return formattedData;
  };

  // Configuración de la tabla con columnas y datos formateados
  const table = {
    columns: [
      { label: "NOMBRE COMPLETO" },
      { label: "MATERIA" },
      { label: "PROPUESTA" },
      { label: "DERIVACIÓN" },
      { label: "ACCIONES" },
    ],
    data: formatData(), // Datos formateados de los ciudadanos
  };

  // Renderizado de la tabla con los datos configurados
  return <>
  <BaseTable table={table} />
  <div className="flex justify-center py-4">
    <Pagination getItems={getAllInProgressReferrals} currentPage={currentPage} totalPages={totalPages} />
  </div>
  </>;
}

export default InProgressReferralsTable;
