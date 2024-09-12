import React from 'react'
import { Outlet, useMatch, useNavigate, useParams } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import NoticeDetailAttachFile from 'components/notice/detail/Attach-file';
import DetailDataLabel from 'components/common/parts/Detail-data-label';
import Button from 'components/common/button/Button';
import { GET_QNA_ITEM } from 'constants/react-query-keys';
import { useFetchQna } from 'hooks/qna/useFetchQna';
import { useCommonGetText } from 'hooks/_app/useGetText';
import { useGetText } from 'hooks/qna/useGetText';
import Answer from 'components/qna/defail/Answer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/_types';
import { toggleModal } from 'store/modal/slice';
import { setAlert } from 'store/popup/alert/slice';




const QnaDetail = () => {
    const navigator = useNavigate();
    const { id } = useParams();
    const match = useMatch('/qna/:id/regist');

    const { createAtTextFull } = useCommonGetText();
    const { deviceInfo } = useGetText();
    const { getQnaItem } = useFetchQna();
    const dispatch = useDispatch<AppDispatch>();


    const { data: item, status } = useQuery({
        queryKey: [GET_QNA_ITEM, id], 
        queryFn: () => getQnaItem(id),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    const onClickList = React.useCallback(() => {
        navigator('/qna');
    }, [])

    const onClickAnswer = React.useCallback(() => {
        // if (!id) return;

        navigator(`regist`);
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
                    onClickHandlerName: 'qnaItemDelete',
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
            <DetailDataLabel<string> label='구분' data={ item.memberDivision } />
            <DetailDataLabel<string> label='이메일' data={ item.email } />
            <DetailDataLabel<string> label='등록일' data={ createAtTextFull(item.createdAt) } />
            <DetailDataLabel<string | null> label='디바이스 정보' data={ deviceInfo({
                platformType: item.platformType,
                appVersion: item.appVersion,
                deviceModel: item.deviceModel,
                osVersionType: item.osVersionType,
                browserType: item.browserType,
            }) } />
            <NoticeDetailAttachFile data={ item.siteInquiryFile } />
            <DetailDataLabel<string> label='문의 내용' data={ item.content } />
            {
                match === null &&
                <React.Fragment>
                    <Answer answerData={ item.answerInquiryItem } />
                    <div className="buttons relative flex items-center justify-center mt-space-top-lg">
                        <div className='flex items-center'>
                            <Button
                                label='목록으로'
                                buttonType='cancle'
                                className='whitespace-nowrap px-primary'
                                onClick={ onClickList }
                            />
                            {
                                !item.answerCk &&
                                <Button
                                    label='답변 등록하기'
                                    className='ml-space-top-lg whitespace-nowrap px-primary'
                                    onClick={ onClickAnswer }
                                />
                            }
                        </div>
                        {
                            !item.answerCk &&
                            <Button
                                label='삭제'
                                buttonType='cancle'
                                className='absolute right-0 !w-auto border-none px-3 text-position-short'
                                onClick={ onClickDelete }
                            />
                        }
                    </div>
                </React.Fragment>
            }
            <Outlet
                context={{
                    email: item.email,
                    member: item.memberDivision,
                    userContent: item.content,
                    userAddDateTime: item.createdAt,
                }}
            />
        </div>
    )
}

export default QnaDetail;
