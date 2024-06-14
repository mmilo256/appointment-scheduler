import { useContext, useEffect, useState } from "react";
import { getAllDepartments } from "../../services/departmentService";
import { checkToken } from "../../utils/helpers";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { AuthContext } from "../../context/AuthContext";
import { updateAppointment } from "../../services/appointmentService";
import { useNavigate } from "react-router-dom";
import { useAppointmentStore } from "../../stores/useAppointmentStore";
import { useReferralStore } from "../../stores/useReferralStore";
function EditReferralForm({ data }) {
  const editReferral = useReferralStore((state) => state.editReferral);
  // Estado local para almacenar la lista de departamentos
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(data.department_id);
  const [status, setStatus] = useState(data.ref_status);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setDepartment(data.department_id);
    setStatus(data.ref_status);
  }, [data]);

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

  const referralAppointment = async (newData) => {
    // Llamada a la función getAllDepartments del servicio para obtener los departamentos
    await editReferral(data.id, newData);
    // Actualización del estado con la lista de departamentos obtenida
    // alert("Derivación modificada");
    navigate("/referrals");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToEdit = {};
    if (department) dataToEdit.department_id = Number(department);
    if (status) dataToEdit.ref_status = status;
    referralAppointment(dataToEdit);
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
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
        }}
        type="select"
        options={statusOptions}
        label="Estado"
      />
      <div className="flex gap-5 max-w-80 ml-auto mt-5">
        <Button href="/appointments" type="button" color="primary">
          Volver
        </Button>
        <Button type="submit" color="secondary">
          Derivar
        </Button>
      </div>
    </form>
  );
}

export default EditReferralForm;
