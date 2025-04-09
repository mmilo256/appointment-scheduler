import React, { useEffect, useState } from 'react'
import Container from '../components/ui/Container'
import Heading from '../components/ui/Heading'
import BaseTable from '../components/ui/BaseTable'
import { getAllAppointments } from '../services/appointmentService'
import { formatDate } from '../utils/helpers'
import StatusTag from '../components/ui/StatusTag'
/* import BaseModal from '../components/ui/BaseModal' */

const History = () => {

    const [appointments, setAppointments] = useState([])
    /* const [detailModal, setDetailModal] = useState(false) */

    /* const onOpenDetail = () => {
        setDetailModal(true)
    } */

    useEffect(() => {
        (async () => {
            const data = await getAllAppointments("terminada")
            const formattedData = data.map(appointment => ({
                citizen: `${appointment.ciudadano.nombres} ${appointment.ciudadano.apellidos}`,
                cause: appointment.materia,
                createdAt: formatDate(appointment.createdAt, "DD MMM YYYY, hh:mm"),
                status: <StatusTag status={appointment.estado} />,
                // actions: <button onClick={onOpenDetail} className="bg-blue-500 hover:bg-blue-600 text-white rounded px-1.5 py-0.5">Ver detalle</button>
            }))
            setAppointments(formattedData)
        })()
    }, [])

    const columns = [
        { label: "Ciudadano" },
        { label: "Materia" },
        { label: "Fecha de creación" },
        { label: "Estado" },
        // { label: "Acciones" }
    ]

    return (
        <>
            <Container>
                <Heading>Historial de audiencias</Heading>
                <BaseTable data={appointments} columns={columns} />
            </Container>
            {/* <BaseModal isOpen={detailModal} onClose={() => setDetailModal(false)} title="Detalle de la audiencia" >
                <ul>
                    <li><strong></strong></li>
                </ul>
            </BaseModal> */}
        </>
    )
}

export default History