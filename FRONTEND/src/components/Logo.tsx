
type Props = {
    HStyles?: string
    SpanStyles?: string
    EmStyles?: string
}

const Logo = ({ HStyles, SpanStyles, EmStyles }: Props) => {
    return (
        <h1 className={`font-mono font-black flex items-center gap-2.25 ${HStyles}`}>
            <span className={`block w-5.5 h-5.5 rounded-sm bg-black ${SpanStyles}`} />
            Stock
            <em className={`-ml-2.25 font-normal ${EmStyles}`}>Manager</em>
        </h1>
    )
}

export default Logo