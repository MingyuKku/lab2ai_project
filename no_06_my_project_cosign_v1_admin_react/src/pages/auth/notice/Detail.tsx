import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import NoticeDetailContent from 'components/notice/detail/Content';
import NoticeDetailAttachFile from 'components/notice/detail/Attach-file';
import Button from 'components/common/button/Button';
import { useFetchNotice } from 'hooks/notice/useFetchNotice';
import { GET_NOTICE_ITEM } from 'constants/react-query-keys';
import DetailDataLabel from 'components/common/parts/Detail-data-label';




const FaqDetail = () => {
    const navigator = useNavigate();
    const { id } = useParams();

    const { getNoticeItem } = useFetchNotice();


    const { data: item, status } = useQuery({
        queryKey: [GET_NOTICE_ITEM, id], 
        queryFn: () => getNoticeItem(id),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    const onClickList = React.useCallback(() => {
        navigator('/notice');
    }, [])

    const onClickUpdate = React.useCallback(() => {
        if (!id) return;

        navigator(`/notice/${id}/update`);
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
            <DetailDataLabel<string> data={ item.title } label='제목' />
            <NoticeDetailContent data={ item.content } />
            <NoticeDetailAttachFile data={ item.noticeFileData } />
            <div className="buttons relative flex items-center justify-center mt-space-top-lg">
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
                        onClick={ onClickUpdate }
                    />
                </div>
            </div>
        </div>
    )
}

export default FaqDetail;
