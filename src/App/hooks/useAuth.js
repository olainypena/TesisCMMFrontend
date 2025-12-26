import { useAuthStore } from '../store/authStore'


export const useAuth = () => {
const { user, role, login, logout } = useAuthStore()
return { user, role, login, logout }
}