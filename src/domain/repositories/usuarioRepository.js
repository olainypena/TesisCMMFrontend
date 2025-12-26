import { loginRequest } from '../../data/api/authApi'


export const loginUser = async (credentials) => {
const response = await loginRequest(credentials)
return response.data
}