import type { Dispatch, SetStateAction } from "react";
import { useDeleteProduct } from "../lib/query/products";
import type { Modal_P_Delete_State } from "../types/types"
import { Trash2 } from 'lucide-react';

type props = {
    setDeleteP: Dispatch<SetStateAction<Modal_P_Delete_State>>
    productId: number
    productName: string
}

const DeleteProduct = ({ productName, setDeleteP, productId }: props) => {
    const { mutateAsync: deleteProduct } = useDeleteProduct()
    
    const handelDeleteProduct = () => {
        setDeleteP({ isOpen: false, productId: -1, productName: '' });
        deleteProduct(productId)
    }
    return (
        <div
            onClick={() => setDeleteP({ isOpen: false, productId: -1, productName: '' })}
            className="cursor-pointer fixed top-0 left-0 w-full h-full bg-[#14120a47] backdrop-blur-xs z-50 flex items-center justify-center p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl transition-all cursor-auto"
            >
                <div className="mb-6 flex">
                    <div className="p-3 rounded-full bg-red-50 border border-red-100 text-red-500">
                        <Trash2 size={24} strokeWidth={2.5} />
                    </div>
                </div>

                <div className=" pb-3 mb-3 border-b border-brand-border">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 font-sans">Delete product?</h2>
                    <p className="text-gray-500 text-[15px] leading-relaxed">
                        "{productName}" will be permanently removed. This cannot be undone.
                    </p>
                </div>

                <div className="flex items-center justify-end gap-3">
                    <button
                        onClick={() => setDeleteP({ isOpen: false, productId: -1, productName: '' })}
                        className="cursor-pointer px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handelDeleteProduct}
                        className="cursor-pointer px-6 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors border border-red-100"
                    >
                        Yes, delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteProduct