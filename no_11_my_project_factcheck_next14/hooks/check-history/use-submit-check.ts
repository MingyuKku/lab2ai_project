import { RadioList } from "@/components/form/_types";
import { alertState } from "@/lib/recoil/atoms/alert-state";
import { GET_CHECK_HISTORY_LIST } from "@/lib/swr/keys";
import { DocType } from "@/services/check-history/_types";
import { useFetchRequestCheckParser } from "@/services/check-history/use-fetch-request-check-parser";
import React from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { useSWRConfig } from "swr";

export const useSubmitCheck = (setSidePopupFlag: React.Dispatch<React.SetStateAction<boolean>>) => {

    const ITEMS: RadioList<DocType>[] = [
        {
            label: '텍스트',
            value: 'text',
        },
        {
            label: '인터넷 문서',
            value: 'url',
        },
        {
            label: '문서 파일',
            value: 'file',
        },
    ]
    
    const { mutate } = useSWRConfig();
    const setAlertState = useSetRecoilState(alertState);
    const resetAlertState = useResetRecoilState(alertState);
    const { requestTextParser, requestFileParser, requestUrlParser } = useFetchRequestCheckParser();
    const [ checkedItem, updateItem ] = React.useState<DocType>(ITEMS[0].value);
    const [ submitFlag, setSubmitFlag ] = React.useState(false);

    const MIN_TEXT_LENGTH = 20;
    
    const onSubmitRequestCheck = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (submitFlag) return;

        setSubmitFlag(true);
        const formData = new FormData(e.currentTarget);
        const inputValue = formData.get(checkedItem) as string | File;


        if (checkedItem === 'text') {
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
            
            const { isSuccess } = await requestTextParser(inputValue);
            if (isSuccess === 'success') {
                setSidePopupFlag(false);
                mutate(GET_CHECK_HISTORY_LIST);
            }
        }

        if (checkedItem === 'file') {
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
            const { isSuccess } = await requestFileParser(formData);
            if (isSuccess === 'success') {
                setSidePopupFlag(false);
                mutate(GET_CHECK_HISTORY_LIST);
            }
        }

        if (checkedItem === 'url') {
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

            const { isSuccess } = await requestUrlParser(inputValue);
            if (isSuccess === 'success') {
                setSidePopupFlag(false);
                mutate(GET_CHECK_HISTORY_LIST);
            }
        }

        setSubmitFlag(false);
        
    }, [submitFlag, checkedItem])

    
    
    return {
        ITEMS,
        checkedItem,
        updateItem,
        onSubmitRequestCheck,
    }
}