import {create} from 'zustand'
import { createAppointment, deleteAppointment, getAllAppointments, getAppointmentById, updateAppointment } from '../services/appointmentService'

export const useAppointmentStore = create(set => ({
    appointments: [],
    selectedAppointment: {
        id: "",
        cause: "",
        created_at: "",
        appointment_date: "",
        isReferred: false,
        citizen_id: ""
    },
    selectAppointment: async(id) => {
        const appointment = await getAppointmentById(id)
        set({selectedAppointment: {
            ...appointment,
            id
        }})
    },
    getAllAppointments: async () => {
        const data = await getAllAppointments()
        set({appointments: data})
    },
    createAppointment: async (data) => {
        await createAppointment(data)
    },
    deleteAppointment: async (id) => {
        await deleteAppointment(id)
    },
    editAppointment: async(id, data) => {
        await updateAppointment(id, data)
    }

}))