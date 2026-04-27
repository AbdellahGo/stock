type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    labelText: string
    isRequired: boolean
    type: 'text' | 'password' | 'email' | 'number'
    placeholder?: string
    IStyles?: string
    LStyles?: string
}

const Input = ({ labelText, isRequired, type, placeholder, IStyles, LStyles, ...props }: Props) => {
    return (
        <div className={`flex flex-col gap-2 ${LStyles}`}>
            <label className="font-mono uppercase text-brand-badge-text" htmlFor="">{labelText}
                {isRequired}
                <span className="text-red-400">*</span>
            </label>
            <input {...props} type={type} placeholder={placeholder}
                className={`py-3 px-5 bg-brand-bg border outline-none font-mono border-brand-border rounded-xl ${IStyles}`} />
        </div>
    )
}

export default Input