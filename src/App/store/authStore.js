import { create } from 'zustand'
import { loginRequest } from '../../data/api/authApi'


export const useAuthStore = create((set) => ({
user: null,
role: null,


login: async (credentials) => {
const { data } = await loginRequest(credentials)
localStorage.setItem('token', data.token)
set({ user: data.user, role: data.role })
},


logout: () => {
localStorage.removeItem('token')
set({ user: null, role: null })
},
}))