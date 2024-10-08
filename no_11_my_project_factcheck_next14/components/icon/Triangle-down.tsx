import React from 'react'

interface Props {
    color?: string;
    className?: string;
}

const TriangleDown: React.FC<Props> = ({ color, className }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={ className }>
            <path d="M9.64645 13.6464L4.85355 8.85355C4.53857 8.53857 4.76165 8 5.20711 8H14.7929C15.2383 8 15.4614 8.53857 15.1464 8.85355L10.3536 13.6464C10.1583 13.8417 9.84171 13.8417 9.64645 13.6464Z" fill={ color ?? "black" }/>
        </svg>
    )
}

export default TriangleDown
