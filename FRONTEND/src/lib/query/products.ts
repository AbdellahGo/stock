import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ProductType } from '../../types/types'
import { addProduct, deleteProduct, editProduct, getProducts } from '../api/productsApi'


export const useGetProducts = () => {
    return useQuery({
        queryKey: ['getProducts'],
        queryFn: async () => getProducts()
    })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (productId: number) => deleteProduct(productId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['getProducts'],
            })
        }
    })
}

export const useAddProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (productData: ProductType) => addProduct(productData),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['getProducts'],
            })
        }
    })
}


export const useEditProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (dataToEdit: { productId: number, productData: ProductType }) => editProduct(dataToEdit.productId, dataToEdit.productData),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['getProducts'],
            })
        }
    })
}

