import React, { useEffect, useState } from 'react'
import Container from '../components/ui/Container'
import Heading from '../components/ui/Heading'
import BaseTable from '../components/ui/BaseTable'
import { getAllFinishedAppointments } from '../services/appointmentService'
import { formatDate } from '../utils/helpers'
import StatusTag from '../components/ui/StatusTag'
import BaseModal from '../components/ui/BaseModal'
import Pagination from '../components/ui/Pagination'
import SearchBar from '../components/ui/SearchBar'

const History = () => {

    const [appointments, setAppointments] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const pageSize = 10
    const [searchQuery, setSearchQuery] = useState("")
    const [detailModal, setDetailModal] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState({})

    const onOpenDetail = (data) => {
        setSelectedAppointment(data)
        setDetailModal(true)
    }

    useEffect(() => {
        (async () => {
            const data = await getAllFinishedAppointments(currentPage, pageSize, searchQuery)
            setTotalPages(data.totalPages)
            const formattedData = data.appointments.map(appointment => ({
                citizen: `${appointment.ciudadano.nombres} ${appointment.ciudadano.apellidos}`,
                cause: appointment.materia,
                createdAt: formatDate(appointment.createdAt, "DD MMM YYYY, HH:mm"),
                status: <StatusTag status={appointment.estado} />,
                actions: <button onClick={() => { onOpenDetail(appointment) }} className="bg-blue-500 hover:bg-blue-600 text-white rounded px-1.5 py-0.5">Ver detalle</button>
            }))
            setAppointments(formattedData)
        })()
    }, [currentPage, searchQuery])

    const columns = [
        { label: "CIUDADANO" },
        { label: "MATERIA" },
        { label: "FECHA DE CREACIÓN" },
        { label: "ESTADO" },
        { label: "ACCIONES" }
    ]

    return (
        <>
            <Container>
                <Heading>Historial de audiencias</Heading>
                <div className='my-2'>
                    <SearchBar query={searchQuery} setQuery={setSearchQuery} />
                </div>
                <BaseTable data={appointments} columns={columns} />
                <div className="flex justify-center py-4">
                    <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
                </div>
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
                    <li><strong>Fecha de creación: </strong>{formatDate(selectedAppointment?.createdAt, "DD MMM YYYY, HH:mm")}</li>
                    <li><strong>Fecha de {selectedAppointment?.estado === "terminada" ? "término:" : "derivación:"} </strong>{formatDate(selectedAppointment?.updatedAt, "DD MMM YYYY, HH:mm")}</li>
                    <li><strong>Estado: </strong> <StatusTag status={selectedAppointment?.estado} /> </li>
                    {selectedAppointment?.estado === "derivada" && <li><strong>Derivado a: </strong>{selectedAppointment.direccion?.direccion}</li>}
                </ul>
            </BaseModal>
        </>
    )
}

export default History