import { useStateLocale } from "~/composables/useState/locale";
import { i18nMethods } from "~/locales/_methods";
import type { I18nText } from "~/locales/_types";

export default defineNuxtPlugin(async () => {

    const { getPrimaryLanguages } = i18nMethods();
    const { initLocaleState } = useStateLocale();
    
    if (process.server) { // useRequestHeaders컴포저블을 사용하려면 서버사이드에서 사용해야 함
        const headers = useRequestHeaders();
        const acceptLang = headers['accept-language'];
        const primaryLangs = getPrimaryLanguages(acceptLang);
        initLocaleState(primaryLangs);
    }

    const { getLocales } = useStateLocale();
    const locales = getLocales();

    const module = await import(`~/locales/${locales.value[0]}.json`);
    
    return {
        provide: {
            I: module.default as I18nText,
        }
    }
})