
export function useTimezoneCookies() {

    const TOMEZONE_COOKIE_NAME = 'cosign-timezone';
    

    const getCookie_timezone = () => {
        return useCookie(TOMEZONE_COOKIE_NAME);
    }

    const setCookie_timezone = (value: string) => {
        const cookie = useCookie(TOMEZONE_COOKIE_NAME, {
            maxAge: 60 * 60 * 24 * 365 // 1년
        });
            
        cookie.value = value;
    }

    return {
        getCookie_timezone,
        setCookie_timezone,
    }
}