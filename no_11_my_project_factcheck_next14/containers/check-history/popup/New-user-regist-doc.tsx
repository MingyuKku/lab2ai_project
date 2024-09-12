import React from 'react';
import FormInputMd from '@/components/form/Input-md';


interface Props {
    label: string;
    inputName: string;
    inputClassName?: string;
}
const NewUserRegistDoc: React.FC<Props> = ({ label, inputName, inputClassName }) => {

    return (
        <div className='flex items-center h-[72px]'>
            <div
                className={`
                    label min-w-[132px] h-full bg-achromatic-02 px-4 border border-achromatic-03
                `}
            >
                <div className='title-sm text-achromatic-white leading-[72px]'>{ label }</div>
            </div>
            <div
                className={`
                    px-4 w-full h-full border border-achromatic-03
                `}
            >
                <div className='h-full flex items-center'>
                    <FormInputMd
                        type='text'
                        name={ inputName }
                        placeholder='분석할 인터넷 사이트 문서의 URL을 입력해 주세요.'
                        className={ inputClassName }
                    />
                </div>
            </div>
        </div>
    )
}

export default NewUserRegistDoc;
