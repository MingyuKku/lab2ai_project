interface Props {
    className?: string;
}

const ComponentLoading = ({ className }: Props) => {
    return (
        <div className={`loading-spin fixed z-50 w-9 h-9 left-[calc(50%-13px)] ${ className ?? '' }`}></div>
    )
}

export default ComponentLoading;

