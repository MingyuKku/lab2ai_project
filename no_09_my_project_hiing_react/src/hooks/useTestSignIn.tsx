import React from "react"
import { useNavigate } from "react-router-dom";
import { encryptData } from "utils";
import { tokenAxios } from "_fetch/token";
import { removeMemberTokenStorage, setMemberTokenStorage, setRefreshCountStorage, setRefreshStringDataStorage } from "services/token";

export const useTestSignIn = () => {
    const test = async () => {
        try {
            const phoneNo = await encryptData('01042487200') ?? 'dcdrfjBDqaQDlIkoJ58VRg==';
            const deviceId = await encryptData('112') ?? 'nzKuXKBBV8oBtvtFOJ/2GQ==';

            const { data } = await tokenAxios().post('login/phone', {
                phone_no: phoneNo, // 내 핸드폰 암호화
                device_id: deviceId, // 임시 디바이스 번호 112 암호화
                authentication_data: 'abcd' + '1' // 임시
            })
    
            if (data) {
                const token = data.api_access_token;
                if (token) {
                    // 여기에 로컬 스토리지 셋팅
                    // setMemberTokenStorage(token);
                    setRefreshStringDataStorage('abcd');
                    setRefreshCountStorage('1');
                    window.HiingBridge?.setMemberInfo(token, 122, 'june', 'june');
                    // window.HiingBridge?.setMemberInfo(token, 44, 'ff');
                    // navigate('/', { replace: true });
                    // window.location.reload();
                    // navigate('/', {
                    //     replace: true
                    // })
                }
            }

        } catch (err) {
            console.log(err)
        }
    }

    // React.useEffect(() => {
    //     if (process.env.NODE_ENV !== 'development') return;
        
    //     const memberToken = getMemberTokenStorage();
    //     if (!memberToken) test();
        
    // }, [])

    return test;
}