import { create } from "zustand";
import {
  createReferral,
  deleteReferral,
  getAllReferrals,
  updateReferral,
} from "../services/referralService";
import { checkToken } from "../utils/helpers";

const isTokenExpired = checkToken(localStorage.getItem("jwt"));

export const useReferralStore = create((set) => ({
  referrals: [],
  selectedReferral: {
    id: '',
    department_id: '',
    appointment_id: '',
    ref_status: '',
    citizen_id: ''
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
      if (!isTokenExpired) {
        const data = await getAllReferrals();
        // Actualización del estado con la lista de audiencias obtenida
        set({ referrals: data });
      }
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
      if (!isTokenExpired) {
        await createReferral(data);
      }
    } catch (error) {
      console.log("Error al obtener las audiencias.", error);
    }
  },
  deleteReferral: async (id) => {
    
    try {
        if (!isTokenExpired) {
            await deleteReferral(id);
        }
      } catch (error) {
        console.log("Error al borrar", error);
      }
  },
  
  editReferral: async (id, data) => {
    
    try {
      if (!isTokenExpired) {
        await updateReferral(id, data);
      }
    } catch (error) {
      console.log("Error al borrar", error);
    }
  },
}));
