import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { GET_POPUP_LIST } from 'constants/react-query-keys';
import Button from 'components/common/button/Button';
import { useSubmit } from 'hooks/popup/useSubmit';
import { useFetchPopup } from 'hooks/popup/useFetchPopup';
import { PopupBannerRes } from 'hooks/popup/_types';
import RegistPopupNumber from 'components/popup/regist/Number-input';
import RegistPopupWebLink from 'components/popup/regist/Web-link-input';
import RegistPopupAppLink from 'components/popup/regist/App-link-input';
import RegistPopupAttachImage from 'components/popup/regist/Attach-image';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/_types';
import { toggleModal } from 'store/modal/slice';
import { setAlert } from 'store/popup/alert/slice';



const Update = () => {

    const navigator = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { getPopupList, updatePopup } = useFetchPopup();

    const [ bannerItem, setBannerItem ] = React.useState<PopupBannerRes | null>(null);

    const {
        popupNum, setPopupNum, numError, setNumError,
        webLink, setWebLink, webLinkError, setWebLinkError,
        webLinkBlankFlag, setWebLinkBlankFlag,
        appLink, setAppLink, appLinkError,
        attachFile, setAttachFile,
        onClickSubmit,
    } = useSubmit(updatePopup, '/popup');


    const { data: popupList, status } = useQuery({
        queryKey: [GET_POPUP_LIST], 
        queryFn: () => getPopupList(),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });


    React.useEffect(() => {
        if (!id || !popupList || !popupList.length) return;

        const item = popupList.find(popup => popup.bannerId === Number(id));
        
        if (!item) return;

        setBannerItem(item);
        setPopupNum(item.bannerNumber);
        setWebLink(item.webLink);
        setWebLinkBlankFlag(item.webLinkNewWindowFlag);
        setAppLink(item.appDeepLink);

    }, [id, popupList])


    const onClickList = React.useCallback(() => {
        navigator('/popup');
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
                    onClickHandlerName: 'popupItemDelete',
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

    if (!popupList) {
        return <p>데이터가 없어요!</p>
    }
    
    return (
        <div>
            <RegistPopupNumber
                popupNum={ popupNum }
                setPopupNum={ setPopupNum }
                inputInfo='*순번은 숫자만 입력해 주세요.'
                numError={ numError }
            />
            <RegistPopupWebLink
                webLink={ webLink }
                setWebLink={ setWebLink }
                webLinkError={ webLinkError }
                webLinkBlankFlag={ webLinkBlankFlag }
                setWebLinkBlankFlag={ setWebLinkBlankFlag }
            />
            <RegistPopupAppLink
                appLink={ appLink }
                setAppLink={ setAppLink }
                appLinkError={ appLinkError }
            />
            {
                bannerItem &&
                <RegistPopupAttachImage
                    accept='.jpg, .jpeg, .png, .gif'
                    checkAccept={ ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'] }
                    attachFile={ attachFile }
                    setAttachFile={ setAttachFile }
                    initFileSrc={ bannerItem.bannerImage }
                />
            }
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

export default Update;
