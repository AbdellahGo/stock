import type { Dispatch, SetStateAction } from "react"
import type { ExportProducts, Modal_Export_Table_State, ProductsType } from "../types/types"
import { FileDown, X } from "lucide-react"
import z from "zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./Button"
import { useQueryClient } from '@tanstack/react-query';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
type Props = {
    setExportTP: Dispatch<SetStateAction<Modal_Export_Table_State>>
}


const exportSchema = z.object({
    file_name: z.string().min(5, "File name must be at least 5 characters"),
    file_type: z.enum(['pdf', 'xlxs']),
})

type ExportFormData = z.infer<typeof exportSchema>

export const ExportTable = ({ setExportTP }: Props) => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm<ExportFormData>({
        resolver: zodResolver(exportSchema),
        defaultValues: {
            file_name: '',
            file_type: 'pdf',
        }
    })

    const closeModal = () => setExportTP({ isOpen: false });

    const onSubmit: SubmitHandler<ExportFormData> = (formData: ExportFormData) => {
        const cachedData: (ProductsType | undefined) = queryClient.getQueryData<ProductsType>(['getProducts'])

        if (!cachedData || cachedData.length === 0) {
            alert("No data available to export.");
            return;
        }

        const dataToExport = cachedData?.map(({ id, name, price, quantity, category_name, supplier_name, description, created_at, image_url }) => ({
            id,
            name,
            price,
            quantity,
            category_name,
            supplier_name,
            description,
            created_at,
            image_url,
        }))

        const fileName = formData.file_name;

        // Export to excel
        if (formData.file_type === 'xlxs') {
            handleExportExcel(dataToExport, fileName)
        }
        // Export to pdf
        else if (formData.file_type === 'pdf') {
            handleExportPdf(dataToExport, fileName)
        }

        closeModal();
    };

    const handleExportExcel = (data: ExportProducts, fileName: string) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
        // downloading the file
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    }

    const handleExportPdf = (data: ExportProducts, fileName: string) => {
        const doc = new jsPDF('landscape');

        const tableColumn = ["ID", "Name", "Category", "Supplier", "Price", "QTY", "Description", "Created_at",
            "Image_url"];

        // Type should be an array of arrays, not Export_Products_Type
        const tableRows: (string | number)[][] = [];

        data.forEach(({ id, name, category_name, supplier_name, price, quantity, description, created_at, image_url }) => {
            const productData = [
                id,
                name,
                category_name,
                supplier_name,
                price,
                quantity,
                description.length > 20 ? description.substring(0, 20) + "..." : description,
                new Date(created_at).toDateString(),
                image_url,
            ];
            tableRows.push(productData);
        });

        // drawing table in the pdf
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
            theme: 'grid',
            styles: {
                fontSize: 8, // Smaller font for many columns
                cellPadding: 2,
            },
            columnStyles: {
                // You can set specific widths if needed
                0: { cellWidth: 10 }, // ID column
                6: { cellWidth: 40 }, // Description column
            },
            // This allows the text to wrap instead of overlapping
            margin: { horizontal: 10 },
        });

        // adding a title to the file
        doc.text("Products List", 14, 15);

        // downloading the file
        doc.save(`${fileName}.pdf`);
    }

    return (
        <div
            onClick={closeModal}
            className="cursor-pointer fixed top-0 left-0 w-full h-full bg-[#14120a47] backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div
                onClick={(e) => e.stopPropagation()}
                className="cursor-auto bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl transition-all">
                <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-2xl font-mono font-bold text-gray-900'>Export Table</h2>
                    <button onClick={closeModal} className='cursor-pointer p-2 hover:bg-gray-100 border-gray-200 border rounded-xl transition-colors'>
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                            File Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("file_name")}
                            placeholder="products..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none transition-all placeholder:text-gray-300"
                        />
                        {errors.file_name && (
                            <p className="text-red-500 text-xs mt-1">{errors.file_name.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                            File Type
                        </label>
                        <select
                            {...register("file_type")}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none bg-white appearance-none cursor-pointer text-gray-500"
                        >
                            <option value={'pdf'}>pdf</option>
                            <option value={'xlxs'}>xlxs</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button
                            type="submit"

                        >
                            <FileDown
                                color='#ffffff'
                                size={15}
                                strokeWidth={2} />
                            Export
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
