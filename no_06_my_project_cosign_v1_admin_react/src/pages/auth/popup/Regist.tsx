import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { GET_POPUP_LIST } from 'constants/react-query-keys';
import Button from 'components/common/button/Button';
import { useCommonGetText } from 'hooks/_app/useGetText';
import { useGetText } from 'hooks/member/useGetText';
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

const Regist = () => {

    const navigator = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { getPopupList, updatePopup } = useFetchPopup();

    

    const {
        bannerList, setBannerList,
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
    
    

    const onClickList = React.useCallback(() => {
        navigator('/popup');
    }, [])

    
    React.useEffect(() => {
        if (!popupList || !popupList.length) return;

        setBannerList(popupList);
        setPopupNum(popupList.length + 1);

    }, [popupList]);



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
            <RegistPopupAttachImage
                accept='.jpg, .jpeg, .png, .gif'
                checkAccept={ ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'] }
                attachFile={ attachFile }
                setAttachFile={ setAttachFile }
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
                        label='등록하기'
                        className='whitespace-nowrap px-primary'
                        onClick={ () => onClickSubmit('regist') }
                    />
                </div>
            </div>
        </div>
    )
}

export default Regist
