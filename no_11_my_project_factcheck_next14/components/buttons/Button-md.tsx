import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    buttonType?: 'cancle' | 'ok',
    children?: React.ReactNode;
}

const ButtonMd: React.FC<Props> = ({ label, buttonType, children, ...props }) => {
    return (
        <button
            { ...props }
            className={`
                ${ (!buttonType || buttonType === 'ok') ? 'text-achromatic-white bg-primary-blue' : 'text-achromatic-black bg-achromatic-white border-2 border-achromatic-01' }
                block h-11 title-md rounded-lg hover:bg-opacity-85
                ${ props.className }
            `}
        >
            { label }
            { children }
        </button>
    )
}

export default ButtonMd
