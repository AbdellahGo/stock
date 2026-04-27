import { Search, Plus, FileDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from './Button';
import { ExportTable } from './ExportTable';


const SearchBar = () => {
    const { setSearch, setProductForm, setExportTP, exportTP } = useAppContext()
    return (
        <div className="flex justify-between md:items-center items-start">
            <div className="flex items-end justify-between gap-2">
                <h2 className="italic font-medium font-serif text-30 leading-7.5">
                    Products
                </h2>
                <span className="font-sans text-brand-muted flex items-center gap-2">
                    <span>1</span>
                    products
                </span>
            </div>
            <div className='flex items-center md:flex-nowrap flex-wrap gap-2 md:w-112.5 w-75'>
                {/* search input */}
                <div className="bg-white font-sans gap-1 border border-gray-400 rounded-lg py-2.25 px-2.75 flex items-center w-full ">
                    <Search
                        className='w-[10%] text-brand-muted'
                        size={20}
                        strokeWidth={2}
                    />
                    <input onChange={(e) => setSearch(e.target.value)} className='w-[90%] outline-none border-none' type="text" placeholder="search by name, category, supplier" />
                </div>
                {/* export table button */}
                <Button bStyles='md:w-[calc(25%-4px)] w-[calc(50%-4px)] ' onClick={() => setExportTP({ isOpen: true })}>
                    <FileDown
                        color='#ffffff'
                        size={15}
                        strokeWidth={2} />
                    Export
                </Button>
                {/* add product button */}
                <Button bStyles='md:w-[calc(70%-4px)] w-[calc(50%-4px)]' onClick={() => setProductForm({
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