import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

const Gradient: React.FC<Props> = ({ label, ...props }) => {
    return (
        <button
            { ...props }
            className={ `
                relative overflow-hidden flex items-center justify-center w-full rounded-lg h-12
                before:content-[''] before:absolute before:y-center before:left-0 before:w-[300%] before:h-full before:bg-button before:transition-transform
                hover:before:-translate-x-1/2 hover:before:-translate-y-1/2
            ` }
        >
            <span className='relative text-h3 text-font-white'>{ label }</span>
            
        </button>
    )
}

export default Gradient
