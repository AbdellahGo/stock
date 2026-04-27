import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";
import type { CategoriesType, Modal_PF_State, ProductsType, suppliersType } from "../types/types";
import { useAddProduct, useEditProduct } from "../lib/query/products";
import { useGetCategories } from "../lib/query/categories";
import { useGetSuppliers } from "../lib/query/suppliers";
import type { Dispatch, SetStateAction } from "react";

const productSchema = z.object({
    name: z.string().min(1, "Required"),
    price: z.number().min(0.01),
    quantity: z.number().min(1),
    category_id: z.number().min(1, "Please select a category"),
    supplier_id: z.number().min(1, "Please select a supplier"),
    description: z.string().optional(),
    image_url: z.string().url().optional().or(z.literal("")),
});

type ProductFormData = z.infer<typeof productSchema>;

type Props = {
    setProductForm: Dispatch<SetStateAction<Modal_PF_State>>;
    action: "add" | "edit" | null;
    product: ProductsType[number] | null
};

const ProductForm = ({ product, action, setProductForm }: Props) => {
    // queries
    const { data: categories, isPending: isCategories } = useGetCategories() as { data: CategoriesType, isPending: boolean }
    const { data: suppliers, isPending: isSuppliers } = useGetSuppliers() as { data: suppliersType, isPending: boolean }

    // mutation
    const { mutateAsync: addProduct } = useAddProduct()
    const { mutateAsync: editProduct } = useEditProduct()
    
    // useForm
    const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: action == 'edit' && product ? {
            name: product.name,
            price: Number(product.price),
            quantity: Number(product.quantity),
            category_id: Number(product.category_id),
            supplier_id: Number(product.supplier_id),
            description: product.description || "",
            image_url: product.image_url || "",
        }
            : {
                name: "",
                price: 0,
                quantity: 0,
                description: "",
                image_url: "",
            },
    });

    const onSubmit: SubmitHandler<ProductFormData> = (data) => {
        if (action === 'add') {
            addProduct(data)
        } else if (action === 'edit' && product?.id) {
            editProduct({
                productId: product.id,
                productData: data
            });
        }
        setProductForm({ isOpen: false, action: null, productIndex: -1 });
    };

    const closeModal = () => setProductForm({ isOpen: false, action: null, productIndex: -1 });

    return (
        <div
            onClick={closeModal}
            className="fixed top-0 left-0 w-full h-full bg-[#14120a47] backdrop-blur-xs z-50 flex items-center justify-center p-4 cursor-pointer">
            <div
                onClick={(e) => e.stopPropagation()}
                className="cursor-auto bg-white rounded-3xl w-full max-w-137.5 p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-gray-900 capitalize">
                        {action === "add" ? "Add product" : "Edit product"}
                    </h2>
                    <button
                        onClick={closeModal}
                        className="p-2 hover:bg-gray-100 border-gray-200 border rounded-xl transition-colors cursor-pointer">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                            Product Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("name")}
                            placeholder="e.g. Wireless Keyboard"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none transition-all placeholder:text-gray-300"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* السعر والكمية */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                                Price (€) <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("price", { valueAsNumber: true })}
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                                Quantity <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("quantity", { valueAsNumber: true })}
                                type="number"
                                placeholder="0"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* التصنيف والمورد */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                                Category
                            </label>
                            <select
                                {...register("category_id", { valueAsNumber: true })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none bg-white appearance-none cursor-pointer text-gray-500"
                            >
                                <option value="">Select...</option>
                                {isCategories || categories?.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                                Supplier
                            </label>
                            <select
                                {...register("supplier_id", { valueAsNumber: true })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none bg-white appearance-none cursor-pointer text-gray-500"
                            >
                                <option value="">Select...</option>
                                {isSuppliers || suppliers?.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* الوصف */}
                    <div>
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                            Description
                        </label>
                        <textarea
                            {...register("description")}
                            placeholder="Short product description..."
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none transition-all resize-none"
                        />
                    </div>

                    {/* رابط الصورة */}
                    <div>
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                            Image URL
                        </label>
                        <input
                            {...register("image_url")}
                            placeholder="https://..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* الأزرار */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="cursor-pointer px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer px-6 py-2.5 rounded-xl bg-[#1a1a1a] text-white font-bold text-sm hover:bg-black transition-colors"
                        >
                            Save product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
