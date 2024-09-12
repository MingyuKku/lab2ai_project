import React from 'react';
import Input from 'components/common/input/Input'


interface Props {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;    
    contentError: boolean;
}



const Title: React.FC<Props> = ({ content, setContent, contentError }) => {

    const onInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;
        setContent(value);
    }, [])
    
    
    return (
        <div className='flex items-center mb-space-bottom-lg'>
            <h1 className='text-h4 font-medium shrink-0 min-w-[90px] w-1/5'>내용<span className='text-position-short'>*</span></h1>
            <div className='w-full'>
                <div className='w-full'>
                    <Input
                        type='text'
                        placeholder={ '내용을 입력하세요.' }
                        className={`block h-9 w-full ${ contentError ? 'border-position-short' : '' }`}
                        onInput={ onInput }
                        value={ content }
                    />
                </div>
            </div>
        </div>
    )
}

export default Title
