import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetLocale } from "./useGetLocale";

const useLocaleNavigate = () => {
    const { locale } = useParams();
    const navigate = useNavigate();
    const setCookie = useSetLocale
    // const { setLocaleJson } = useLocaleContext();
    
    React.useEffect(() => {
        if (!locale) {
            const { language } = window.navigator;
            if (
                language === 'ko' ||
                language === 'ko-KR'
            ) {
                setCookie('ko');
                navigate(`/ko`);

            } else {
                setCookie('global');
                navigate(`/global`);
            }

        } else {
            setCookie(locale);
            // cookies.set('lab2ai-locale', locale);
            // setLocaleJson(locale);
        }
    }, [])
}
 
export default useLocaleNavigate;