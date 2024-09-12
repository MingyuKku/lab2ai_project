import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useFetchFaq } from 'hooks/faq/useFetchFaq';
import { GET_FAQ_ITEM } from 'constants/react-query-keys';
import FaqDetailContent from 'components/faq/detail/Content';
import Button from 'components/common/button/Button';
import DetailDataLabel from 'components/common/parts/Detail-data-label';
import { FaqCategoryTypeLabel } from 'hooks/faq/_types';
import { useGetText } from 'hooks/faq/useGetText';


const FaqDetail = () => {
    const navigator = useNavigate();
    const { id } = useParams();

    const { getFaqItem } = useFetchFaq();
    const { categoryText } = useGetText();


    const { data: item, status } = useQuery({
        queryKey: [GET_FAQ_ITEM, id], 
        queryFn: () => getFaqItem(id),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    const onClickList = React.useCallback(() => {
        navigator('/faq');
    }, [])

    const onClickUpdate = React.useCallback(() => {
        if (!id) return;

        navigator(`/faq/${id}/update`);
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
            <DetailDataLabel<FaqCategoryTypeLabel> label='카테고리' data={ categoryText(item.categoryType) } />
            <DetailDataLabel<string> data={ item.title } label='제목' />
            <FaqDetailContent data={ item.content } />
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
