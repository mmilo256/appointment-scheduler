import { create } from "zustand";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentById,
  getAvailableTimes,
  updateAppointment,
} from "../services/appointmentService";

export const useAppointmentStore = create((set) => ({
  appointments: [],
  availableTimes: [],
  selectedAppointment: {
    id: "",
    cause: "",
    created_at: "",
    appointment_date: "",
    isReferred: false,
    citizen_id: "",
  },

  selectAppointment: async (id) => {
    const appointment = await getAppointmentById(id);
    set({
      selectedAppointment: {
        ...appointment,
        id,
      },
    });
  },
  getAllAppointments: async () => {
    try {
      const data = await getAllAppointments();
      // Actualización del estado con la lista de audiencias obtenida
      set({ appointments: data });
    } catch (error) {
      console.log("Error al obtener las audiencias.", error);
    }
  },
  getAvailableTimes: async (date) => {
    const data = await getAvailableTimes(date);
    set({ availableTimes: data });
  },
  createAppointment: async (data) => {
    try {
      await createAppointment(data);
    } catch (error) {
      console.log("Error al obtener las audiencias.", error);
    }
  },
  deleteAppointment: async (id) => {
    try {
      await deleteAppointment(id);
    } catch (error) {
      console.log("Error al borrar", error);
    }
  },
  editAppointment: async (id, data) => {
    try {
      await updateAppointment(id, data);
    } catch (error) {
      console.log("Error al borrar", error);
    }
  },
}));
