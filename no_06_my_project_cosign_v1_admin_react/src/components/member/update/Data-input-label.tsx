import React from 'react'
import Input from 'components/common/input/Input';


interface Props {
    label: string;
    placeholder?: string;
    value?: any;
    setValue?: React.Dispatch<React.SetStateAction<any>>;
    readOnly?: boolean;
    children?: React.ReactNode;    
}

const DataInputLabel: React.FC<Props> = ({ label, placeholder, value, setValue, readOnly, children }) => {

    const onInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!setValue) return;

        setValue(e.target.value);
    }, [])

    return (
        <div className='flex items-center mb-space-bottom-lg'>
            <h1 className='text-h4 font-medium shrink-0 min-w-[90px] w-1/5'>{ label }</h1>
            <div className='w-full'>
                <Input
                    type='text'
                    placeholder={ placeholder }
                    className={`block h-9 w-full ${readOnly ? 'border-border-gray-04 focus:shadow-none text-font-dark-03' : ''}`}
                    onInput={ onInput }
                    value={ value ?? '' }
                    readOnly={ readOnly }
                />
            </div>
            { children }
        </div>
    )
}

export default React.memo(DataInputLabel);
