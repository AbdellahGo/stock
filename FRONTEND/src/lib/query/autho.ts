import { useQuery } from "@tanstack/react-query"
import { checkAuthoUser } from "../api/aythoApi"

export const useCheckAuthoUser = () => {
    return useQuery({
        queryKey: ['checkAuthoUser'],
        queryFn: async () => checkAuthoUser(),
        retry: 2
    })
}