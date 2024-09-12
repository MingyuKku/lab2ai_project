import { InfoCircleOutlined } from '@ant-design/icons';
import Input from 'components/common/input/Input'
import React from 'react'


interface Props {
    memo?: string;
    setMemo: React.Dispatch<React.SetStateAction<string>>;    
}


const RegistUpdateMemo: React.FC<Props> = ({ memo, setMemo }) => {

    const onInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMemo(e.target.value);
    }, [])
    
    return (
        <div className='flex items-center mb-space-bottom-lg'>
            <h1 className='text-h4 font-medium shrink-0 min-w-[90px] w-1/5'>업데이트 내용</h1>
            <div className='w-full'>
                <Input
                    type='text'
                    placeholder={ '' }
                    className={`block h-9 w-full`}
                    onInput={ onInput }
                    value={ memo }
                />
            </div>
        </div>
    )
}

export default React.memo(RegistUpdateMemo);
