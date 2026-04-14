const Header = () => {
    const date = new Date().toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
    return (
        <header className="px-8 p-4.5 border-b border-[#ccc]">
            <div className="flex justify-between" >
                <div className="flex items-center gap-4">
                    <h1 className="font-mono font-black flex items-center gap-2.25">
                        <span className="block w-5.5 h-5.5 rounded-sm bg-black " />
                        Stock
                        <em className="-ml-2.25 font-normal">Manager</em>
                    </h1>
                    <span className="w-px h-6 bg-[#ccc] block " />
                    <span className="font-mono text-gray-400 text-[14px]" >{date}</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="block rounded-full w-2 h-2 bg-green-800"/>
                    <span className="text-gray-400 text-[14px] font-mono">Connected</span>
                </div>
            </div>
        </header>
    )
}

export default Header