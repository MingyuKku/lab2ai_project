import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReturnSuccess } from "_api/_types";
import { useValidate } from "hooks/_app/useValidate";
import { RadioList } from "components/common/input/_types";
import { PlatformType, UpdateType } from "./_types";
import { formatDate } from "utils";

export const useSubmit = (submitFetch: (params: any) => Promise<ReturnSuccess>, successAfterUrl: string) => {
    
    const navigator = useNavigate();
    const { id } = useParams();
    const { checkValidateTextBlank } = useValidate();
    
    const [ submitFlag, setSubmitFlag ] = React.useState(false);


    const platformValues: RadioList<PlatformType>[] = [
        {
            id: 'AOS',
            label: 'AOS',
            value: 'AOS',
        },
        {
            id: 'IOS',
            label: 'iOS',
            value: 'IOS',
        }
    ]
    
    const [ checkedPlatform, setPlatform ] = React.useState<PlatformType>(platformValues[0].value);


    const updateTypeValues: RadioList<UpdateType>[] = [
        {
            id: 'NORMAL',
            label: '일반',
            value: 'NORMAL',
        },
        {
            id: 'OFFER_UPDATE',
            label: '권장',
            value: 'OFFER_UPDATE',
        },
        {
            id: 'ESSENTIAL_UPDATE',
            label: '강제',
            value: 'ESSENTIAL_UPDATE',
        }
    ]
    
    const [ checkedUpdateType, setUpdateType ] = React.useState<UpdateType>(updateTypeValues[0].value);


    const [ appVersion, setAppVersion ] = React.useState('');
    const [ appVersionError, setAppVersionError ] = React.useState(false);
    const [ memo, setMemo ] = React.useState('');
    const [ releaseDate, setReleaseDate ] = React.useState<Date>(new Date());


    /**
     * 버전 형식이 맞는지 체크
     * @returns 통과시 true 반환
     */
    const checkVersionValidate = () => {
        const regExp = /^\d{1,}[.]\d{1,}[.]\d{1,}$/;
        if (!regExp.test(appVersion)) {
            setAppVersionError(true);
            return false;
        };
        return true;
    }


    const onClickSubmit = React.useCallback(async (type: 'regist' | 'update') => {
        if (submitFlag) return;
        setSubmitFlag(true);

        if (!checkVersionValidate()) return setSubmitFlag(false);
        // if (!checkValidateTextBlank(webLink, setWebLinkError)) return setSubmitFlag(false);
        // if (!checkValidateTextBlank(appLink, setAppLinkError)) return setSubmitFlag(false);

        const formData: FormData = new FormData();

        
        formData.append('platformType', checkedPlatform);
        formData.append('version', appVersion);
        formData.append('updateStateType', checkedUpdateType);
        formData.append('memo', memo);
        formData.append('createdAt', formatDate(Date.toUtcText(releaseDate), 'yyyy-MM-ddTHH:mm')); // 릴리즈 날짜는 UTC시간으로 변환

        if (type === 'regist') {
        }

        if (type === 'update') {
            if (id) formData.append('vcId', id);
        }
  
        
        const { isSuccess } = await submitFetch(formData);
        if (isSuccess === 'success') {
            navigator(successAfterUrl);
        }

        setSubmitFlag(false);

    }, [id, submitFlag, appVersion, checkedPlatform, checkedUpdateType, memo, releaseDate]);


    return {
        appVersion,
        setAppVersion,
        appVersionError,
        setAppVersionError,
        platformValues,
        checkedPlatform,
        setPlatform,
        updateTypeValues,
        checkedUpdateType,
        setUpdateType,
        memo,
        setMemo,
        releaseDate,
        setReleaseDate,
        onClickSubmit,
    }
}