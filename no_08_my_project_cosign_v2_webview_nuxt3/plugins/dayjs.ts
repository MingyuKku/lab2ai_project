import { useTimezoneCookies } from "~/composables/useCookie/timezone";

export default defineNuxtPlugin(() => {

    if (process.server) return;

    const { getCookie_timezone, setCookie_timezone } = useTimezoneCookies();
    const timezone_cookie = getCookie_timezone();

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (timezone_cookie.value) {
        if (timezone_cookie.value === timeZone) return; // 타임존과 기존 타임존 쿠키가 같은 경우 타임존 업데이트 필요없음
    }
    
    // 위 예외 케이스를 제외한 경우는 클라이언트 타임존으로 쿠키값 셋팅 후 페이지 리프레시
    setCookie_timezone(timeZone);
    window.location.reload();
})