import React from 'react';
import dynamic from 'next/dynamic';
import FormInputMd from '@/components/form/Input-md';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { alertState } from '@/lib/recoil/atoms/alert-state';


const LazyCommonLoader = dynamic(() => import('@/components/fallback/Loader'));

interface Props {
    label: string;
    inputName: string;
    inputClassName?: string;
}

const NewUserRegistDoc: React.FC<Props> = ({ label, inputName, inputClassName }) => {

    const setAlertState = useSetRecoilState(alertState);
    const resetAlertState = useResetRecoilState(alertState);
    const [ isLoadFile, setIsLoadFile ] = React.useState(false);
    const [ file, setFile ] = React.useState<File | null>(null);
    const LIMIT_FILE_SIZE = 20;

    const onUploadFile = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];

        console.log('야', file)
        const fileSizeMb = file.size / (1024 * 1024);
        if (fileSizeMb > LIMIT_FILE_SIZE) {
            setAlertState({
                flag: true,
                title: null,
                description: '20M 이하의 문서만 등록 가능합니다.',
                buttons: {
                    center: {
                        type: 'OK',
                        label: '확인',
                        onClick: () => {
                            resetAlertState();
                        }
                    }
                }
            })
            return;
        };

        const reader = new FileReader();

        reader.onloadstart = (e: ProgressEvent<FileReader>) => {
            setIsLoadFile(true);
        };
        reader.onload = (e: ProgressEvent<FileReader>) => {
        }
        reader.onloadend = (e: ProgressEvent<FileReader>) => {
            setIsLoadFile(false);
        }

        reader.readAsDataURL(file);
        setFile(file);
    }, [])


    return (
        <div className='flex'>
            {
                isLoadFile &&
                <div className='absolute top-0 left-0 w-full h-full bg-achromatic-white/80'>
                    <LazyCommonLoader className='absolute x-center top-60' />
                    <span className='title-sm absolute x-center top-72'>파일 업로드 중...</span>
                </div>
            }
            <div
                className={`
                    label flex items-center min-w-[132px] bg-achromatic-02 px-4 border border-achromatic-03
                `}
            >
                <div className='title-sm text-achromatic-white leading-[72px]'>{ label }</div>
            </div>
            <div
                className={`
                    py-5 px-4 w-full h-full border border-achromatic-03 
                `}
            >
                <div className='h-full'>
                    <div className='flex items-center'>
                        <FormInputMd
                            type='text'
                            placeholder=''
                            className={ inputClassName }
                            readOnly
                            value={ file?.name ?? '' }
                        />
                        <label
                            className='flex items-center justify-center ml-4 w-[100px] h-11 bg-achromatic-02 rounded-lg title-sm text-achromatic-white cursor-pointer'
                        >
                            <input
                                type="file"
                                name={ inputName }
                                onChange={ onUploadFile }
                                hidden
                            />
                            파일 찾기
                        </label>
                    </div>
                    <p className='body-sm mt-1.5 text-primary-red'>* 20M 이하의 문서만 등록 가능합니다.</p>
                </div>
            </div>
        </div>
    )
}

export default NewUserRegistDoc;
