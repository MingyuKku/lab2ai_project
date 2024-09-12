import { StatPeriodTypeParam, type ModelListParamsKeys, ModelListSortTypeParam } from "../aimodel/service/_types";
import { useCommon } from "../_app/useCommon";
import { TradeTypeParam } from "../home/service/_types";
import type { FilterCookieKeyValue } from "./_types";


export function useAimdelFilterCookies() {

    const COOKIE_AIMODEL_FILTER_TRADETYPE = 'COOKIE_AIMODEL_FILTER_TRADETYPE';
    const DEV_COOKIE_AIMODEL_FILTER_TRADETYPE = 'DEV_COOKIE_AIMODEL_FILTER_TRADETYPE';
    const COOKIE_AIMODEL_FILTER_STATPERIOD = 'COOKIE_AIMODEL_FILTER_STATPERIOD';
    const DEV_COOKIE_AIMODEL_FILTER_STATPERIOD = 'DEV_COOKIE_AIMODEL_FILTER_STATPERIOD';
    const COOKIE_AIMODEL_FILTER_SORTING = 'COOKIE_AIMODEL_FILTER_SORTING';
    const DEV_COOKIE_AIMODEL_FILTER_SORTING = 'DEV_COOKIE_AIMODEL_FILTER_SORTING';

    const { isDev } = useCommon();


    const getCookie_tradeType = () => {
        return useCookie(isDev() ? DEV_COOKIE_AIMODEL_FILTER_TRADETYPE : COOKIE_AIMODEL_FILTER_TRADETYPE);
    }

    const setCookie_tradeType = (value: any) => {
        if (value in TradeTypeParam) {
            const stringValue = JSON.stringify(value);
            const cookie = useCookie(isDev() ? DEV_COOKIE_AIMODEL_FILTER_TRADETYPE : COOKIE_AIMODEL_FILTER_TRADETYPE, {
                maxAge: 60 * 60 * 24 * 30 // 1달
            })
            cookie.value = stringValue;
        }
    }

    const getCookie_statPeriod = () => {
        return useCookie(isDev() ? DEV_COOKIE_AIMODEL_FILTER_STATPERIOD : COOKIE_AIMODEL_FILTER_STATPERIOD);
    }

    const setCookie_statPeriod = (value: any) => {
        if (value in StatPeriodTypeParam) {
            const stringValue = JSON.stringify(value);
            const cookie = useCookie(isDev() ? DEV_COOKIE_AIMODEL_FILTER_STATPERIOD : COOKIE_AIMODEL_FILTER_STATPERIOD, {
                maxAge: 60 * 60 * 24 * 30 // 1달
            })
            cookie.value = stringValue;
        }
    }
    
    const getCookie_sorting = () => {
        return useCookie(isDev() ? DEV_COOKIE_AIMODEL_FILTER_SORTING : COOKIE_AIMODEL_FILTER_SORTING);
    }

    const setCookie_sorting = (value: any) => {
        if (value in ModelListSortTypeParam) {
            const stringValue = JSON.stringify(value);
            const cookie = useCookie(isDev() ? DEV_COOKIE_AIMODEL_FILTER_SORTING : COOKIE_AIMODEL_FILTER_SORTING, {
                maxAge: 60 * 60 * 24 * 30 // 1달
            })
            cookie.value = stringValue;
        }
    }


    const getAllFilterCookies = () => {
        const values: FilterCookieKeyValue<ModelListParamsKeys>[] = [];

        const tradeType = getCookie_tradeType();
        const statPeriod = getCookie_statPeriod();
        const sorting = getCookie_sorting();

        if (tradeType.value) {
            values.push({
                key: 'tradeType',
                value: tradeType.value
            });
        }
        if (statPeriod.value) {
            values.push({
                key: 'statPeriodType',
                value: statPeriod.value
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
        getCookie_tradeType,
        setCookie_tradeType,
        getCookie_statPeriod,
        setCookie_statPeriod,
        getCookie_sorting,
        setCookie_sorting,
        getAllFilterCookies,
    }
}