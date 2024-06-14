import { jwtDecode } from 'jwt-decode'
import {create} from 'zustand'

export const useAuthStore = create(set => ({
    username: "",
    password: "",
    role: "",
    token: "",
    getUser: () => {
        const token = localStorage.getItem('jwt') ?? ""
        const decoded = jwtDecode(token)
        const {username, role} = decoded
        set({username, role})
    }
}))