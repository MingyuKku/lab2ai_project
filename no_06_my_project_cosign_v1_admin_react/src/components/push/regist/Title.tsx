import React from 'react';
import Input from 'components/common/input/Input'


interface Props {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;    
    titleError: boolean;
}



const Title: React.FC<Props> = ({ title, setTitle, titleError }) => {

    const onInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;
        setTitle(value);
    }, [])
    
    
    return (
        <div className='flex items-center mb-space-bottom-lg'>
            <h1 className='text-h4 font-medium shrink-0 min-w-[90px] w-1/5'>제목<span className='text-position-short'>*</span></h1>
            <div className='w-full'>
                <div className='w-full'>
                    <Input
                        type='text'
                        placeholder={ '제목을 입력하세요.' }
                        className={`block h-9 w-full ${ titleError ? 'border-position-short' : '' }`}
                        onInput={ onInput }
                        value={ title }
                    />
                </div>
            </div>
        </div>
    )
}

export default Title
