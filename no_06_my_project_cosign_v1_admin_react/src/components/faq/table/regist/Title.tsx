import React from 'react'
import Input from 'components/common/input/Input';
import { InfoCircleOutlined } from '@ant-design/icons';


interface Props {
    title?: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;    
    titleError: boolean;
}

const RegistTitle: React.FC<Props> = ({ title, titleError, setTitle }) => {

    const onInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }, [])

    return (
        <div className='flex items-center mb-space-bottom-lg'>
            <h1 className='text-h4 font-medium shrink-0 min-w-[90px] w-1/5'>타이틀<span className='text-position-short'>*</span></h1>
            <div className='w-full'>
                <Input
                    type='text'
                    placeholder={ '제목을 입력하세요.' }
                    className={`block h-9 w-full`}
                    onInput={ onInput }
                    value={ title }
                />
                {
                    titleError &&
                    <div className='text-position-short text-cap-2m font-normal mt-1.5'><InfoCircleOutlined /><span className='ml-1'>제목을 입력해 주세요.</span></div>
                }
            </div>
        </div>
    )
}

export default React.memo(RegistTitle);
