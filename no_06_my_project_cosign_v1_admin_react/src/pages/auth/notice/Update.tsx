import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import RegistTitle from 'components/notice/regist/Title';
import RegistContent from 'components/notice/regist/Content';
import RegistAttachFile from 'components/notice/regist/Attach-file';
import { useSubmit } from 'hooks/notice/useSubmit';
import { useFetchNotice } from 'hooks/notice/useFetchNotice';
import Button from 'components/common/button/Button';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { GET_NOTICE_ITEM } from 'constants/react-query-keys';
import { AppDispatch } from 'store/_types';
import { useDispatch } from 'react-redux';
import { toggleModal } from 'store/modal/slice';
import { setAlert } from 'store/popup/alert/slice';


const NoticeUpdate = () => {

    const ATTACH_FILE_MAX_COUNT = 15;
    const ATTACH_FILE_MAX_SIZE = 10; // 10MB
    const ATTACH_FILE_SIZE_UNIT = 1024 * 1024 // MB
    const ATTACH_FILE_SIZE_UNIT_TEXT = 'MB';

    const navigator = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { updateNotice, getNoticeItem } = useFetchNotice();

    const {
        title, setTitle, titleError,
        content, setContent, setFiles,
        attachFiles, setAttachFiles, attachFileError, setAttachFileError,
        setDeleteFiles,
        onClickSubmit
    } = useSubmit(updateNotice, '/notice');


    const { data: item, status } = useQuery({
        queryKey: [GET_NOTICE_ITEM, id], 
        queryFn: () => getNoticeItem(id),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });


    React.useEffect(() => {
        if (!item) return;

        setTitle(item.title);
        setContent(item.content);
        setAttachFiles(item.noticeFileData);
    }, [item]);


    const onClickList = React.useCallback(() => {
        navigator('/notice');
    }, [])

    const onClickDelete = React.useCallback(() => {
        dispatch(toggleModal(true));
        dispatch(setAlert({
            description: [
                `삭제 후 복구가 불가능합니다.`,
                `삭제하시겠습니까?`
            ],
            buttons: {
                left: {
                    type: 'CANCLE',
                    label: '취소하기',
                    onClickHandlerName: 'commonCancle',
                },
                right: {
                    type: 'OK',
                    label: '삭제하기',
                    onClickHandlerName: 'noticeItemDelete',
                }
            }
        }))
    }, [])
    
    

    if (status === 'pending') {
        return <p>데이터 로딩중...</p>
    }

    if (status === 'error') {
        return <p>에러 발생!</p>
    }

    if (!item) {
        return <p>데이터가 없어요!</p>
    }

    return (
        <div>
            <RegistTitle title={ title } setTitle={ setTitle } titleError={ titleError } />
            <RegistContent initData={ content ?? undefined } setContent={ setContent } setFiles={ setFiles } />
            <RegistAttachFile
                accept='.jpg, .jpeg, .png'
                checkAccept={ ['image/jpeg', 'image/png', 'image/jpg'] }
                attachFiles={ attachFiles }
                setAttachFiles={ setAttachFiles }
                attachFileError={ attachFileError }
                setAttachFileError={ setAttachFileError }
                setDeleteFiles={ setDeleteFiles }
                fileCount={ ATTACH_FILE_MAX_COUNT }
                fileSize={ ATTACH_FILE_MAX_SIZE }
                fileUnit={ ATTACH_FILE_SIZE_UNIT }
                fileUnitText={ ATTACH_FILE_SIZE_UNIT_TEXT }
            />
            <div className="buttons relative flex items-center justify-center">
                <div className='flex items-center'>
                    <Button
                        label='목록으로'
                        buttonType='cancle'
                        className='whitespace-nowrap px-primary mr-space-top-lg'
                        onClick={ onClickList }
                    />
                    <Button
                        label='수정하기'
                        className='whitespace-nowrap px-primary'
                        onClick={ () => onClickSubmit('update') }
                    />
                </div>
                <Button
                    label='삭제'
                    buttonType='cancle'
                    className='absolute right-0 !w-auto border-none px-3 text-position-short'
                    onClick={ onClickDelete }
                />
            </div>
        </div>
    )
}

export default React.memo(NoticeUpdate);
