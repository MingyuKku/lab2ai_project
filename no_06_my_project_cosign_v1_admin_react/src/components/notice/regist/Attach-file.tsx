import React from 'react';
import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { FileInstance } from 'hooks/notice/_types';


interface Props {
    accept: string;
    checkAccept: string[];
    attachFiles: FileInstance[];
    setAttachFiles: React.Dispatch<React.SetStateAction<FileInstance[]>>;
    attachFileError: boolean;
    setAttachFileError: React.Dispatch<React.SetStateAction<boolean>>;
    setDeleteFiles?: React.Dispatch<React.SetStateAction<string[]>>;
    fileCount: number;
    fileSize: number;
    fileUnit: number;
    fileUnitText: string;
}

const AttachFile: React.FC<Props> = ({ accept, checkAccept,  attachFiles, setAttachFiles, attachFileError, setAttachFileError, setDeleteFiles, fileCount, fileSize, fileUnit, fileUnitText }) => {

    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []) as FileInstance[];
        const fileArr:FileInstance[] = [];
        for (let i = 0; i < files.length; i++) {
            if (!checkAccept?.includes(files[i].type)) return;

            files[i].isUpdate = true;
            fileArr.push(files[i]);
        }

        let cloneFile = [...attachFiles];
        cloneFile = cloneFile.concat(fileArr);
        setAttachFiles(cloneFile);
    }


    React.useEffect(() => {
        // 파일 유효성 검사 체크
        const totalSize = attachFiles.length > 0 ? attachFiles.map(file => file.size).reduce((a,b) => a+b) : 0;
        if (
            totalSize / fileUnit > fileSize ||
            attachFiles.length > fileCount
        ) {
            setAttachFileError(true);
        } else {
            setAttachFileError(false);
        }

    }, [attachFiles])


    const onClickDeleteFile = React.useCallback((idx: number) => () => {
        const cloneFiles = [...attachFiles];

        const deleted = cloneFiles.splice(idx, 1);

        if (setDeleteFiles) {
            setDeleteFiles(prev => [
                ...prev,
                deleted[0].fileLink
            ])
        }
            
        setAttachFiles(cloneFiles);
    }, [attachFiles])
    

    return (
        <div className='flex items-center mb-space-bottom-lg'>
            <h1 className='text-h4 font-medium shrink-0 min-w-[90px] w-1/5'>첨부 파일</h1>
            <div className='w-full'>
                <label htmlFor="attach-file" className='block w-24'>
                    <input
                        id='attach-file'
                        type="file"
                        multiple
                        accept={ accept }
                        onChange={ onChangeFile }
                        hidden
                    />
                    <div className='cursor-pointer flex items-center justify-center text-body-2r text-font-dark-02 px-3 h-10 border border-border-gray-01 rounded-md'>찾아보기</div>
                </label>
                {
                    attachFiles.map((file, idx) => (
                        <div key={ idx } className='w-full relative mt-1.5'>
                            <CloseOutlined
                                onClick={ onClickDeleteFile(idx) }
                                className='absolute right-2 y-center text-font-dark-03 cursor-pointer peer hover:text-font-black'
                            />
                            <div className='flex items-center justify-between text-font-dark-03 text-body-3r p-2 border border-border-gray-02 rounded peer-hover:border-border-dark-01'>
                                <p>{ file.name ?? file.fileName }</p>
                                <span className='mr-10'>{ ((file.size ?? file.fileSize) / fileUnit).toFixed(2) }{ fileUnitText }</span>
                            </div>
                        </div>
                        
                    ))
                }
                <div
                    className={`
                        ${ attachFileError ? 'text-position-short' : 'text-font-dark-03' }
                        flex items-start text-cap-2m font-normal mt-3
                    `}
                >
                    <InfoCircleOutlined className='shrink-0' />
                    <div className='ml-1'>
                        <p>최대 { fileCount }장 / { fileSize }{ fileUnitText } 이내로 { accept } 파일을 등록할 수 있습니다.</p>
                        <p className='mt-1.5'>파일명은 영문자, 숫자만 사용 가능합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AttachFile;