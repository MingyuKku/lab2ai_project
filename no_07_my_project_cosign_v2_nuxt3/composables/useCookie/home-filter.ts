import { SignStatusTypeParam, TradeTypeParam, SignListSortTypeParam, type SignIdListParamsKeys, } from "../home/service/_types";
import { useCommon } from "../_app/useCommon";
import type { FilterCookieKeyValue } from "./_types";


export function useHomeFilterCookies() {

    const COOKIE_HOME_FILTER_CRYPTO = 'COOKIE_HOME_FILTER_CRYPTO';
    const DEV_COOKIE_HOME_FILTER_CRYPTO = 'DEV_COOKIE_HOME_FILTER_CRYPTO';
    const COOKIE_HOME_FILTER_TRADETYPE = 'COOKIE_HOME_FILTER_TRADETYPE';
    const DEV_COOKIE_HOME_FILTER_TRADETYPE = 'DEV_COOKIE_HOME_FILTER_TRADETYPE';
    const COOKIE_HOME_FILTER_STATUS = 'COOKIE_HOME_FILTER_STATUS';
    const DEV_COOKIE_HOME_FILTER_STATUS = 'DEV_COOKIE_HOME_FILTER_STATUS';
    const COOKIE_HOME_FILTER_SORTING = 'COOKIE_HOME_FILTER_SORTING';
    const DEV_COOKIE_HOME_FILTER_SORTING = 'DEV_COOKIE_HOME_FILTER_SORTING';
    
    const { isDev } = useCommon();
    

    const getCookie_crypto = () => {
        return useCookie(isDev() ? DEV_COOKIE_HOME_FILTER_CRYPTO : COOKIE_HOME_FILTER_CRYPTO);
    }

    const setCookie_crypto = (value: any) => {
        if (!isNaN(Number(value))) {
            const stringValue = JSON.stringify(value);
            const cookie = useCookie(isDev() ? DEV_COOKIE_HOME_FILTER_CRYPTO : COOKIE_HOME_FILTER_CRYPTO, {
                maxAge: 60 * 60 * 24 * 30 // 1달
            })
            cookie.value = stringValue;
        }
    }

    const getCookie_tradeType = () => {
        return useCookie(isDev() ? DEV_COOKIE_HOME_FILTER_TRADETYPE : COOKIE_HOME_FILTER_TRADETYPE);
    }

    const setCookie_tradeType = (value: any) => {
        if (value in TradeTypeParam) {
            const stringValue = JSON.stringify(value);
            const cookie = useCookie(isDev() ? DEV_COOKIE_HOME_FILTER_TRADETYPE : COOKIE_HOME_FILTER_TRADETYPE, {
                maxAge: 60 * 60 * 24 * 30 // 1달
            })
            cookie.value = stringValue;
        }
    }


    const getCookie_status = () => {
        return useCookie(isDev() ? DEV_COOKIE_HOME_FILTER_STATUS : COOKIE_HOME_FILTER_STATUS);
    }

    const setCookie_status = (value: any) => {
        if (value in SignStatusTypeParam) {
            const stringValue = JSON.stringify(value);
            const cookie = useCookie(isDev() ? DEV_COOKIE_HOME_FILTER_STATUS : COOKIE_HOME_FILTER_STATUS, {
                maxAge: 60 * 60 * 24 * 30 // 1달
            })
            cookie.value = stringValue;
        }
    }


    const getCookie_sorting = () => {
        return useCookie(isDev() ? DEV_COOKIE_HOME_FILTER_SORTING : COOKIE_HOME_FILTER_SORTING);
    }

    const setCookie_sorting = (value: any) => {
        if (value in SignListSortTypeParam) {
            const stringValue = JSON.stringify(value);
            const cookie = useCookie(isDev() ? DEV_COOKIE_HOME_FILTER_SORTING : COOKIE_HOME_FILTER_SORTING, {
                maxAge: 60 * 60 * 24 * 30 // 1달
            })
            cookie.value = stringValue;
        }
    }


    const getAllFilterCookies = () => {
        const values: FilterCookieKeyValue<SignIdListParamsKeys>[] = [];

        // const cryptoId = getCookie_crypto();
        const tradeType = getCookie_tradeType();
        const signStatus = getCookie_status();
        const sorting = getCookie_sorting();

        // if (cryptoId.value) {
        //     values.push({
        //         key: 'digitalAssetsId',
        //         value: cryptoId.value
        //     });
        // }
        if (tradeType.value) {
            values.push({
                key: 'tradeType',
                value: tradeType.value
            });
        }
        if (signStatus.value) {
            values.push({
                key: 'signStatusType',
                value: signStatus.value
            });
        }
        if (sorting.value) {
            values.push({
                key: 'sortType',
                value: sorting.value
            });
        }

        return values;
    }


    return {
        getCookie_crypto,
        setCookie_crypto,
        getCookie_tradeType,
        setCookie_tradeType,
        getCookie_status,
        setCookie_status,
        getCookie_sorting,
        setCookie_sorting,
        getAllFilterCookies,
    }
}