import React from 'react'


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}


const FormInputMd: React.FC<Props> = ({ ...props }) => {
    return (
        <React.Fragment>
            <input
                { ...props }
                className={`
                    none-st h-11 text-achromatic-black placeholder:text-achromatic-02 bg-achromatic-white border border-achromatic-02 rounded-[1px] body-sm px-3
                    peer focus:border-primary-blue focus:shadow-blue-01 transition-shadow duration-200 ease-in-out
                    ${ props.className }
                `}
            />
            {/* <span className='input-wrap'></span> */}
        </React.Fragment>
    )
}

export default FormInputMd;
