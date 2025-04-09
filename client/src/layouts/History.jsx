import React, { useEffect, useState } from 'react'
import Container from '../components/ui/Container'
import Heading from '../components/ui/Heading'
import BaseTable from '../components/ui/BaseTable'
import { getAllAppointments } from '../services/appointmentService'
import { formatDate } from '../utils/helpers'
import StatusTag from '../components/ui/StatusTag'
import BaseModal from '../components/ui/BaseModal'

const History = () => {

    const [appointments, setAppointments] = useState([])
    const [detailModal, setDetailModal] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState({})

    const onOpenDetail = (data) => {
        setSelectedAppointment(data)
        setDetailModal(true)
    }

    useEffect(() => {
        (async () => {
            const data = await getAllAppointments("terminada&estado=derivada")
            const formattedData = data.map(appointment => ({
                citizen: `${appointment.ciudadano.nombres} ${appointment.ciudadano.apellidos}`,
                cause: appointment.materia,
                createdAt: formatDate(appointment.createdAt, "DD MMM YYYY, HH:mm"),
                status: <StatusTag status={appointment.estado} />,
                actions: <button onClick={() => { onOpenDetail(appointment) }} className="bg-blue-500 hover:bg-blue-600 text-white rounded px-1.5 py-0.5">Ver detalle</button>
            }))
            setAppointments(formattedData)
        })()
    }, [])

    const columns = [
        { label: "Ciudadano" },
        { label: "Materia" },
        { label: "Fecha de creación" },
        { label: "Estado" },
        { label: "Acciones" }
    ]

    return (
        <>
            <Container>
                <Heading>Historial de audiencias</Heading>
                <BaseTable data={appointments} columns={columns} />
            </Container>
            <BaseModal isOpen={detailModal} onClose={() => setDetailModal(false)} title="Detalle de la audiencia" >
                <h3 className='font-bold text-lg mb-1'>Datos ciudadano</h3>
                <ul className='pl-4 mb-2'>
                    <li><strong>Nombre: </strong>{`${selectedAppointment.ciudadano?.nombres} ${selectedAppointment.ciudadano?.apellidos}`}</li>
                    <li><strong>RUT: </strong>{selectedAppointment.ciudadano?.rut}</li>
                    <li><strong>Dirección: </strong>{selectedAppointment.ciudadano?.direccion}</li>
                    {selectedAppointment.ciudadano?.email && <li><strong>Correo electrónico: </strong>{selectedAppointment.ciudadano?.email}</li>}
                    <li><strong>Teléfono: </strong>{selectedAppointment.ciudadano?.telefono}</li>
                    {selectedAppointment.ciudadano?.telefono_2 && <li><strong>Teléfono alternativo: </strong>{selectedAppointment.ciudadano?.telefono_2}</li>}
                </ul>
                <hr className='my-4' />
                <h3 className='font-bold text-lg mb-1'>Datos audiencia</h3>
                <ul className='pl-4'>
                    <li><strong>Materia: </strong>{selectedAppointment?.materia}</li>
                    <li><strong>Respuesta: </strong>{selectedAppointment?.respuesta}</li>
                    <li><strong>Fecha creación: </strong>{formatDate(selectedAppointment?.createdAt, "DD MMM YYYY, HH:mm")}</li>
                    <li><strong>Fecha término: </strong>{formatDate(selectedAppointment?.updatedAt, "DD MMM YYYY, HH:mm")}</li>
                    <li><strong>Estado: </strong> <StatusTag status={selectedAppointment?.estado} /> </li>
                </ul>
            </BaseModal>
        </>
    )
}

export default History