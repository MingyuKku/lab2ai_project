import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '_redux/store';
import { CallHandlerMessage, CallHandlerMessageMixpanel, HiingBridge } from 'types/global';
import { setMember } from '_redux/member/slice';
import { setRefreshToken } from '_redux/refreshToken/slice';
// import { useLocation, useNavigate } from 'react-router-dom';
import { removeMemberTokenStorage, setMemberTokenStorage } from 'services/token';
import { useQueryClient } from '@tanstack/react-query';

export const useWebviewBridge = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    React.useEffect(() => {

        if (!window.HiingBridge) {
            window.HiingBridge = {} as HiingBridge;
        }
        

        window.HiingBridge.setMemberInfo = function (acc: string, se: number | string, nick_nm1: string, nick_nm2: string, appVer?: string) {
            // messageWebview({
            //     type: 'dialog',
            //     param: {
            //         'title': `acc: ${acc}, se: ${se}, nick_nm1: ${nick_nm1}, nick_nm2: ${nick_nm2}`
            //     }
            // });
            removeMemberTokenStorage();
            setMemberTokenStorage(acc);

            dispatch(setMember({
                se: Number(se),
                nick_nm1: nick_nm1,
                nick_nm2: nick_nm2,
                appVer: appVer ? appVer : null,
            }));
        }

        window.HiingBridge.setRefreshToken = function (acc: string) {
            setMemberTokenStorage(acc);

            dispatch(setRefreshToken({
                token: acc,
            }));

            // 쿼리 리프레시
            queryClient.refetchQueries({
                type: 'active' // 활성된 쿼리만 리패치
            });
        }

        window.HiingBridge.updatePage = function () {
            navigate(0);
        }

        window.HiingBridge.updateNickname = function (nick_nm1: string, nick_nm2: string) {
            dispatch(setMember({
                nick_nm1: nick_nm1,
                nick_nm2: nick_nm2
            }));
        }

        window.HiingBridge.navigatePage = function (url: string) {
            navigate(url);
        }
        
    }, [])
}


export const messageWebview = (params: CallHandlerMessage) => {
    console.log(`webview_flutter 통신: ${JSON.stringify(params)}`)
    if (window.HiingBridge && window.HiingBridge.postMessage) window.HiingBridge.postMessage(JSON.stringify(params));
}


export const messageMixpanel = (params: CallHandlerMessageMixpanel) => {
    console.log(params)
    if (window.HiingBridge && window.HiingBridge.postMessage) {
        const newParam = {
            type: 'mixpanel',
            ...params
        };

        window.HiingBridge.postMessage(JSON.stringify(newParam));
    }
}