import type { SignIdListParams, SignListSortTypeParamType, SignStatusTypeParamType, TradeTypeParamType } from "../service/_types";
import { piniaFilterMethods } from "~/pinia/home/piniaFilterMethods";
import type { FilterReactiveType } from "./_types";
import { useReplaceRedirect } from "~/composables/_app/useReplaceRedirect";
import { HOME_SIGN_ID_LIST } from "~/composables/_app/asyncDataFetchKeys";

export function useFilterData() {

    const { filterParams, changeFilterParams } = piniaFilterMethods();
    const { changeQueryParams } = useReplaceRedirect();
    
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


    const filterSignStatus = reactive<FilterReactiveType<SignStatusTypeParamType>>({
        activeIndex: 0,
        items: [
            {
                label: '전체',
                key: 'all',
            },
            {
                label: '진입 전',
                key: 'wait',
            },
            {
                label: '진입 성공',
                key: 'processing',
            },
            {
                label: '종료',
                key: 'end',
            },
        ]
    })
    filterSignStatus.activeIndex = Math.max(filterSignStatus.items.findIndex(item => item.key === filterParams.signStatusType), 0); // 초기값 셋팅


    const filterSortType = reactive<FilterReactiveType<SignListSortTypeParamType>>({
        activeIndex: 0,
        items: [
            {
                label: '업데이트순',
                key: 'updated',
            },
            {
                label: '수익률순',
                key: 'earningRate',
            },
            {
                label: '등록일순',
                key: 'created',
            },
        ]
    })
    filterSortType.activeIndex = Math.max(filterSortType.items.findIndex(item => item.key === filterParams.sortType), 0); // 초기값 셋팅


    const filterChangeCommon = (filterParam: Partial<SignIdListParams>, refresh?: () => Promise<void>) => {
        changeFilterParams(filterParam);
        changeQueryParams<SignIdListParams>(filterParam);
        clearNuxtData(HOME_SIGN_ID_LIST);
        if (refresh) refresh();
    }

    return {
        filterTradeType,
        filterSignStatus,
        filterSortType,
        filterChangeCommon,
    }
}