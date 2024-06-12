import { useContext, useEffect, useState } from "react";
import { getAllDepartments } from "../../services/departmentService";
import { checkToken } from "../../utils/helpers";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { AuthContext } from "../../context/AuthContext";
import { updateAppointment } from "../../services/appointmentService";
import { createReferral } from "../../services/referralService";
function ReferralForm({ appointment }) {
  // Estado local para almacenar la lista de departamentos
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(1);
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("pendiente");
  const { logout } = useContext(AuthContext);

  const depOptions = departments.map((dep) => ({
    label: dep.dep_name,
    value: dep.id,
  }));

  const statusOptions = [
    { label: "pendiente", value: "pendiente" },
    { label: "en proceso", value: "en proceso" },
    { label: "finalizada", value: "finalizada" },
  ];

  // Efecto de lado para obtener la lista de departamentos al cargar el componente
  useEffect(() => {
    // Función asincrónica para obtener los departamentos
    const getDepartments = async () => {
      const isTokenExpired = checkToken(localStorage.getItem("jwt"));
      try {
        if (!isTokenExpired) {
          // Llamada a la función getAllDepartments del servicio para obtener los departamentos
          const data = await getAllDepartments();
          // Actualización del estado con la lista de departamentos obtenida
          setDepartments(data);
        } else {
          logout("expired");
        }
      } catch (error) {
        // Manejo de errores en caso de fallo al obtener los departamentos
        console.log("Error al obtener las direcciones.", error);
      }
    };
    // Llamada a la función para obtener los departamentos al montar el componente
    getDepartments();
  }, [logout]);

  const referralAppointment = async (data) => {
    const isTokenExpired = checkToken(localStorage.getItem("jwt"));
    try {
      if (!isTokenExpired) {
        const setReferred = { is_referred: true };
        // Llamada a la función getAllDepartments del servicio para obtener los departamentos
        await createReferral(data);
        await updateAppointment(appointment.id, setReferred);
        // Actualización del estado con la lista de departamentos obtenida
        alert("Derivación realizada correctamente");
      } else {
        logout("expired");
      }
    } catch (error) {
      // Manejo de errores en caso de fallo al obtener los departamentos
      console.log("No se pudo derivar la audiencia", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      department_id: Number(department),
      outcome: result,
      ref_status: status,
      appointment_id: appointment.id,
    };
    referralAppointment(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={department}
        onChange={(e) => {
          setDepartment(e.target.value);
        }}
        type="select"
        options={depOptions}
        label="Dirección municipal"
      />
      <Input
        value={result}
        onChange={(e) => {
          setResult(e.target.value);
        }}
        type="textarea"
        label="Resultado"
      />
      <Input
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
        }}
        type="select"
        options={statusOptions}
        label="Estado"
      />
      <Button type="submit" color="secondary">
        Derivar
      </Button>
    </form>
  );
}

export default ReferralForm;
