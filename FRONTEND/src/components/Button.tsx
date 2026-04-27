import type React from "react"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
    bStyles?: string
}

export const Button = ({ children, bStyles, ...props }: Props) => {
    return (
        <button {...props}
            className={`cursor-pointer hover:bg-[#444] transition flex items-center justify-center font-mono gap-2 rounded-lg py-2.25 px-2.75 bg-black text-white ${bStyles}`}>
            {children}
        </button>
    )
}
