import {create} from 'zustand'
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../services/userService'

export const useUserStore = create(set => ({
    users: [],
    selectedUser: {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        role: ""
    },
    selectUser: async(id) => {
        const user = await getUserById(id)
        set({selectedUser: {
            ...user,
            id
        }})
    },
    getAllUsers: async () => {
        const data = await getAllUsers()
        set({users: data})
    },
    createUser: async (data) => {
        await createUser(data)
    },
    deleteUser: async (id) => {
        await deleteUser(id)
    },
    editUser: async(id, data) => {
        await updateUser(id, data)
    }

}))