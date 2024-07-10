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
  referrals: {pendings: [], inProgress: [], finished: []},
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
  getAllReferrals: async () => {
    try {
      const pendings = await getAllPendingReferrals();
      const inProgress = await getAllInProgressReferrals();
      const finished = await getAllFinishedReferrals();
      // Actualización del estado con la lista de audiencias obtenida
      set({ referrals: {pendings, inProgress, finished} });
    } catch (error) {
      console.log("Error al obtener las audiencias.", error);
    }
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
