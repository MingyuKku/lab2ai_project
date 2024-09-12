import { piniaAuthInfoValues } from "~/pinia/user/piniaAuthInfoValues";
import type { ErrorCode, intercepterContext } from "./_types";
import { useFetchSignout } from "../user/sign-out/service/useFetchSignout";
import { useSignOut } from "../user/sign-out/business/useSignOut";
import { useAuthTokenCookies } from "../useCookie/auth-token";

export const useFetchAuthInterceptor = () => {

    const authorizationHeader = () => {
        const { getAccToken } = useAuthTokenCookies();
        const acc = getAccToken();

        if (acc.value === undefined || acc.value === null) return null;
    
        return {
            'authorization': `Bearer ${acc.value}`,
        }
    }


    /** 
     * refresh: true인 경우에만 응답헤더에서 `Bearer {토큰명}` 이런식으로 새로운 토큰을 반환한다
     * refresh: false인 경우에는 응답헤더에서 `Bearer`만 반환함
     * */
    const onAuthorizationResponse = (context: intercepterContext) => {

        const { status } = context.response;

        const { getAccToken } = useAuthTokenCookies();
        const oldToken = getAccToken();

        if (status !== 200) return;
        
        
        const authorization:string | null = context.response.headers.get('Authorization');
        
        if (authorization === null) {
            const { deleteInvalidToken } = useSignOut();
            deleteInvalidToken(context.response._data);
        }

        if (authorization !== null) {
            const newToken = authorization.replace(/Bearer\s*/i, '');
            if (newToken !== '') {
                try {
                    oldToken.value = '';
                    oldToken.value = null;
                    oldToken.value = newToken;
                    
                    // context.response._data.isSuccess = true;
                    // return context.response._data;

                } catch (err) {
                    console.log(err)
                }
            }
        }
    }

    
    /**
     * 유저 권한 관련 api(sign-in, sign-out, refresh)의 응답 에러 함수
     */
    const onResponseAuthError = (context: intercepterContext): Promise<void> | void => {
        const { error }:{error: ErrorCode} = context.response._data;
        console.log('auth 응답 에러', error)

        const { isUserSignedIn } = piniaAuthInfoValues();
        const { signout } = useFetchSignout();


        if (!error.errorCode) return;

        if (isUserSignedIn) {
            // 로그인 유저 또는 토큰 쿠키가 남아있는 유저일 경우

            if (
                error.errorName === 'USER_NOT_FOUND' || // 유저를 찾을 수 없는 경우
                error.errorName === 'TOKEN_EXPIRE' || // 토큰이 만료된 경우
                error.errorName === 'REFRESH_TOKEN_EXPIRE' // 리프레시 토큰이 만료된 경우
            ) {
                // 이 경우들은 signout api 호출시에도 400에러가 나기 때문에 signout api를 호출하지 않고
                // 프론트에 있는 유저 데이터를 삭제해야 함
                const { deleteAuthData } = useSignOut();
                deleteAuthData();

                const { go } = useRouter();
                return go(0);
            }
            
            return signout();

        } else {
            // 토큰 쿠기가 없는 경우 프론트에 존재하는 유저 데이터 및 캐시 데이터를 삭제한다
            const { deleteAuthData } = useSignOut();
            deleteAuthData();

            const { go } = useRouter();
            return go(0);
        }
    }


    const onResponseAuthRefreshError = (context: intercepterContext): Promise<void> | void => {
        const { error }:{error: ErrorCode} = context.response._data;
        console.log('권한 리프레시 응답 에러', context.response._data)

        
        // 권한 api 응답 에러시 프론트 권한 로직 모두 제거
        const { signout } = useFetchSignout();
        signout();
    }


    return {
        authorizationHeader,
        onAuthorizationResponse,
        onResponseAuthError,
        onResponseAuthRefreshError,
    }
}

