import axios from "axios"

const BASE_URL: string = `${import.meta.env.VITE_API_BASE_URL}/api/suppliers`

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // for automatically sending and receiving cookies
    headers: {
        'Content-Type': 'application/json',
    }
})

export async function getSuppliers() {
    try {
        const res = await axiosInstance.get('')
        return res.data
    } catch (error) {
        console.log(error);
    }
}