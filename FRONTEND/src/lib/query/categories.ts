import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../api/categoriesApi'

export const useGetCategories = () => {
    return useQuery({
        queryKey: ['getCategories'],
        queryFn: async () => getCategories()
    })
}