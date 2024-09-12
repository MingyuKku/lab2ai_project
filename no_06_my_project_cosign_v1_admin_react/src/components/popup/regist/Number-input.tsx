import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import Input from 'components/common/input/Input';


interface Props {
    popupNum: number;
    setPopupNum: React.Dispatch<React.SetStateAction<number>>;    
    inputInfo: string;
    numError: boolean;
}

const NumberInput: React.FC<Props> = ({ popupNum, setPopupNum, inputInfo, numError }) => {

    const onInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;
        setPopupNum(Number(value));
    }, [])
  
    return (
        <div className='flex items-center mb-space-bottom-lg'>
            <h1 className='text-h4 font-medium shrink-0 min-w-[90px] w-1/5'>순번<span className='text-position-short'>*</span></h1>
            <div className='w-full'>
                <Input
                    type='number'
                    className={`block h-9 w-full ${ numError ? 'border-position-short' : '' }`}
                    onInput={ onInput }
                    value={ popupNum }
                />
                {
                    !numError &&
                    <div className='ml-1 mt-2 text-cap-2r text-font-dark-03'>{ inputInfo }</div>
                }
                {
                    numError &&
                    <div className='text-position-short text-cap-2m font-normal ml-1 mt-2'><InfoCircleOutlined /><span className='ml-1'>{ inputInfo }</span></div>
                }
            </div>
        </div>
    )
}

export default React.memo(NumberInput);


