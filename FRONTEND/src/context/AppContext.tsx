import React, { createContext, useContext, useEffect, useState } from "react"
import type { IContextType, Modal_Export_Table_State, Modal_P_Delete_State, Modal_PD_State, Modal_PF_State, UserDataType } from "../types/types"
import { useCheckAuthoUser } from "../lib/query/autho"


export const INITIAL_USER = {
  id: '',
  username: '',
  email: ''
}

const INITIAL_STATE = {
  search: '',
  setSearch: () => { },

  productForm: {
    isOpen: false,
    action: null,
    productIndex: -1
  },
  setProductForm: () => { },

  productModal: {
    isOpen: false,
    productIndex: -1
  },
  setProductModal: () => { },

  deleteP: {
    isOpen: false,
    productId: -1,
    productName: ''
  },
  setDeleteP: () => { },

  exportTP: {
    isOpen: false,
  },
  setExportTP: () => { },

  user: INITIAL_USER,
  setUser: () => { },

  isAuthenticated: false,
  setIsAuthenticated: () => { },

  login: () => { },

  isLoadingUserData: true,
}

const AppContext = createContext<IContextType>(INITIAL_STATE)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // STATE THET STORES USER DATA (id, username, email)
  const [user, setUser] = useState<UserDataType>(INITIAL_USER)

  // STATE THET CONFIRMS THE USER IS CONNECTED
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  // STATE THAT ALLOWS TO SEARCH FOR A PRODUCT BY NAME CATEGORY SUPLLIER
  const [search, setSearch] = useState<string>('')

  // STATE THAT ALLOWS TO OPEN MODUL TO ADD OR EDIT PRODUCT
  const [productForm, setProductForm] = useState<Modal_PF_State>(INITIAL_STATE.productForm);

  // STATE THAT ALLOWS TO OPEN MODUL FOR PRODUCT DETAILS
  const [productModal, setProductModal] = useState<Modal_PD_State>(INITIAL_STATE.productModal);

  // STATE THAT ALLOWS TO OPEN MODUL TO DELETE PRODUCT
  const [deleteP, setDeleteP] = useState<Modal_P_Delete_State>(INITIAL_STATE.deleteP);

  // STATE THAT ALLOWS TO OPEN MODUL TO exporte products table
  const [exportTP, setExportTP] = useState<Modal_Export_Table_State>(INITIAL_STATE.exportTP);

  // LOADING STATE
  const [isLoadingUserData, setIsLoadingUserData] = useState(true)

  // TANSTACK QUERY
  const { data, isSuccess, isError } = useCheckAuthoUser();

  // LOGIN
  const login = (userData: UserDataType) => {
    setUser(userData); // Storing user Data
    setIsAuthenticated(true);
  }

  const value = {
    search,
    setSearch,
    productForm,
    setProductForm,
    productModal,
    setProductModal,
    deleteP,
    setDeleteP,
    exportTP,
    setExportTP,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    login,
    isLoadingUserData,
  }


  useEffect(() => {
    if (isSuccess && data?.user) {
      // If the request is successful, we fill in the data in the State
      setUser(data.user);
      setIsAuthenticated(true);
      setIsLoadingUserData(false);

    } else if (isError) {
      // If it fails (ex: the token has expired or does not exist), we verify that the user is logged out.
      setUser(INITIAL_USER);
      setIsAuthenticated(false);
      setIsLoadingUserData(false);
    }
  }, [data, isSuccess, isError]);
  return (
    <AppContext.Provider value={value}>
      {/* {!isQueryLoading ? children : 'Loading...'} */}
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
export const useAppContext = () => useContext(AppContext)