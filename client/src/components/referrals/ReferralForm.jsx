import { useContext, useEffect, useState } from "react";
import { getAllDepartments } from "../../services/departmentService";
import { checkToken, formatDate } from "../../utils/helpers";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { AuthContext } from "../../context/AuthContext";
import { updateAppointment } from "../../services/appointmentService";
import { createReferral } from "../../services/referralService";
import { useNavigate } from "react-router-dom";
import { useAppointmentStore } from "../../stores/useAppointmentStore";
import { sendEmail } from "../../services/emailService";
function ReferralForm() {
  const selectedAppointment = useAppointmentStore(
    (state) => state.selectedAppointment
  );

  // Estado local para almacenar la lista de departamentos
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(1);
  const [status, setStatus] = useState("pendiente");
  const [isLoading, setIsLoading] = useState(false)
  const { logout } = useContext(AuthContext);

  const deleteAppointment = useAppointmentStore(state => state.deleteAppointment)

  const navigate = useNavigate();

  const depOptions = departments.map((dep) => ({
    label: dep.dep_name,
    value: dep.id,
  }));

  const statusOptions = [
    { label: "pendiente", value: "pendiente" },
    { label: "en proceso", value: "en proceso" },
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
    // Llamada a la función getAllDepartments del servicio para obtener los departamentos
    await createReferral(data);
    await updateAppointment(selectedAppointment.id, { is_referred: true });
    await deleteAppointment(selectedAppointment.id);
    // Actualización del estado con la lista de departamentos obtenida
    if (status === "pendiente") {
      navigate("/referrals/pending");
    } else {
      navigate("/referrals/in-progress");
    }
    setIsLoading(false)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    const data = {
      department_id: Number(department),
      appointment_id: selectedAppointment.id,
      ref_status: status,
      citizen_id: selectedAppointment.citizen.id,
    };
    sendReferralEmail(department, selectedAppointment);
    referralAppointment(data);
  };

  const getDepById = (id) => {
    const department = departments.find((department) => department.id === id);
    return department;
  };

  const sendReferralEmail = async (department, appointmentData) => {
    const dep = getDepById(Number(department));
    const depName = dep.dep_name;
    const depDirector = dep.director_name;
    const depEmail = [
      "emiliosotoandrade256@gmail.com",
      "esoto@municipalidadchonchi.cl"
    ];
    // const depEmail = dep.email;
    const emailData = {
      to: depEmail,
      subject: "DERIVACIÓN DE AUDIENCIA",
      html: `
      <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificación de Derivación de Audiencia</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #06163A;
            color: #ffffff;
            padding: 10px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 20px;
        }
        .content p {
            line-height: 1.6;
        }
        .content .highlight {
            color: #FF3514;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Notificación de Derivación de Audiencia</h1>
        </div>
        <div class="content">
            <p>Estimado/a <span class="highlight">${depDirector}</span>,</p>
            <p>Le informamos que se ha derivado una nueva audiencia a <span class="highlight">${depName}</span>.</p>
            <p>A continuación, se detallan los datos de la audiencia derivada:</p>
            <ul>
                <li><strong>Nombre del Solicitante:</strong> ${appointmentData.citizen.first_name
        } ${appointmentData.citizen.last_name}</li>
                <li><strong>Motivo de la Audiencia:</strong> ${appointmentData.cause
        }</li>
                <li><strong>Fecha de Solicitud:</strong> ${formatDate(
          appointmentData.date,
          1
        )}</li>
                <li><strong>Propuesta del Alcalde:</strong> ${appointmentData.response
        }</li>
            </ul>
            <p>Por favor, tome las medidas necesarias para atender esta audiencia y proporcione una solución a la brevedad posible.</p>
            <p>Puede acceder al sistema de gestión de audiencias haciendo <a href='https://appointment-scheduler-brown.vercel.app/'>click aquí</a> para más detalles y para registrar la solución correspondiente.</p>
        </div>
        <div class="footer">
            <p>Este es un correo generado automáticamente. Por favor, no responda a este mensaje.</p>
        </div>
    </div>
</body>
</html>
      `,
    };
    await sendEmail(emailData.to, emailData.subject, emailData.html);
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
        <Button disabled={isLoading} type="submit" color="secondary">
          Derivar
        </Button>
      </div>
    </form>
  );
}

export default ReferralForm;
