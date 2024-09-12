import React, { FocusEventHandler, HTMLInputTypeAttribute } from 'react'


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    
}


const Input: React.FC<Props> = ({ ...props }) => {


    return (
        <React.Fragment>
            <input
                { ...props }
                className={`
                    none-st h-12 border border-border-gray-02 rounded-lg text-body-3r px-3
                    peer focus:border-position-short focus:shadow-border-1 transition-border-shadow
                    ${ props.className }
                `}
            />
            {/* <span className='input-wrap'></span> */}
        </React.Fragment>
    )
}

export default Input
