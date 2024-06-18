import BaseTable from "../ui/BaseTable";
import { useReferralStore } from "../../stores/useReferralStore";
import ReferralsTableActions from "./ReferralsTableActions";
import { useAuthStore } from "../../stores/useAuthStore";
import { formatDate } from "../../utils/helpers";

function CompletedReferralsTable() {
  // Estado local para almacenar la lista de ciudadanos
  const referrals = useReferralStore((state) => state.referrals);
  const role = useAuthStore((state) => state.role);

  const formatData = () => {
    const filteredData = referrals.filter(
      (ref) => ref.ref_status === "finalizada"
    );
    const formattedData = filteredData.map((ref) => {
      // Formato de cada ciudadano con sus respectivos campos

      const refData = {
        fullName: `${ref.citizen.first_name} ${ref.citizen.last_name}`,
        cause: ref.appointment.cause,
        referral: ref.department.dep_name,
        solution: ref.solution,
        solutionDate: formatDate(ref.solution_date, 1),
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
      { label: "DERIVACIÓN" },
      { label: "SOLUCIÓN" },
      { label: "FECHA SOLUCIÓN" },
      { label: "ACCIONES" },
    ],
    data: formatData(), // Datos formateados de los ciudadanos
  };

  // Renderizado de la tabla con los datos configurados
  return <BaseTable table={table} />;
}

export default CompletedReferralsTable;
