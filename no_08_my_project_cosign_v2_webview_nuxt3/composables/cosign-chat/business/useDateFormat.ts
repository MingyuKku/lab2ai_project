import { useInstance } from "~/composables/_api/useInstance";
import { useStateLocale } from "~/composables/useState/locale";

export const useDateFormat = () => {
    const { getLocales } = useStateLocale();
    const { dateTimeFormat } = useInstance();
    
    const locales = getLocales();
    const locale = locales.value[0];
    
    const dateFormat = dateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short'
    })


    return dateFormat;
}