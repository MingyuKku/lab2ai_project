import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { formatDate } from 'utils';
import { toggleModal } from 'store/modal/slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/_types';


const ModalImage = React.lazy(() => import('components/common/modal/Image'));


interface Props {
    accept: string;
    checkAccept: string[];
    attachFile: File | null;
    setAttachFile: React.Dispatch<React.SetStateAction<File | null>>
    initFileSrc?: string;
    // setAttachFiles: React.Dispatch<React.SetStateAction<FileInstance[]>>;
    // attachFileError: boolean;
    // setAttachFileError: React.Dispatch<React.SetStateAction<boolean>>;
    // setDeleteFiles?: React.Dispatch<React.SetStateAction<string[]>>;
    // fileCount: number;
    // fileSize: number;
    // fileUnit: number;
    // fileUnitText: string;
}

const AttachImage: React.FC<Props> = ({ accept, checkAccept, attachFile, setAttachFile, initFileSrc, }) => {
    
    const dispatch = useDispatch<AppDispatch>();
    const [ fileReaderUrl, setFileReaderUrl ] = React.useState<string | null>(initFileSrc ?? null);
    const [ openImageModal, setToggleImageModal ] = React.useState(false);

    const onChangeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = e.target.files;

        if (!files) return;

        for (let i = 0; i < files.length; i++) {
            if (!checkAccept?.includes(files[i].type)) return;
        }
        
        // 이미지 프리뷰 스크립트
        const reader = new FileReader();
        reader.readAsDataURL(files![0]);
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.result) {
                setFileReaderUrl(e.target.result as string);
            }
        }


        // 파일 이름 커스텀
        const newFile:File = new File(
            [files![0]], // 기존 파일
            `${'팝업배너'}${formatDate(new Date(), 'yyyyMMdd')}.${files![0].type.split('/')[1]}`, // 파일 이름
            {type: files![0].type} // 파일 타입
        )
        
        setAttachFile(newFile);
    }


    const onClickPreView = (e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(toggleModal(true));
        setToggleImageModal(true);
    }

    return (
        <React.Fragment>
            {
                (openImageModal && fileReaderUrl) &&
                <React.Suspense><ModalImage src={ fileReaderUrl } setToggleModal={ setToggleImageModal } /></React.Suspense>
            }
            <div className='flex items-center mb-space-bottom-lg'>
                <h1 className='text-h4 font-medium shrink-0 min-w-[90px] w-1/5'>이미지<span className='text-position-short'>*</span></h1>
                <div className='overflow-hidden'>
                    <div className='flex items-center'>
                        <label htmlFor="attach-file" className='block w-24'>
                            <input
                                id='attach-file'
                                type="file"
                                accept={ accept }
                                onChange={ onChangeFileUpload }
                                hidden
                            />
                            <div className='cursor-pointer whitespace-nowrap flex items-center justify-center text-body-2r text-font-dark-02 w-24 h-10 border border-border-gray-01 rounded-md'>찾아보기</div>
                        </label>
                        <div
                            onClick={ onClickPreView }
                            className={`
                                cursor-pointer whitespace-nowrap flex items-center justify-center text-font-dark-02 border-border-gray-01 text-body-2r w-24 h-10 border rounded-md ml-3
                                ${ fileReaderUrl ? 'opacity-100' : 'opacity-50 pointer-events-none' }
                            `}
                        >미리보기</div>
                    </div>
                    
                    {
                        (attachFile || initFileSrc) &&
                        <div className='w-full relative mt-1.5'>
                            <CloseOutlined
                                // onClick={ onClickDeleteFile(idx) }
                                className='absolute right-2 y-center text-font-dark-03 cursor-pointer peer hover:text-font-black'
                            />
                            <div className='w-full text-font-dark-03 text-body-3r p-2 pr-7 border border-border-gray-02 rounded peer-hover:border-border-dark-01'>
                                <p className='truncate'>{ attachFile?.name ?? initFileSrc }</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default AttachImage;
