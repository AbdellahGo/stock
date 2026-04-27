import { Link } from 'react-router-dom'

type Props = {
    PDescription: string
    path: string
    linkTitel: string
    LinkStyles?: string
    PStyles?: string
}

const FormNavigator = ({ PStyles, PDescription, path, LinkStyles, linkTitel }: Props) => {
    return (
        <p className={`mt-6 text-center w-112.5 text-brand-badge-text ${PStyles}`}>
            {PDescription}
            <Link to={`${path}`} className={`text-black font-medium ml-1 ${LinkStyles}`}>
                {linkTitel}
            </Link>
        </p>
    )
}

export default FormNavigator