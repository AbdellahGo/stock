import { X } from 'lucide-react';
import type { Modal_PD_State, ProductsType } from '../types/types';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
    setProductModal: Dispatch<SetStateAction<Modal_PD_State>>;
    product: ProductsType[number]
}

const ProductDetails = ({ product, setProductModal }: Props) => {
    const created_at = (product.created_at
        ? new Date(product.created_at).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
        : 'unknown')
        
    return (
        <div onClick={() => setProductModal({
            isOpen: false,
            productIndex: -1
        })}
            className="cursor-pointer font-mono md:p-6.25 flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[#14120a47] backdrop-blur-xs z-50">
            <div onClick={(e) => e.stopPropagation()} className="cursor-auto bg-white rounded-2xl w-137.5 p-8 shadow-2xl md:h-fit h-110 md:overflow-hidden overflow-y-scroll">
                <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-2xl font-bold text-gray-900'>{product.name}</h2>
                    <button onClick={() => setProductModal({
                        isOpen: false,
                        productIndex: -1
                    })} className='cursor-pointer p-2 hover:bg-gray-100 border-gray-200 border rounded-xl transition-colors'>
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>
                <div className="grid md:grid-cols-2 gap-y-8 gap-x-12 mb-8 relative">
                    <div>
                        <p className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-1">ID</p>
                        <p className="text-lg font-bold text-gray-800">#{product.id}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-1">Added On</p>
                        <p className="text-lg font-medium text-brand-text">{created_at}</p>
                    </div>
                    <span className='md:top-15 top-35 w-full h-px absolute bg-brand-border' />
                    <div>
                        <p className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-1">Price</p>
                        <p className="text-lg font-black text-gray-900">{product.price} €</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-1">Quantity in Stock</p>
                        <p className="text-lg font-medium text-brand-text">{product.quantity} units</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-1">Category</p>
                        <span className="inline-block bg-brand-pill px-4 py-1.5 rounded-full text-xs font-bold text-brand-text mt-1">
                            {product.category_name}
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-1">Supplier</p>
                        <p className="text-lg font-medium text-gray-700">{product.supplier_name}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">Description</p>
                    <div className="bg-[#f5f4f0] border border-brand-border rounded-xl p-3 h-fit">
                        <p className="text-brand-text font-medium">{product.description || 'no description for this product'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;