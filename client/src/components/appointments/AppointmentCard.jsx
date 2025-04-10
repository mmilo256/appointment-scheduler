import { useState } from "react";
import { checkAppointment, getAllAppointments, updateAppointment } from "../../services/appointmentService";
import { formatDate } from "../../utils/helpers";
import BaseModal from "../ui/BaseModal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { sendEmail } from "../../services/emailService";
import emailTemplate from "../../templates/referralEmailTemplate";

function AppointmentCard({ data, departments, setRefresh }) {

  const [finishModal, setFinishModal] = useState(false)
  const [referModal, setReferModal] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [response, setResponse] = useState("")

  const departmentsList = departments.map(dep => ({
    label: dep.direccion,
    value: dep.id
  }))

  const buttonStyles = "text-white text-sm px-2 py-1 rounded";

  // Función para cerrar el modal de derivación y resetear el input de dirección seleccionada
  const onCloseReferModal = () => {
    setReferModal(false)
    setSelectedDepartment("")
  }

  // Función para derivar una audiencia
  const referAppointment = async () => {
    const email = "esoto@municipalidadchonchi.cl"
    const depData = departments.find(dep => dep.id === Number(selectedDepartment))
    const dataToEdit = {
      estado: "derivada",
      direccion_id: depData.id
    }
    try {
      await updateAppointment(data.id, dataToEdit)
      await sendEmail(email, "DERIVACIÓN DE AUDIENCIA", emailTemplate(data))
      setRefresh(prev => !prev)
      onCloseReferModal()
      alert("Audiencia derivada con éxito")
    } catch (error) {
      console.log(error.message)
    }
  }

  // Función para marcar una audiencia como terminada
  const finishAppointment = async () => {
    const dataToEdit = {
      respuesta: response,
      estado: "terminada"
    }
    try {
      await updateAppointment(data.id, dataToEdit)
      setRefresh(prev => !prev)
      alert("Se ha marcado la audiencia como terminada")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="bg-white p-2 rounded">
      {/* Información de la cita */}
      <div className="flex flex-col gap-1">
        <p className="text-lg font-bold">Motivo: {data.materia}</p>
        <p>
          <span className="font-semibold">Ciudadano:</span> {`${data.ciudadano.nombres} ${data.ciudadano.apellidos}`}
        </p>
        <p>
        </p>
        <p>
          <span className="font-semibold">Hora de llegada:</span> {`${formatDate(data.createdAt, 2)}`}
        </p>
      </div>
      <div className="flex justify-end gap-2">
        <button
          className={`bg-green-500 hover:bg-green-600 ${buttonStyles}`}
          onClick={() => { setFinishModal(true) }}
        >
          Marcar como terminada
        </button>
        <button
          className={`bg-sky-500 hover:bg-sky-600 ${buttonStyles}`}
          onClick={() => { setReferModal(true) }}
        >
          Derivar
        </button>
      </div>
      {/* Modal de confirmación de audiencia terminada */}
      <BaseModal isOpen={finishModal} onClose={() => { setFinishModal(false) }} title="Marcar audiencia como terminada" >
        <p className="mb-2">¿Desea marcar la siguiente audiencia como terminada?</p>
        <ul>
          <li><strong>Motivo:</strong> {data.materia}</li>
          <li><strong>Ciudadano:</strong> {`${data.ciudadano.nombres} ${data.ciudadano.apellidos}`}</li>
        </ul>
        <Input type="textarea" placeholder="Respuesta (opcional)" value={response} onChange={(e) => setResponse(e.target.value)} />
        <div className="flex gap-5 mt-5">
          <Button onClick={() => setFinishModal(false)} color="primary" type="button">
            Cerrar
          </Button>
          <Button color="secondary" onClick={finishAppointment}>
            Marcar como terminada
          </Button>
        </div>
      </BaseModal>
      {/* Modal para derivar la audiencia a una dirección municipal */}
      <BaseModal isOpen={referModal} onClose={onCloseReferModal} title="Derivar audiencia" >
        <p className="mb-2">Seleccione la dirección a la que desea derivar la audiencia</p>
        <ul>
          <li><strong>Motivo:</strong> {data.materia}</li>
          <li><strong>Ciudadano:</strong> {`${data.ciudadano.nombres} ${data.ciudadano.apellidos}`}</li>
        </ul>
        <Input type="select" options={departmentsList} value={selectedDepartment} onChange={(e) => { setSelectedDepartment(e.target.value) }} />
        <div className="flex gap-5 mt-5">
          <Button onClick={onCloseReferModal} color="primary" type="button">
            Cerrar
          </Button>
          <Button onClick={referAppointment} disabled={!selectedDepartment} color="secondary">
            Derivar audiencia
          </Button>
        </div>
      </BaseModal>
    </div>
  );
}

export default AppointmentCard;