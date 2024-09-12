import { useAuthTokenCookies } from "~/composables/useCookie/auth-token";
import { useFetchSignout } from "../service/useFetchSignout";
import { piniaAuthInfoValues } from "~/pinia/user/piniaAuthInfoValues";

export function useSignOut() {



    /**
     * 유효한 acc토큰이 아닌 경우 로그아웃 처리하는 함수
     */
    function deleteInvalidToken(resData: any) {
        
        if (
            resData.error &&
            resData.error.errorCode === '101'
        ) { // 위 조건은 비로그인 상태에서도 반환하는 값이기에 아래 acc토큰이 있는지 조건을 더 검사해서 acc가 존재하는데 만료된 토큰이면 로그아웃시킴
            const { getAccToken } = useAuthTokenCookies();
            const { signout } = useFetchSignout();
            
            const token = getAccToken();
            if (token.value) {
                signout();
            }
        }
    }


    /**
    * 과거 v1때 사용했던 도메인과 'acc' 쿠키를 찾아 제거한다
    */
    const clearOldAccCookie = () => {
        const domains = [
            '.cosign.cc',
            'cosign.cc',
            'hb-1.cosign.cc',
            'hb-2.cosign.cc',
            'dev-mobile.cosign.cc',
            'dev-hybrid.cosign.cc',
        ]

        domains.forEach(domain => {
            const domainAcc = useCookie('acc', {
                domain: domain,
                // sameSite: 'strict',
            })

            if (domainAcc.value) domainAcc.value = null;
        })
    }


    /**
     * 프론트에 존재하는 권한 관련 데이터를 삭제(쿠키 및 피니아 전역 데이타)
     */
    const deleteAuthData = () => {
        const { getAccToken } = useAuthTokenCookies();
        const { updateAuthState } = piniaAuthInfoValues();
        
        // clearNuxtData() // 모든 캐시된 넉스트데이타(asyncData) 제거
        updateAuthState({ // 유저 상태 업데이트
            isUserSignedIn: false,
        });
        const token = getAccToken();
        token.value = null;
        clearOldAccCookie();
    }

    return {
        deleteInvalidToken,
        deleteAuthData
    }
}