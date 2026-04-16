import React, { createContext, useContext, useState } from "react"
import type { IContextType, Modal_Export_Table_State, Modal_P_Delete_State, Modal_PD_State, Modal_PF_State } from "../types/types"


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
}

const AppContext = createContext<IContextType>(INITIAL_STATE)

const AppProvider = ({ children }: { children: React.ReactNode }) => {

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
  }
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
export const useAppContext = () => useContext(AppContext)