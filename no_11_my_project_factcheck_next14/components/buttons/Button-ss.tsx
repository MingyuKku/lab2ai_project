import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    buttonType?: 'cancle' | 'ok',
    children?: React.ReactNode;
}

const ButtonLg: React.FC<Props> = ({ label, buttonType, children, ...props }) => {
    return (
        <button
            { ...props }
            className={`
                ${ (!buttonType || buttonType === 'ok') ? 'text-achromatic-white bg-primary-blue' : 'text-achromatic-black bg-achromatic-white border border-achromatic-01' }
                block h-7 body-ss rounded hover:bg-opacity-85
                ${ props.className }
            `}
        >
            { label }
            { children }
        </button>
    )
}

export default ButtonLg;
