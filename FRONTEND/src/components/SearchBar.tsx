import { Search, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';


const SearchBar = () => {
    const { setSearch, setProductForm } = useAppContext()
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
                <button onClick={() => setProductForm({
                    isOpen: true,
                    action: 'add',
                    productIndex: -1
                })}
                    className='hover:bg-[#444] transition flex items-center gap-2 rounded-lg py-2.25 px-2.75 bg-black text-white font-sans'>
                    <Plus
                        color='#ffffff'
                        size={15}
                        strokeWidth={2}
                    />
                    Add product
                </button>
            </div>
        </div>
    )
}

export default SearchBar