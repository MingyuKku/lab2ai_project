import React from 'react';
import Input from 'components/common/input/Input';


interface Props {
    appLink: string;
    setAppLink: React.Dispatch<React.SetStateAction<string>>;    
    appLinkError: boolean;
}


const AppLinkInput: React.FC<Props> = ({ appLink, setAppLink, appLinkError }) => {

    const onInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;
        setAppLink(value);
    }, [])
    
    return (
        <div className='flex items-center mb-space-bottom-lg'>
            <h1 className='text-h4 font-medium shrink-0 min-w-[90px] w-1/5'>앱 딥링크<span className='text-position-short'>*</span></h1>
            <div className='w-full'>
                <div className='w-full'>
                    <Input
                        type='text'
                        placeholder={ '앱 딥링크를 입력하세요.' }
                        className={`block h-9 w-full ${ appLinkError ? 'border-position-short' : '' }`}
                        onInput={ onInput }
                        value={ appLink }
                    />
                </div>
            </div>
        </div>
    )
}

export default React.memo(AppLinkInput);
