import {create} from 'zustand'
import { createAppointment, deleteAppointment, getAllAppointments, getAppointmentById, getAvailableTimes, updateAppointment } from '../services/appointmentService'
import { checkToken } from '../utils/helpers'

export const useAppointmentStore = create(set => ({
    appointments: [],
    availableTimes: [],
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
        const isTokenExpired = checkToken(localStorage.getItem("jwt"));
        try {
            if (!isTokenExpired) {
              const data = await getAllAppointments();              
              // Actualización del estado con la lista de audiencias obtenida
              set({appointments: data})
            }
          } catch (error) {
            console.log("Error al obtener las audiencias.", error);
          }
        
    },
    getAvailableTimes: async (date) => {
        const data = await getAvailableTimes(date)
        set({availableTimes: data})
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