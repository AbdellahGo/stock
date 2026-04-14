import { useQuery } from '@tanstack/react-query'
import { getSuppliers } from '../api/suppliersApi'

export const useGetSuppliers = () => {
    return useQuery({
        queryKey: ['getSuppliers'],
        queryFn: async () => getSuppliers()
    })
}