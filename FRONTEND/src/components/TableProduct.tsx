import { Eye, MonitorOff, Pencil, Trash2 } from 'lucide-react';
import ProductDetails from './ProductDetails';
import type { ProductsType } from '../types/types';
import DeleteProduct from './DeleteProduct';
import ProductForm from './productForm';
import { useGetProducts } from '../lib/query/products';
import { useAppContext } from '../context/AppContext';





const TableProduct = () => {
    const { setProductForm, productForm, setProductModal, productModal, deleteP, setDeleteP, search } = useAppContext()

    const { data: products, isPending } = useGetProducts() as { data: ProductsType, isPending: boolean }

    const filteredProducts = products?.filter((product) => (
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category_name.toLowerCase().includes(search.toLowerCase()) ||
        product.supplier_name.toLowerCase().includes(search.toLowerCase())
    )) || [];
    return (
        <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 shadow-sm md:overflow-hidden overflow-x-scroll">
            <table className="md:w-full text-left text-sm text-gray-600 ">
                <thead className="bg-brand-header text-xs font-semibold uppercase tracking-wider text-brand-muted border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3 text-center">Category</th>
                        <th className="px-6 py-3">Supplier</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3 text-center">Qty</th>
                        <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                </thead>

                {isPending || filteredProducts.length > 0 ?
                    <tbody className="divide-y divide-gray-200 bg-white font-medium">
                        {filteredProducts.map((product, i) => (
                            <tr key={product.id} className="hover:bg-brand-bg transition-colors">
                                <td className="px-6 py-2 text-brand-muted">{product.id}</td>
                                <td className="px-6 py-2 text-gray-900 font-bold">{product.name}</td>
                                <td className="px-6 py-2 text-center">
                                    <span className="inline-block px-3 py-1 rounded-full bg-brand-badge-bg text-brand-badge-text text-xs font-bold">
                                        {product.category_name}
                                    </span>
                                </td>
                                <td className="px-6 py-2 text-brand-muted">{product.supplier_name}</td>
                                <td className="px-6 py-2 text-gray-900 font-bold">{product.price} $</td>
                                <td className="px-6 py-2 text-center text-brand-muted font-normal">{product.quantity}</td>
                                <td className="px-6 py-2">
                                    <div className="flex justify-center items-center gap-2">
                                        <button onClick={() => setProductModal({
                                            isOpen: true,
                                            productIndex: i
                                        })}
                                            className="p-2 rounded-lg border border-gray-100 hover:border-blue-300 hover:text-blue-400 hover:bg-blue-100 text-brand-muted transition-colors">
                                            <Eye size={18} />
                                        </button>
                                        <button onClick={() => setProductForm({
                                            isOpen: true,
                                            action: 'edit',
                                            productIndex: i,
                                        })}
                                            className="p-2 rounded-lg border border-gray-100 hover:border-green-300 hover:text-green-400 hover:bg-green-100 text-brand-muted transition-colors">
                                            <Pencil size={18} />
                                        </button>
                                        <button onClick={() => setDeleteP({
                                            isOpen: true,
                                            productId: product.id,
                                            productName: product.name
                                        })}
                                            className="p-2 rounded-lg border border-gray-100 hover:border-red-300 hover:text-red-400 hover:bg-red-100 text-brand-muted transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    : ''}
            </table>
            {filteredProducts.length > 0 ||
                <div
                    className="flex flex-col items-center justify-center py-12 text-gray-400"
                    id="emptyState">
                    <MonitorOff
                        size={36}
                        strokeWidth={1.2}
                        className="mb-3"
                    />
                    <p className="text-sm font-medium">No products found.</p>
                </div>
            }
            {productModal.isOpen ? <ProductDetails product={products[productModal.productIndex]} setProductModal={setProductModal} /> : ''}

            {productForm.isOpen && (
                <ProductForm
                    action={productForm.action}
                    product={productForm.action === 'edit' ? products[productForm.productIndex] : null}
                    setProductForm={setProductForm}
                />
            )}

            {deleteP.isOpen ? <DeleteProduct productName={deleteP.productName} productId={deleteP.productId} setDeleteP={setDeleteP} /> : ''}
        </div>
    )
}

export default TableProduct