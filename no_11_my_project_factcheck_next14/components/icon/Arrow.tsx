import React from 'react'

interface Props {
    className?: string;
}

const Arrow: React.FC<Props> = ({ className }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none" className={ className }>
            <path d="M15 6L8.5 12.5L15 19" stroke="#666666"/>
        </svg>
    )
}

export default Arrow
