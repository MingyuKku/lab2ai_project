import { InfoCircleOutlined } from '@ant-design/icons';
import Input from 'components/common/input/Input'
import React from 'react'


interface Props {
    appVersion?: string;
    setAppVersion: React.Dispatch<React.SetStateAction<string>>;    
    appVersionError: boolean;
    validateInfo?: string;
}


const AppVersion: React.FC<Props> = ({ appVersion, setAppVersion, appVersionError, validateInfo }) => {

    const onInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setAppVersion(e.target.value);
    }, [])
    
    return (
        <div className='flex items-center mb-space-bottom-lg'>
            <h1 className='text-h4 font-medium shrink-0 min-w-[90px] w-1/5'>APP 버전<span className='text-position-short'>*</span></h1>
            <div className='w-full'>
                <Input
                    type='text'
                    placeholder={ 'ex) 1.1.1' }
                    className={`block h-9 w-full`}
                    onInput={ onInput }
                    value={ appVersion }
                />
                {
                    validateInfo &&
                    <div className='text-font-dark-03 text-cap-2m font-normal mt-1.5'><InfoCircleOutlined /><span className='ml-1'>{ validateInfo }</span></div>
                }
                
                {
                    appVersionError &&
                    <div className='text-position-short text-cap-2m font-normal mt-1.5'><InfoCircleOutlined /><span className='ml-1'>APP 버전을 형식에 맞게 입력해 주세요.</span></div>
                }
            </div>
        </div>
    )
}

export default React.memo(AppVersion);
