
type Props = {
    HStyls?: string
    title: string
    PStyles?: string
    description?: string
    containerStyles?: string
}

const FormHead = ({HStyls, title, PStyles, description, containerStyles}: Props) => {
    return (
        <div className={`${containerStyles} mb-7`}>
            <h3 className={`${HStyls} font-serif text-[35px]`}>{title}</h3>
            <p className={`${PStyles} text-brand-badge-text`}>{description}</p>
        </div>
    )
}

export default FormHead