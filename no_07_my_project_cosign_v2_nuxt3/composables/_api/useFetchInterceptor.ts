import type { ErrorCode, intercepterContext } from "./_types";
import { useAuthTokenCookies } from "../useCookie/auth-token";
import { isRefreshTokenCondition } from "../_auth/_methods";
import { useFetchAuth } from "../_auth/useFetchAuth";
import { useStateLocale } from "../useState/locale";
import { useSignOut } from "../user/sign-out/business/useSignOut";
import { piniaAuthInfoValues } from "~/pinia/user/piniaAuthInfoValues";



export function useFetchInterceptor() {

    const onRequestService = (context: intercepterContext) => {

        if (process.server) return;

        const { getAccToken } = useAuthTokenCookies();
        const token = getAccToken();

        if (!token.value) return; // 토큰이 쿠키에 없으면(비로그인 유저)

        if (isRefreshTokenCondition(token.value)) { // 만료된 토큰
            console.log('서비스 api 요청 리프레시가 필요해!')
            const { refreshToken } = useFetchAuth();
            refreshToken();
            // clearNuxtData(); // 모든 캐시된 넉스트데이타(asyncData) 제거
        }
    }


    const onResponseServiceError = async (context: intercepterContext): Promise<void> => {
        console.log('서비스 응답 에러 데이터', context.response._data)
        
        const { error }:{error: ErrorCode} = context.response._data;

        checkTokenExpireAndRefreshOrSignout(error);
    }


    const checkTokenExpireAndRefreshOrSignout = (error: ErrorCode) => {
        if (!error.errorCode) return;

        const { isUserSignedIn } = piniaAuthInfoValues();

        if (isUserSignedIn) {
            // 로그인 유저 또는 토큰 쿠키가 남아있는 유저일 경우
            if (error.errorName === 'TOKEN_EXPIRE') {
                // 토큰이 만료된 경우
                const { refreshToken } = useFetchAuth();
                refreshToken();

                if (window) {
                    window.location.reload();
                }
            }
        }


        // 이 경우들은 signout api 호출시에도 400에러가 나기 때문에 signout api를 호출하지 않고
        // 프론트에 있는 유저 데이터를 삭제해야 함
        const { deleteAuthData } = useSignOut();
        deleteAuthData();

        const { go } = useRouter();
        return go(0);
    }



    const languageHeader = () => {
        try {
            const userAgent = useRequestHeaders()['user-agent'] ?? navigator.userAgent;
            // console.log('유저 에이전트', userAgent)
            const isOpenGraph = userAgent.includes('Slackbot') || userAgent.includes('TelegramBot') || userAgent.includes('Googlebot');
            // console.log('isOpenGraph???', isOpenGraph)
            if (isOpenGraph === false) {
                const { getLocales } = useStateLocale();
                const locales = getLocales();
                // if (locale.value && (locale.value !== 'ko')) {
                if (locales.value && locales.value.length) {
                    return {
                        'X-check-language': locales.value[0].toUpperCase(),
                    }
                } else {
                    return null;
                }

            } else {
                return null;
            }
    
        } catch (err) {
            return null;
        }
    }


    return {
        onRequestService,
        languageHeader,
        onResponseServiceError,
        checkTokenExpireAndRefreshOrSignout,
    }
}