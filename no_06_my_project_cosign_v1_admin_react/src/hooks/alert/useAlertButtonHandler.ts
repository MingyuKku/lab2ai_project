import { useFetchFaq } from "hooks/faq/useFetchFaq";
import { useFetchNotice } from "hooks/notice/useFetchNotice";
import { useFetchPopup } from "hooks/popup/useFetchPopup";
import { useFetchQna } from "hooks/qna/useFetchQna";
import { useFetchVersion } from "hooks/version/useFetchVersion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "store/_types";
import { toggleModal } from "store/modal/slice";
import { setAlert } from "store/popup/alert/slice";



export const useAlertButtonHandler = () => {

    const { id } = useParams();

    const navigator = useNavigate();
    const { buttons } = useSelector((state: RootState) => state.alertReducer);
    const dispatch = useDispatch<AppDispatch>();
    const { deleteFaq } = useFetchFaq();
    const { deleteNotice } = useFetchNotice();
    const { deleteQna } = useFetchQna();
    const { deletePopup } = useFetchPopup();
    const { deleteVersion } = useFetchVersion();
    
    

    const commonCancle = React.useCallback(() => {
        dispatch(toggleModal(false));
        dispatch(setAlert(null));
    }, [])
    

    const faqItemDelete = React.useCallback(async () => {
        const { isSuccess } = await deleteFaq(id);
        if (isSuccess === 'success') {
            commonCancle();
            navigator('/faq');
        }
    }, [buttons])


    const noticeItemDelete = React.useCallback(async () => {
        const { isSuccess } = await deleteNotice(id);
        if (isSuccess === 'success') {
            commonCancle();
            navigator('/notice');
        }
    }, [buttons])


    const popupItemDelete = React.useCallback(async () => {
        const { isSuccess } = await deletePopup(id);
        if (isSuccess === 'success') {
            commonCancle();
            navigator('/popup');
        }
    }, [buttons])

    
    const qnaItemDelete = React.useCallback(async () => {
        const { isSuccess } = await deleteQna(id);
        if (isSuccess === 'success') {
            commonCancle();
            navigator('/qna');
        }
    }, [buttons])


    const versionItemDelete = React.useCallback(async () => {
        const { isSuccess } = await deleteVersion(id);
        if (isSuccess === 'success') {
            commonCancle();
            navigator('/version');
        }
    }, [buttons])


    return {
        commonCancle,
        faqItemDelete,
        noticeItemDelete,
        qnaItemDelete,
        popupItemDelete,
        versionItemDelete,
    }
}

