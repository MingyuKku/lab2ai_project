import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FC<Props> = ({ ...props }) => {
    return (
        <textarea
            { ...props }
            className={`
                none-st h-11 text-achromatic-black placeholder:text-achromatic-03 bg-achromatic-white border border-achromatic-02 rounded-[1px] body-sm p-3
                peer focus:border-primary-blue focus:shadow-blue-01 transition-shadow duration-200 ease-in-out
                ${ props.className }
            `}
        />
    )
}

export default Textarea
