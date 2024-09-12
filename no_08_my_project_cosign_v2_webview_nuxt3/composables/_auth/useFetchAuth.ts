import type { AuthRes } from "../_api/_types";
import { useFetchAuthInterceptor } from "../_api/useFetchAuthInterceptor";
import type { ReturnSuccess } from "../user/mypage/service/_types";

export function useFetchAuth() {

    const refreshToken = async (): Promise<ReturnSuccess> => {

        const { $authApiFetch } = useNuxtApp();
        const { onAuthorizationResponse } = useFetchAuthInterceptor();

        try {
            const res = await $authApiFetch<AuthRes>(`user/token/refresh`, {
                method:'POST',
                credentials: 'include',
                onResponse: onAuthorizationResponse,
            });

            clearNuxtData(); // 모든 캐시된 넉스트데이타(asyncData) 제거
            console.log('리프레시 응답', res)

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
        refreshToken,
        // checkUserInfo
    }
}