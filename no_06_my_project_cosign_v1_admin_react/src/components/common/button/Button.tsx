import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    buttonType?: 'cancle' | 'ok'
}

const Button: React.FC<Props> = ({ label, buttonType, ...props }) => {
    return (
        <button
            { ...props }
            className={`
                ${ (!buttonType || buttonType === 'ok') ? 'text-font-white bg-position-short' : 'text-font-dark-03 border border-border-dark-03' }
                block w-full text-h3 h-12 rounded-md hover:bg-opacity-85
                ${ props.className }
            `}
        >
            { label }
        </button>
    )
}

export default Button;
