import { Cookies } from "react-cookie";

export const useGetLocale = () => {
    const cookies = new Cookies();
    const cookieName = 'lab2ai-locale';

    const browserLang = 
        (
            window.navigator.language === 'ko' ||
            window.navigator.language === 'ko-KR'
        )
        ? 'ko'
        : 'global';

    return cookies.get(cookieName) ?? browserLang;
}

export const useSetLocale = (locale: string) => {
    const cookies = new Cookies();
    const cookieName = 'lab2ai-locale';

    cookies.set(cookieName, locale);
}