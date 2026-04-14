import axios from 'axios'

const BASE_URL: string = 'http://localhost:8080/api/categories'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})


export async function getCategories() {
    try {
        const res = await axiosInstance.get('')
        return res.data
    } catch (error) {
        console.log(error);
    }
}