import { isRefreshTokenCondition } from "~/composables/_auth/_methods";
import { useFetchAuth } from "~/composables/_auth/useFetchAuth";
import { useAuthTokenCookies } from "~/composables/useCookie/auth-token";

export default defineNuxtRouteMiddleware(async (to, from) => {

    if (process.server) return;

    const { getAccToken } = useAuthTokenCookies();
    const token = getAccToken();

    if (token.value) { // 토큰이 쿠키에 있으면(로그인 유저)

        if (isRefreshTokenCondition(token.value)) { // 만료된 토큰
            // console.log('01미들웨어 리프레시가 필요해!')
            const { refreshToken } = useFetchAuth();
            await refreshToken();
            // 리프레시 응답 후 다음 페이지로 렌더링 시킴
        }
        

    } else { // 토큰이 쿠키에 없으면(비로그인 유저)

        // 로그인 유저만 접속 가능한 페이지를 차단
    }
})


