import type { BasicRes } from "~/composables/_api/_types";
import type { Options } from "~/plugins/api";
import { useIntercepter } from "../business/useIntercepter";
import { piniaAuthInfoValues } from "~/pinia/user/piniaAuthInfoValues";
import { useFetchAuthInterceptor } from "~/composables/_api/useFetchAuthInterceptor";
import type { CosignSigninParams, SocialSignInParams, SocialSignInRes } from "./_types";
import type { ReturnSuccess } from "../../mypage/service/_types";

export function useFetchSignin() {

    
    /**
     * 로그인성공시 true 반환
     */
    const signin = async ({ username, password, deviceType }: CosignSigninParams): Promise<ReturnSuccess> => {
        const { $authApiFetch } = useNuxtApp();

        try {
            const { onAuthorizationResponse } = useFetchAuthInterceptor();
            const { signinResponseError } = useIntercepter();
            const { updateAuthState } = piniaAuthInfoValues();

            const params: CosignSigninParams = {
                username,
                password,
                deviceType
            }
            const option: Options = {
                method: 'POST',
                credentials: 'include',
                body: Object.getParams(params),
                onResponse: onAuthorizationResponse,
                onResponseError: signinResponseError,
            }

            await $authApiFetch<BasicRes>(`user/login`, option);

            updateAuthState({
                isUserSignedIn: true,
            })
            // clearNuxtData() // 모든 캐시된 넉스트데이타(asyncData) 제거
            // setIsLogin(true);
            return {
                message: 'success'
            }

        } catch (err) {
            return {
                message: 'fail'
            }
        }
    }


    const socialSignin = async ({ st, loginResponse }: SocialSignInParams): Promise<SocialSignInRes | null> => {
        const { $authApiFetch } = useNuxtApp();

        try {
            const { onAuthorizationResponse } = useFetchAuthInterceptor();
            const { signinResponseError } = useIntercepter();
            // const { updateAuthState } = piniaAuthInfoValues();

            const params = {
                st,
                loginResponse: JSON.stringify(loginResponse)
            }
            const option: Options = {
                method: 'POST',
                credentials: 'include',
                body: Object.getParams(params),
                onResponse: onAuthorizationResponse,
                onResponseError: signinResponseError,
            }

            const result = await $authApiFetch<SocialSignInRes>('user/social/login', option)
            // alert(`이거 호출${JSON.stringify(result)}`)
            return result;

        } catch (err) {
            return null;
        }
    }


    return {
        signin,
        socialSignin,
    }
}