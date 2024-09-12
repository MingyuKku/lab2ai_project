import { useCommon } from "../_app/useCommon";
import type { ModelDetailSignListParamsKeys } from "../aimodel-detail/service/_types";
import { SignStatusTypeParam, type SignIdListParams, SignListSortTypeParam } from "../home/service/_types";
import type { FilterCookieKeyValue } from "./_types";

export function useAimdelDetailFilterCookies() {

    const COOKIE_AIMODEL_DETAIL_FILTER_STATUSTYPE = 'COOKIE_AIMODEL_DETAIL_FILTER_STATUSTYPE';
    const DEV_COOKIE_AIMODEL_DETAIL_FILTER_STATUSTYPE = 'DEV_COOKIE_AIMODEL_DETAIL_FILTER_STATUSTYPE';
    const COOKIE_AIMODEL_DETAIL_FILTER_SORTING = 'COOKIE_AIMODEL_DETAIL_FILTER_SORTING';
    const DEV_COOKIE_AIMODEL_DETAIL_FILTER_SORTING = 'DEV_COOKIE_AIMODEL_DETAIL_FILTER_SORTING';

    const { isDev } = useCommon();
    
    const getCookie_statusType = () => {
        return useCookie(isDev() ? DEV_COOKIE_AIMODEL_DETAIL_FILTER_STATUSTYPE : COOKIE_AIMODEL_DETAIL_FILTER_STATUSTYPE);
    }

    const setCookie_statusType = (value: any) => {
        if (value in SignStatusTypeParam) {
            const stringValue = JSON.stringify(value);
            const cookie = useCookie(isDev() ? DEV_COOKIE_AIMODEL_DETAIL_FILTER_STATUSTYPE : COOKIE_AIMODEL_DETAIL_FILTER_STATUSTYPE, {
                maxAge: 60 * 60 * 24 * 30 // 1달
            })
            cookie.value = stringValue;
        }
    }


    const getCookie_sorting = () => {
        return useCookie(isDev() ? DEV_COOKIE_AIMODEL_DETAIL_FILTER_SORTING : COOKIE_AIMODEL_DETAIL_FILTER_SORTING);
    }

    const setCookie_sorting = (value: any) => {
        if (value in SignListSortTypeParam) {
            const stringValue = JSON.stringify(value);
            const cookie = useCookie(isDev() ? DEV_COOKIE_AIMODEL_DETAIL_FILTER_SORTING : COOKIE_AIMODEL_DETAIL_FILTER_SORTING, {
                maxAge: 60 * 60 * 24 * 30 // 1달
            })
            cookie.value = stringValue;
        }
    }

    const getAllFilterCookies = () => {
        const values: FilterCookieKeyValue<ModelDetailSignListParamsKeys>[] = [];

        const statusType = getCookie_statusType();
        const sorting = getCookie_sorting();

        if (statusType.value) {
            values.push({
                key: 'signStatusType',
                value: statusType.value
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
        getCookie_statusType,
        setCookie_statusType,
        getCookie_sorting,
        setCookie_sorting,
        getAllFilterCookies,
    }
}