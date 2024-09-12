import { useInstance } from '~/composables/_api/useInstance';
import { useTimezoneCookies } from '~/composables/useCookie/timezone';
import { useStateLocale } from '~/composables/useState/locale';

export const useTimeFormats = () => {
    
    const { dateTimeFormat } = useInstance();
    const { getLocales } = useStateLocale();
    const locales = getLocales();
    const locale = locales.value[0];
    const { getCookie_timezone } = useTimezoneCookies();
    const timezoneCookie = getCookie_timezone();



    const shortTimeFormat = dateTimeFormat(locale as string, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: timezoneCookie.value ?? undefined
    })


    return {
        shortTimeFormat,
    }
}