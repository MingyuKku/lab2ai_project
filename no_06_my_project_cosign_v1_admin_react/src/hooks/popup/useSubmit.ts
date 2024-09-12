import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReturnSuccess } from "_api/_types";
import { useValidate } from "hooks/_app/useValidate";
import { PopupBannerRes } from "./_types";

export const useSubmit = (submitFetch: (params: any) => Promise<ReturnSuccess>, successAfterUrl: string) => {
    
    const navigator = useNavigate();
    const { id } = useParams();
    const { checkValidateTextBlank } = useValidate();
    
    const [ submitFlag, setSubmitFlag ] = React.useState(false);

    const [ bannerList, setBannerList ] = React.useState<PopupBannerRes[] | null>(null);
    const [ popupNum, setPopupNum ] = React.useState(0);
    const [ numError, setNumError ] = React.useState(false);

    const [ webLink, setWebLink ] = React.useState('');
    const [ webLinkError, setWebLinkError ] = React.useState(false);

    const [ webLinkBlankFlag, setWebLinkBlankFlag ] = React.useState(true);

    const [ appLink, setAppLink ] = React.useState('');
    const [ appLinkError, setAppLinkError ] = React.useState(false);

    const [ attachFile, setAttachFile ] = React.useState<File | null>(null);


    /**
     * 배너 id가 중복되어있는지 체크하는 함수
     * @returns 통과시 true를 반환
     */
    const checkDuplicateBannerId = () => {
        if (!bannerList) return false;

        for (const banner of bannerList) {
            if (banner.bannerId === popupNum) return false;
        }

        return true;
    }


    const doneLast = () => {
        setNumError(false);
        setWebLinkError(false);
        setAppLinkError(false);
        setSubmitFlag(false)
    }

    const onClickSubmit = React.useCallback(async (type: 'regist' | 'update') => {

        if (submitFlag) return;
        setSubmitFlag(true);

        if (!checkValidateTextBlank(webLink, setWebLinkError)) return setSubmitFlag(false);
        if (!checkValidateTextBlank(appLink, setAppLinkError)) return setSubmitFlag(false);

        const formData: FormData = new FormData();

        formData.append('bannerNumber', String(popupNum));
        formData.append('webLink', webLink);
        formData.append('webLinkNewWindowFlag', String(webLinkBlankFlag));
        formData.append('appDeepLink', appLink);

        if (type === 'regist') {
            if (!checkDuplicateBannerId()) {
                alert('이미 동일한 순번의 컨텐츠가 등록되어 있습니다.');
                setSubmitFlag(false);
                return;
            }

            if (!attachFile) {
                alert('이미지를 첨부해 주세요.');
                setSubmitFlag(false);
                return;
            }
            formData.append('bannerImage', attachFile);
            formData.append('isNewBanner', 'true');
        }

        if (type === 'update') {
            
            formData.append('isNewBanner', 'false');
            if (id) formData.append('bannerId', id);
            if (attachFile) formData.append('bannerImage', attachFile);
        }
  
        
        const { isSuccess } = await submitFetch(formData);
        if (isSuccess === 'success') {
            navigator(successAfterUrl);
        }

        setSubmitFlag(false);

    }, [id, submitFlag, bannerList, popupNum, webLink, appLink, webLinkBlankFlag, attachFile,]);


    return {
        bannerList,
        setBannerList,
        popupNum,
        setPopupNum,
        numError,
        setNumError,
        webLink,
        setWebLink,
        webLinkError,
        setWebLinkError,
        webLinkBlankFlag,
        setWebLinkBlankFlag,
        appLink,
        setAppLink,
        appLinkError,
        setAppLinkError,
        attachFile,
        setAttachFile,
        onClickSubmit,
    }
}