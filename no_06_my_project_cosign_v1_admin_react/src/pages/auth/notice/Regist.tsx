import React from 'react'
import { useNavigate } from 'react-router-dom';
import RegistTitle from 'components/notice/regist/Title';
import RegistContent from 'components/notice/regist/Content';
import RegistAttachFile from 'components/notice/regist/Attach-file';
import { useSubmit } from 'hooks/notice/useSubmit';
import { useFetchNotice } from 'hooks/notice/useFetchNotice';
import Button from 'components/common/button/Button';


const NoticeRegist = () => {

    const ATTACH_FILE_MAX_COUNT = 15;
    const ATTACH_FILE_MAX_SIZE = 10; // 10MB
    const ATTACH_FILE_SIZE_UNIT = 1024 * 1024 // MB
    const ATTACH_FILE_SIZE_UNIT_TEXT = 'MB';

    const navigator = useNavigate();
    const { registNotice } = useFetchNotice();

    const {
        setTitle, titleError,
        setContent, setFiles, attachFiles,
        setAttachFiles, attachFileError, setAttachFileError,
        onClickSubmit
    } = useSubmit(registNotice, '/notice');

    const onClickList = React.useCallback(() => {
        navigator('/notice');
    }, [])
    
    return (
        <div>
            <RegistTitle setTitle={ setTitle } titleError={ titleError } />
            <RegistContent setContent={ setContent } setFiles={ setFiles } />
            <RegistAttachFile
                accept='.jpg, .jpeg, .png'
                checkAccept={ ['image/jpeg', 'image/png', 'image/jpg'] }
                attachFiles={ attachFiles }
                setAttachFiles={ setAttachFiles }
                attachFileError={ attachFileError }
                setAttachFileError={ setAttachFileError }
                fileCount={ ATTACH_FILE_MAX_COUNT }
                fileSize={ ATTACH_FILE_MAX_SIZE }
                fileUnit={ ATTACH_FILE_SIZE_UNIT }
                fileUnitText={ ATTACH_FILE_SIZE_UNIT_TEXT }
            />
            <div className="buttons flex items-center justify-center">
                <div className='flex items-center'>
                    <Button
                        label='목록으로'
                        buttonType='cancle'
                        className='whitespace-nowrap px-primary mr-space-top-lg'
                        onClick={ onClickList }
                    />
                    <Button
                        label='등록하기'
                        className='whitespace-nowrap px-primary'
                        onClick={ () => onClickSubmit('regist') }
                    />
                </div>
            </div>
        </div>
    )
}

export default React.memo(NoticeRegist);
