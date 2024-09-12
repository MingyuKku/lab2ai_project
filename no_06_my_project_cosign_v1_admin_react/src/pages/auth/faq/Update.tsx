import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/_types';
import { setAlert } from 'store/popup/alert/slice';
import RegistCategory from 'components/faq/table/regist/Category';
import RegistTitle from 'components/faq/table/regist/Title';
import RegistContent from 'components/faq/table/regist/Content';
import Button from 'components/common/button/Button';
import { useFetchFaq } from 'hooks/faq/useFetchFaq';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { GET_FAQ_ITEM } from 'constants/react-query-keys';
import { useSubmit } from 'hooks/faq/useSubmit';
import { toggleModal } from 'store/modal/slice';


const FaqUpdate = () => {

    const navigator = useNavigate();
    const { id } = useParams();
    const { getFaqItem, updateFaq } = useFetchFaq();
    const {
        category, setCategory,
        title, setTitle,
        titleError,
        content, setContent,
        setFiles, onClickSubmit
    } = useSubmit(updateFaq, `/faq/${id}`);

    const dispatch = useDispatch<AppDispatch>();


    const { data: item, status } = useQuery({
        queryKey: [GET_FAQ_ITEM, id], 
        queryFn: () => getFaqItem(id),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    
    React.useEffect(() => {
        if (!item) return;

        setCategory(item.categoryType);
        setTitle(item.title);
        setContent(item.content);
    }, [item]);



    const onClickList = React.useCallback(() => {
        navigator('/faq');
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
                    onClickHandlerName: 'faqItemDelete',
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
            <RegistCategory
                selectedItem={ category }
                setCategory={ setCategory }
            />
            <RegistTitle
                title={ title }
                setTitle={ setTitle }
                titleError={ titleError }
            />
            <RegistContent
                initData={ content }
                setContent={ setContent }
                setFiles={ setFiles }
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

export default FaqUpdate
