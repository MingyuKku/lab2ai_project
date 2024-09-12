import { useCommon } from "../_app/useCommon";

export function useAuthTokenCookies() {

    const TOKEN_COOKIE_NAME = 'cosign-acc';
    const DEV_TOKEN_COOKIE_NAME = 'dev-cosign-acc';

    const { isDev } = useCommon();
    

    const getAccToken = () => {
        const accCookie = useCookie(isDev() ? DEV_TOKEN_COOKIE_NAME : TOKEN_COOKIE_NAME, {
            sameSite: 'strict',
            domain: process.dev ? 'localhost' : '.cosign.cc'
        });
    
        return accCookie;
    }

    const setAccToken = (newToken: string) => {
        const oldToken = getAccToken();
        oldToken.value = '';
        oldToken.value = null;

        oldToken.value = newToken;
        // const cookie = useCookie(isDev() ? DEV_TOKEN_COOKIE_NAME : TOKEN_COOKIE_NAME);
    
        // cookie.value = token;
    }

    return {
        getAccToken,
        setAccToken,
    }
}