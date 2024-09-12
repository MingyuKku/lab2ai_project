import { piniaModelListFilterMethods } from "~/pinia/aimodel/piniaModelListFilterMethods";
import type { TradeTypeParamType } from "~/composables/home/service/_types";
import type { ModelListParams, ModelListSortTypeParamType, StatPeriodTypeParamType } from "../service/_types";
import type { FilterReactiveType } from "~/composables/home/business/_types";
import type { ChangeSelectedFilterFucParams } from "./_types";
import { useReplaceRedirect } from "~/composables/_app/useReplaceRedirect";
import { PREDICT_MODEL_LIST } from "~/composables/_app/asyncDataFetchKeys";


export function useFilterData() {

    const { filterParams, changeFilterParams } = piniaModelListFilterMethods();

    const filterTradeType = reactive<FilterReactiveType<TradeTypeParamType>>({
        activeIndex: 0,
        items: [
            {
                label: '전체',
                key: 'all',
            },
            {
                label: '현물',
                key: 'spot',
            },
            {
                label: '선물',
                key: 'futures',
            },
        ]
    })
    filterTradeType.activeIndex = Math.max(filterTradeType.items.findIndex(item => item.key === filterParams.tradeType), 0); // 초기값 셋팅


    const filterStatPeriodType = reactive<FilterReactiveType<StatPeriodTypeParamType>>({
        activeIndex: 0,
        items: [
            {
                label: '전체',
                key: 'total',
            },
            {
                label: '10일',
                key: 'recentDays',
            },
        ]
    })
    filterStatPeriodType.activeIndex = Math.max(filterStatPeriodType.items.findIndex(item => item.key === filterParams.statPeriodType), 0); // 초기값 셋팅


    const filterSortType = reactive<FilterReactiveType<ModelListSortTypeParamType>>({
        activeIndex: 0,
        items: [
            {
                label: '수익 적중률순',
                key: 'hitRate',
            },
            {
                label: '최고 수익률순',
                key: 'earningRate',
            },
        ]
    })
    filterSortType.activeIndex = Math.max(filterSortType.items.findIndex(item => item.key === filterParams.sortType), 0); // 초기값 셋팅


    const changeSelectedFilter = <T>({
        index,
        filterReactive,
        // setCookie,
        refresh,
        changeQueryParam
    }: ChangeSelectedFilterFucParams<T>) => {

        // const { changeQueryParams } = useReplaceRedirect();
        
        filterReactive.activeIndex = index;
        // setCookie(filterReactive.items[index].key);
        changeFilterParams(changeQueryParam);
        clearNuxtData(PREDICT_MODEL_LIST);
        refresh();
        // changeQueryParams<ModelListParams>(changeQueryParam);
    }

    return {
        filterTradeType,
        filterStatPeriodType,
        filterSortType,
        changeSelectedFilter,
    }
}