import React from 'react';
import FormTextArea from '@/components/form/Textarea';


interface Props {
    label: string;
    inputName: string;
    inputClassName?: string;
}
const NewUserRegistText: React.FC<Props> = ({ label, inputName, inputClassName }) => {

    return (
        <div className='flex'>
            <div
                className={`
                    label flex items-center min-w-[132px] bg-achromatic-02 px-4 border border-achromatic-03
                `}
            >
                <div className='title-sm text-achromatic-white leading-[72px]'>{ label }</div>
            </div>
            <div
                className={`
                    px-4 py-3 w-full h-full border border-achromatic-03
                `}
            >
                <div className='h-full flex items-center'>
                    <FormTextArea
                        type='text'
                        name={ inputName }
                        placeholder='분석할 문장을 입력해 주세요.'
                        className={ inputClassName }
                    />
                </div>
            </div>
        </div>
    )
}

export default NewUserRegistText;
