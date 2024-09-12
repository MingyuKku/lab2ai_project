import React from "react";
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { alertState } from '@/lib/recoil/atoms/alert-state';


export const useClickButtons = () => {

    const setAlertState = useSetRecoilState(alertState);
    const resetAlertState = useResetRecoilState(alertState);
    
    const onClickDelete = React.useCallback(() => {
        setAlertState({
            flag: true,
            title: '사용자 삭제',
            description: '사용자를 삭제합니다.',
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


    const onClickResetPw = React.useCallback(() => {
        setAlertState({
            flag: true,
            title: '비밀번호 초기화',
            description: '이 사용자의 비밀번호를 초기화합니다.',
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
        onClickDelete,
        onClickResetPw,
    }
}