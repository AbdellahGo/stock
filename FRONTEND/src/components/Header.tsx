import Logo from "./Logo"

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
                    <Logo />
                    <span className="w-px h-6 bg-[#ccc] block " />
                    <span className="font-mono text-gray-400 text-[14px]" >{date}</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="block rounded-full w-2 h-2 bg-green-800" />
                    <span className="text-gray-400 text-[14px] font-mono">Connected</span>
                </div>
            </div>
        </header>
    )
}

export default Header