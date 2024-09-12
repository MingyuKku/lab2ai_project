import { useStateLocale } from "../useState/locale";

export function useInstance() {

    const { getLocales } = useStateLocale();
    const locales = getLocales();

    const POJO = <T>(instance: T):T => {
        const stringify = JSON.stringify(instance);
        return JSON.parse(stringify);
    }

    // const numberFormat = (): Intl.NumberFormat => {
    //     return new Intl.NumberFormat();
    // };

    const numberFormat = (value: string | number): string => {

        // 숫자를 문자열로 변환
        let numberStr = value.toString();
        
        // 정규식을 사용하여 불필요한 소수점 이하의 0 제거
        if (numberStr.indexOf('.') >= 0) {
            numberStr = numberStr.replace(/\.?0+$/, '');
        }

        // 소수점 이하 자릿수를 계산
        const decimalPlaces = (numberStr.split('.')[1] || '').length;

        return new Intl.NumberFormat(locales.value[0], {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        }).format(Number(value));
    };


    const dateTimeFormat = (locale: string, opt: Intl.DateTimeFormatOptions): Intl.DateTimeFormat => {
        return new Intl.DateTimeFormat(locale, opt);
    }


    return {
        POJO,
        numberFormat,
        dateTimeFormat,
        // numberFormat2,
    }
}
