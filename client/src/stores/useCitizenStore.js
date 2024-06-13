import {create} from 'zustand'
import { createCitizen, deleteCitizen, getAllCitizens, getCitizenById, updateCitizen } from '../services/citizenService'

export const useCitizenStore = create(set => ({
    citizens: [],
    selectedCitizen: {
        id: "",
        rut: "",
        first_name: "",
        last_name: "",
        address: "",
        email: "",
        phone: "",
        phone_2: ""
    },
    selectCitizen: async(id) => {
        const citizen = await getCitizenById(id)
        set({selectedCitizen: {
            ...citizen,
            id
        }})
    },
    getAllCitizens: async () => {
        const data = await getAllCitizens()
        set({citizens: data})
    },
    createCitizen: async (data) => {
        await createCitizen(data)
    },
    deleteCitizen: async (id) => {
        await deleteCitizen(id)
    },
    editCitizen: async(id, data) => {
        await updateCitizen(id, data)
    }

}))