import React, { useContext, useEffect, useState } from "react";
import BaseTable from "../ui/BaseTable";
import { getAllReferrals } from "../../services/referralService";
import { checkToken } from "../../utils/helpers";
import { AuthContext } from "../../context/AuthContext";
import StatusTag from "./StatusTag";

function ReferralsTable() {
  // Estado local para almacenar la lista de ciudadanos
  const [referrals, setReferrals] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const { logout } = useContext(AuthContext);

  // Efecto de lado para obtener la lista de ciudadanos al cargar el componente
  useEffect(() => {
    // Función asincrónica para obtener los ciudadanos
    const getReferrals = async () => {
      const isTokenExpired = checkToken(localStorage.getItem("jwt"));
      try {
        if (!isTokenExpired) {
          // Llamada a la función getAllReferrals del servicio para obtener los ciudadanos
          const data = await getAllReferrals();
          // Actualización del estado con la lista de ciudadanos obtenida
          setReferrals(data);
        } else {
          logout("expired");
        }
      } catch (error) {
        // Manejo de errores en caso de fallo al obtener los ciudadanos
        console.log("Error al obtener los ciudadanos.", error);
      }
    };
    // Llamada a la función para obtener los ciudadanos al montar el componente
    getReferrals();
  }, [refreshData, logout]);

  const formatData = () => {
    const formattedData = referrals.map((ref) => {
      // Formato de cada ciudadano con sus respectivos campos
      const refData = {
        fullName: `${ref.citizen_fullname}`,
        cause: ref.appointment.cause,
        referral: ref.department.dep_name,
        outcome: ref.outcome,
        status: <StatusTag status={ref.ref_status} />,
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
      { label: "RESULTADO" },
      { label: "ESTADO" },
    ],
    data: formatData(), // Datos formateados de los ciudadanos
  };

  // Renderizado de la tabla con los datos configurados
  return <BaseTable table={table} />;
}

export default ReferralsTable;
