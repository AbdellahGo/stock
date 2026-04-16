import { Search, Plus, FileDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from './Button';
import { ExportTable } from './ExportTable';


const SearchBar = () => {
    const { setSearch, setProductForm, setExportTP, exportTP } = useAppContext()
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-end justify-between gap-2">
                <h2 className="italic font-medium font-serif text-[30px] leading-7.5">
                    Products
                </h2>
                <span className="font-sans text-[#a09d94] flex items-center gap-2">
                    <span>1</span>
                    products
                </span>
            </div>
            <div className='flex items-center gap-2'>
                <div className="bg-white w-50 font-sans gap-1 border border-gray-400 rounded-lg py-2.25 px-2.75 flex items-center ">
                    <Search
                        className='w-[10%] text-[#a09d94]'
                        size={20}
                        strokeWidth={2}
                    />
                    <input onChange={(e) => setSearch(e.target.value)} className='w-[90%] outline-none border-none' type="text" placeholder="search by name, category, supplier" />
                </div>
                <Button onClick={() => setExportTP({ isOpen: true })}>
                    <FileDown
                        color='#ffffff'
                        size={15}
                        strokeWidth={2} />
                    Export
                </Button>

                <Button onClick={() => setProductForm({
                    isOpen: true,
                    action: 'add',
                    productIndex: -1
                })}>
                    <Plus
                        color='#ffffff'
                        size={15}
                        strokeWidth={2}
                    />
                    Add product
                </Button>
            </div>
            {exportTP.isOpen ? <ExportTable setExportTP={setExportTP} /> : ''}
        </div >
    )
}

export default SearchBar