import { RadioList } from "@/components/form/_types";
import { alertState } from "@/lib/recoil/atoms/alert-state";
import { GET_CHECK_HISTORY_LIST } from "@/lib/swr/keys";
import { DocType } from "@/services/check-history/_types";
import { useFetchRequestCheckParser } from "@/services/check-history/use-fetch-request-check-parser";
import React from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { useSWRConfig } from "swr";

export const useSubmitCheck = (items: RadioList<DocType>[], setSidePopupFlag: React.Dispatch<React.SetStateAction<boolean>>) => {

    const { mutate } = useSWRConfig();
    const setAlertState = useSetRecoilState(alertState);
    const resetAlertState = useResetRecoilState(alertState);
    
    // const [ checkedItem, updateItem ] = React.useState<DocType>(items[0].value);
    const [ checkedItem, updateItem ] = React.useState<RadioList<DocType>>(items[0]);
    const [ submitFlag, setSubmitFlag ] = React.useState(false);

    const MIN_TEXT_LENGTH = 20;
    
    const onSubmitRequestCheck = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (submitFlag) return;

        setSubmitFlag(true);
        const formData = new FormData(e.currentTarget);
        const inputValue = formData.get(checkedItem.value) as string | File;


        if (checkedItem.value === 'text') {
            if (typeof inputValue !== 'string') return setSubmitFlag(false);
            if (inputValue.length <= MIN_TEXT_LENGTH) {
                setAlertState({
                    flag: true,
                    title: null,
                    description: '20글자 이상으로 입력해야 합니다.',
                    buttons: {
                        center: {
                            type: 'OK',
                            label: '확인',
                            onClick: () => {
                                resetAlertState();
                            }
                        }
                    }
                })
                return setSubmitFlag(false);;
            }
            
            // const { isSuccess } = await requestTextParser(inputValue);
            if (!checkedItem.submitApi) return setSubmitFlag(false);
            const { isSuccess } = await checkedItem.submitApi(inputValue);
            if (isSuccess === 'success') {
                setSidePopupFlag(false);
                mutate(GET_CHECK_HISTORY_LIST);
            }
        }

        if (checkedItem.value === 'file') {
            if (typeof inputValue === 'string') return setSubmitFlag(false);
            if (inputValue.size === 0) {
                setAlertState({
                    flag: true,
                    title: null,
                    description: '파일을 등록해 주세요.',
                    buttons: {
                        center: {
                            type: 'OK',
                            label: '확인',
                            onClick: () => {
                                resetAlertState();
                            }
                        }
                    }
                })
                return setSubmitFlag(false);
            }
            const formData = new FormData();
            formData.append('file', inputValue);
            if (!checkedItem.submitApi) return setSubmitFlag(false);
            // const { isSuccess } = await requestFileParser(formData);
            const { isSuccess } = await checkedItem.submitApi(formData);
            if (isSuccess === 'success') {
                setSidePopupFlag(false);
                mutate(GET_CHECK_HISTORY_LIST);
            }
        }

        if (checkedItem.value === 'url') {
            if (typeof inputValue !== 'string') return setSubmitFlag(false);
            if (!inputValue) {
                setAlertState({
                    flag: true,
                    title: null,
                    description: 'url을 입력하세요.',
                    buttons: {
                        center: {
                            type: 'OK',
                            label: '확인',
                            onClick: () => {
                                resetAlertState();
                            }
                        }
                    }
                })
                return setSubmitFlag(false);
            }

            if (!checkedItem.submitApi) return setSubmitFlag(false);
            // const { isSuccess } = await requestUrlParser(inputValue);
            const { isSuccess } = await checkedItem.submitApi(inputValue);
            if (isSuccess === 'success') {
                setSidePopupFlag(false);
                mutate(GET_CHECK_HISTORY_LIST);
            }
        }

        setSubmitFlag(false);
        
    }, [submitFlag, checkedItem])

    
    
    return {
        checkedItem,
        updateItem,
        onSubmitRequestCheck,
    }
}