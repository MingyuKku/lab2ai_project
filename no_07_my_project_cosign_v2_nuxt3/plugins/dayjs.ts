import { useTimezoneCookies } from "~/composables/useCookie/timezone";

export default defineNuxtPlugin(() => {

    // const { $dayjs } = useNuxtApp();
    // const textText = '2024-06-02T09:33:41.054'

    // console.log('텍스트', textText)
    // console.log('toJSON 테스트', $dayjs.utc(textText).tz('Asia/Seoul', true).toJSON())
    // console.log('toDate 테스트', $dayjs.utc(textText).tz('Asia/Seoul').toDate())
    // // console.log('toISOString 테스트', $dayjs.utc(textText).tz('Asia/Seoul').from())
    // console.log('format 테스트', $dayjs.utc(textText).tz('Asia/Seoul', true).format('YYYY-MM-DD HH:mm:ss'))

    // try {
    //     const tzTime = $dayjs.utc(textText).tz('Asia/Seoul', true);
    //     const dsdsd = new Date(tzTime.toJSON());
    //     console.log('커스텀 format 테스트', dsdsd.format('yyyy-MM-dd HH:mm:ss'))
    // } catch (err) {
    //     console.log(err)
    // }
    


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