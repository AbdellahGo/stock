import axios, { AxiosError } from "axios"
import type { RegisterFormData } from "../../pages/Register"
import type { logInFormData } from "../../pages/LogIn"



const BASE_URL: string = `${import.meta.env.VITE_API_BASE_URL}/api/authe`

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // for automatically sending and receiving cookies
    headers: {
        'Content-Type': 'application/json'
    }
})



export async function registerUser(userData: RegisterFormData) {
    try {
        const res = await axiosInstance.post('/register', userData)
        return res.data
    } catch (err: unknown) {
        const error = err as AxiosError
        throw error.response?.data || new Error("Something went wrong");
    }
}

export async function logInUser(userData: logInFormData) {
    try {
        const res = await axiosInstance.post('/login', userData)
        return res.data
    } catch (err: unknown) {
        const error = err as AxiosError
        throw error.response?.data || new Error("Something went wrong");
    }
}

