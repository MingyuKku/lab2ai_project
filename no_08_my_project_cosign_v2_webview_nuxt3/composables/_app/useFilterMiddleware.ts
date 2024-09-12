import type { RouteLocationNormalized } from "#vue-router"
import { piniaFilterMethods } from "~/pinia/home/piniaFilterMethods";
import type { DigitalAssetsIdParamType, SignIdListParamsKeys, SignListSortTypeParamType, SignStatusTypeParamType, TradeTypeParamType } from "../home/service/_types"
import { useHomeFilterCookies } from "../useCookie/home-filter";
import type { ModelListParamsKeys, ModelListSortTypeParamType, StatPeriodTypeParamType } from "../aimodel/service/_types";
import { useAimdelFilterCookies } from "../useCookie/aimodel-filter";
import { piniaModelListFilterMethods } from "~/pinia/aimodel/piniaModelListFilterMethods";
import type { ModelDetailSignlistParamsKeys } from "../aimodel-detail/service/_types";
import { useAimdelDetailFilterCookies } from "../useCookie/aimodel-detail-filter";
import { piniaDetailFilterMethods } from "~/pinia/aimodel/piniaDetailFilterMethods";
import type { FilterCookieKeyValue } from "../useCookie/_types";

export function useFilterMiddleware() {

    const getIndexQueryParams = (to: RouteLocationNormalized): FilterCookieKeyValue<SignIdListParamsKeys>[] => {
        const queryNames = Object.keys(to.query) as SignIdListParamsKeys[];
        const { getAllFilterCookies } = useHomeFilterCookies();
        const allFilterCookies = getAllFilterCookies();
        return allFilterCookies.filter(item => !queryNames.includes(item.key));
    }

    const setIndex = (to: RouteLocationNormalized) => {

        const queryNames = Object.keys(to.query) as SignIdListParamsKeys[];
        
        const { changeFilterParams } = piniaFilterMethods();
        const { setCookie_crypto, setCookie_status, setCookie_sorting, setCookie_tradeType } = useHomeFilterCookies();
        
        queryNames.forEach(name => {
            // if (name === 'digitalAssetsId') {
            //     setCookie_crypto(to.query[name]);
            //     changeFilterParams({
            //         digitalAssetsId: to.query[name] as unknown as DigitalAssetsIdParamType
            //     });
            // }
            if (name === 'signStatusType') {
                setCookie_status(to.query[name]);
                changeFilterParams({
                    signStatusType: to.query[name] as SignStatusTypeParamType
                });
            }
            if (name === 'sortType') {
                setCookie_sorting(to.query[name]);
                changeFilterParams({
                    sortType: to.query[name] as SignListSortTypeParamType
                });
            }
            if (name === 'tradeType') {
                setCookie_tradeType(to.query[name]);
                changeFilterParams({
                    tradeType: to.query[name] as TradeTypeParamType
                });
            }
        })
    }



    const getAimodelQueryParams = (to: RouteLocationNormalized): FilterCookieKeyValue<ModelListParamsKeys>[] => {
        const queryNames = Object.keys(to.query) as ModelListParamsKeys[];
        const { getAllFilterCookies } = useAimdelFilterCookies();
        const allFilterCookies = getAllFilterCookies();
        return allFilterCookies.filter(item => !queryNames.includes(item.key));
    }

    const setAimodel = (to: RouteLocationNormalized) => {
        const queryNames = Object.keys(to.query) as ModelListParamsKeys[];

        const { setCookie_tradeType, setCookie_sorting, setCookie_statPeriod } = useAimdelFilterCookies();
        const { changeFilterParams } = piniaModelListFilterMethods();

        queryNames.forEach(name => {
            if (name === 'statPeriodType') {
                setCookie_statPeriod(to.query[name]);
                changeFilterParams({
                    statPeriodType: to.query[name] as StatPeriodTypeParamType
                });
            }
            if (name === 'sortType') {
                setCookie_sorting(to.query[name]);
                changeFilterParams({
                    sortType: to.query[name] as ModelListSortTypeParamType
                });
            }
            if (name === 'tradeType') {
                setCookie_tradeType(to.query[name]);
                changeFilterParams({
                    tradeType: to.query[name] as TradeTypeParamType
                });
            }
        })
    }


    
    const getModelidQueryParams = (to: RouteLocationNormalized): FilterCookieKeyValue<ModelDetailSignlistParamsKeys>[] => {
        const queryNames = Object.keys(to.query) as ModelDetailSignlistParamsKeys[];
        const { getAllFilterCookies } = useAimdelDetailFilterCookies();
        const allFilterCookies = getAllFilterCookies();
        return allFilterCookies.filter(item => !queryNames.includes(item.key));
    }

    const setModelid = (to: RouteLocationNormalized) => {
        const queryNames = Object.keys(to.query) as ModelDetailSignlistParamsKeys[];

        const { setCookie_statusType, setCookie_sorting } = useAimdelDetailFilterCookies();
        const { changeFilterParams } = piniaDetailFilterMethods();

        queryNames.forEach(name => {
            if (name === 'signStatusType') {
                setCookie_statusType(to.query[name]);
                changeFilterParams({
                    signStatusType: to.query[name] as SignStatusTypeParamType
                });
            }
            if (name === 'sortType') {
                setCookie_sorting(to.query[name]);
                changeFilterParams({
                    sortType: to.query[name] as SignListSortTypeParamType
                });
            }
        })
    }



    return {
        getIndexQueryParams,
        setIndex,
        getAimodelQueryParams,
        setAimodel,
        getModelidQueryParams,
        setModelid,
    }
}