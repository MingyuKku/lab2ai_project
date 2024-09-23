import React from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { alertState } from "@/lib/recoil/atoms/alert-state";

export const useClickButtons = () => {

    const setAlertState = useSetRecoilState(alertState);
    const resetAlertState = useResetRecoilState(alertState);
    
    
    const onClickDelete = React.useCallback(() => {
        setAlertState({
            flag: true,
            title: '문서 삭제',
            description: '문서를 영구 삭제 하시겠습니까?',
            buttons: {
                left: {
                    type: 'CANCLE',
                    label: '취소',
                    onClick: () => {
                        resetAlertState();
                    }
                },
                right: {
                    type: 'OK',
                    label: '확인',
                    onClick: () => {
                        resetAlertState();
                    }
                }
            }
        })
    }, [])

    
    return {
        onClickDelete
    }
}