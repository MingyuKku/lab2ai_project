import type { BasicRes, intercepterContext } from "~/composables/_api/_types"
import type { MypageUserInfo, ReturnSuccess, UpdateNicknameParams, UpdatePasswordParams } from './_types';
import type { SignupInputerrors } from "../../sign-up/business/_types";


interface Props {
    nicknameErrors?: SignupInputerrors;
    emailErrors?: SignupInputerrors;
}
export const useFetchUserInfoUpdate = ({ nicknameErrors, emailErrors }: Props) => {

    const { $serviceContentApiFetch } = useNuxtApp();


    const getUserInfo = async (): Promise<MypageUserInfo | null> => {
        try {
            const { data } = await $serviceContentApiFetch<BasicRes>('my-page/info', {
                method: 'POST',
                credentials: 'include',
            })


            if (!data || !data.userInfo) return null;

            const { userInfo }:{userInfo: MypageUserInfo} = data;
            return userInfo;

        } catch (err) {
            return null;
        }
    }




    const onResponseUpdateError = (context: intercepterContext): Promise<void> | void => {
        const { _data } = context.response;
        const { error } = _data;

        if (nicknameErrors) {
            if (error.errorName === 'USER_SAME_NICKNAME_EXIST') {
                if (!nicknameErrors.inUse) return;
                nicknameErrors.inUse.flag = true;
            }
    
            if (error.errorName === 'USER_INCORRECT_NICKNAME') {
                nicknameErrors.rule.flag = true;
            }
        }

        if (emailErrors) {
            if (error.errorName === 'USER_INCORRECT_NICKNAME') {
                emailErrors.rule.flag = true;
            }
    
            if (error.errorName === 'USER_ALREADY_EXIST') {
                if (!emailErrors.inUse) return;
                emailErrors.inUse.flag = true;
            }
        }
    }


    const updateNickname = async (params: UpdateNicknameParams): Promise<ReturnSuccess> => {
        try {
            await $serviceContentApiFetch<BasicRes>('my-page/change/user-info', {
                method: 'POST',
                credentials: 'include',
                body: Object.getParams(params),
                onResponseError: onResponseUpdateError
            })

            return {
                message: 'success'
            }
        } catch (err) {
            return {
                message: 'fail'
            }
        }
    }



    return {
        getUserInfo,
        updateNickname,
    }
}