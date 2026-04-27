import axios from "axios";
import type { ProductType } from "../../types/types";

const BASE_URL: string = `${import.meta.env.VITE_API_BASE_URL}/api/products`

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // for automatically sending and receiving cookies
    headers: {
        'Content-Type': 'application/json',
    }
})

export async function getProducts() {
    try {
        const res = await axiosInstance.get('')
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export async function deleteProduct(productId: number) {
    try {
        const res = await axiosInstance.delete(`${productId}`)
        return res
    } catch (error) {
        console.log(error);
    }
}


export async function addProduct(productData: ProductType) {
    try {
        const res = await axiosInstance.post('', productData)
        return res
    } catch (error) {
        console.log(error);
    }
}

export async function editProduct(productId: number, productData: ProductType) {
    try {
        const res = await axiosInstance.put(`/${productId}`, productData)
        return res
    } catch (error) {
        console.log(error);
    }
}