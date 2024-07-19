import {create} from 'zustand'
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../services/userService'

export const useUserStore = create(set => ({
    users: [],
    currentPage: 1,
    totalPages: 0,
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
    getAllUsers: async (page) => {
        const data = await getAllUsers(page)
        set({users: data.users, totalPages: data.totalPages, currentPage: page})
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