import { create } from "zustand";
import {
  createReferral,
  deleteReferral,
  getAllFinishedReferrals,
  getAllInProgressReferrals,
  getAllPendingReferrals,
  getReferralById,
  updateReferral,
} from "../services/referralService";

export const useReferralStore = create((set) => ({
  pendingReferrals: [],
  inProgressReferrals: [],
  finishedReferrals: [],
  currentPage: 1,
  pendingTotalPages: 0,
  inProgressTotalPages: 0,
  finishedTotalPages: 0,
  selectedReferral: {
    id: "",
    department_id: "",
    appointment_id: "",
    appointment: {
      date: "",
      time: "",
      cause: "",
      response: "",
    },
    ref_status: "",
    citizen_id: "",
    citizen: {
      first_name: "",
      last_name: "",
    },
  },

  /* selectReferral: async (id) => {
    const referral = await getReferralById(id);
    set({
      selectedReferral: {
        ...referral,
        id,
      },
    });
  }, */
  getAllReferrals: async (page) => {
    try {
      const pendings = await getAllPendingReferrals(page);
      const inProgress = await getAllInProgressReferrals(page);
      const finished = await getAllFinishedReferrals(page);
      // Actualización del estado con la lista de audiencias obtenida
      set({ 
        pendingReferrals: pendings.referrals, 
        inProgressReferrals: inProgress.referrals, 
        finishedReferrals: finished.referrals,
        pendingTotalPages: pendings.totalPages,
        inProgressTotalPages: inProgress.totalPages,
        finishedTotalPages: finished.totalPages,
        currentPage: 1
      });
    } catch (error) {
      console.log("Error al obtener las audiencias.", error);
    }
  },
  getAllPendingReferrals: async (page) => {
    const data = await getAllPendingReferrals(page)
    set({pendingReferrals: data.referrals, totalPages: data.totalPages, currentPage: page})
  },
  getAllInProgressReferrals: async (page) => {
    const data = await getAllInProgressReferrals(page)
    set({inProgressReferrals: data.referrals, totalPages: data.totalPages, currentPage: page})
  },
  getAllFinishedReferrals: async (page) => {
    const data = await getAllFinishedReferrals(page)
    set({finishedReferrals: data.referrals, totalPages: data.totalPages, currentPage: page})
  },
  selectReferral: async (id) => {
    const referral = await getReferralById(id);
    set({
      selectedReferral: {
        ...referral,
        id,
      },
    });
  },
  createReferral: async (data) => {
    try {
      await createReferral(data);
    } catch (error) {
      console.log("Error al obtener las audiencias.", error);
    }
  },
  deleteReferral: async (id) => {
    try {
      await deleteReferral(id);
    } catch (error) {
      console.log("Error al borrar", error);
    }
  },

  editReferral: async (id, data) => {
    try {
      await updateReferral(id, data);
    } catch (error) {
      console.log("Error al borrar", error);
    }
  },
}));
