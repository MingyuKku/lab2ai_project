import React from 'react';
import FormInputMd from '@/components/form/Input-md';


interface Props {
    label: string;
    inputName: string;
    borderPos?: 'top' | 'bottom';
    inputRule?: string;
    inputClassName?: string;
}
const NewUserRegistText: React.FC<Props> = ({ label, inputName, borderPos, inputRule, inputClassName }) => {

    const borderStyleClassName = React.useMemo(() => {
        if (borderPos === 'top') return 'border border-achromatic-03 border-b-0'
        if (borderPos === 'bottom') return 'border border-achromatic-03'
        return 'border border-achromatic-03 border-b-0';
    }, [])

    return (
        <div className='flex items-center h-[72px]'>
            <div
                className={`
                    label min-w-[132px] h-full bg-achromatic-02 px-4
                    ${ borderStyleClassName }
                `}
            >
                <div className='title-sm text-achromatic-white leading-[72px]'>{ label }</div>
            </div>
            <div
                className={`
                    px-4 w-full h-full
                    ${ borderStyleClassName }
                `}
            >
                <div className='h-full flex items-center'>
                    <FormInputMd type='text' name={ inputName } className={ inputClassName } />
                    { inputRule && <span className='ml-4 body-sm'>{ inputRule }</span> }
                </div>
            </div>
        </div>
    )
}

export default NewUserRegistText;
