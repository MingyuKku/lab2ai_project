import { I18N } from "./keys";
import i18nConfig from '~/locales/_config';

export function useStateLocale() {

    const getLocales = () => {
        return useState<string[]>(I18N);
    }

    /**
     * http 요청 헤더에서 추출한 우선 순위 언어들을 개발자가 관리하는 locale과 일치하는 언어만 추출해서 state에 주입
     */
    const initLocaleState = (browserLangs: string[]) => {
        const state = useState<string[]>(I18N);

        const localeCodes = new Set(i18nConfig.locales.map(locale => locale.code));
        const validLocales = browserLangs.filter(lang => localeCodes.has(lang));

        state.value = validLocales;
    }


    const changeLocaleState = (browserLang: string) => {
        const state = useState<string[]>(I18N);

        const index = state.value.indexOf(browserLang);
        
        if (index > -1) {
            state.value.splice(index, 1);
            state.value.unshift(browserLang);
        }
    }

    return {
        getLocales,
        initLocaleState,
        changeLocaleState,
    }
}