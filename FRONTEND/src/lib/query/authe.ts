import { useMutation } from "@tanstack/react-query"
import { logInUser, registerUser } from "../api/autheApi"
import type { RegisterFormData } from "../../pages/Register"
import type { logInFormData } from "../../pages/LogIn"

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: async (userData: RegisterFormData) => registerUser(userData),
    })
}


export const useLogInUser = () => {
    return useMutation({
        mutationFn: async (userData: logInFormData) => logInUser(userData)
    })
}