import type { Dispatch, SetStateAction } from "react"

export type Modal_PD_State = {
    isOpen: boolean
    productIndex: number
}
export type Modal_P_Delete_State = {
    isOpen: boolean
    productId: number
    productName: string
}
export type Modal_Export_Table_State = {
    isOpen: boolean
}
export type Modal_PF_State = {
    isOpen: boolean;
    action: 'add' | 'edit' | null;
    productIndex: number
}
export type ProductsType = {
    id: number
    name: string
    price: number
    quantity: number
    category_id: number
    category_name: string
    supplier_id: string
    supplier_name: string
    description: string
    created_at: string
    image_url: string
}[]

export type ExportProducts = {
    id: number
    name: string
    price: number
    quantity: number
    category_name: string
    supplier_name: string
    description: string
    created_at: string
    image_url: string
}[]


export type ProductType = {
    name: string;
    price: number;
    quantity: number;
    category_id: number;
    supplier_id: number;
    description?: string | undefined;
    image_url?: string | undefined;
}

export type CategoriesType = {
    id: number
    name: string,
}[]
export type suppliersType = {
    id: number
    name: string,
    phone: string,
    email: string
}[]

export type UserDataType = {
    id: string
    username: string
    email: string
}

export type IContextType = {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>,

    productForm: Modal_PF_State,
    setProductForm: Dispatch<SetStateAction<Modal_PF_State>>,

    productModal: Modal_PD_State,
    setProductModal: Dispatch<SetStateAction<Modal_PD_State>>,

    deleteP: Modal_P_Delete_State,
    setDeleteP: Dispatch<SetStateAction<Modal_P_Delete_State>>,

    exportTP: Modal_Export_Table_State,
    setExportTP: Dispatch<SetStateAction<Modal_Export_Table_State>>,

    user: UserDataType,
    setUser: Dispatch<SetStateAction<UserDataType>>,

    isAuthenticated: boolean,
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>,

    login: (userData: UserDataType) => void,

    isLoadingUserData: boolean,
}

