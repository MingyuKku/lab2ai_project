import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import Input from 'components/common/input/Input';
import Check from 'components/common/input/Check';


interface Props {
    webLink: string;
    setWebLink: React.Dispatch<React.SetStateAction<string>>;    
    webLinkError: boolean;
    webLinkBlankFlag: boolean;
    setWebLinkBlankFlag: React.Dispatch<React.SetStateAction<boolean>>;    
}


const WebLinkInput: React.FC<Props> = ({ webLink, setWebLink, webLinkError, webLinkBlankFlag, setWebLinkBlankFlag }) => {

    // const [ isChecked, setChecked ] = React.useState(true);
    const onInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;
        setWebLink(value);
    }, [])
    
    return (
        <div className='flex items-center mb-space-bottom-lg'>
            <h1 className='text-h4 font-medium shrink-0 min-w-[90px] w-1/5'>웹링크<span className='text-position-short'>*</span></h1>
            <div className='w-full'>
                <div className='w-full'>
                    <Input
                        type='text'
                        placeholder={ '웹 링크를 입력하세요.' }
                        className={`block h-9 w-full ${ webLinkError ? 'border-position-short' : '' }`}
                        onInput={ onInput }
                        value={ webLink }
                    />
                </div>
                <div className='mt-1.5 ml-1'>
                    <Check
                        label='새 창으로 열기'
                        id='update-web-blank'
                        name='update-web-blank'
                        isChecked={ webLinkBlankFlag }
                        setChecked={ setWebLinkBlankFlag }
                    />
                </div>
            </div>
            
        </div>
    )
}

export default WebLinkInput;
