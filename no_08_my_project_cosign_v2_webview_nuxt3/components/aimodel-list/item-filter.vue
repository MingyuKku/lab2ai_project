<template>
    <div class="model-item-filter px-primary flex justify-between">
        <div class="filter flex items-center">
            <div class="type flex items-center mr-3">
                <h1 class="text-cap-1m text-font-dark-02 mr-1">유형</h1>
                <CommonPartsSelectBox
                    tag-id="select-filter-type"
                    :items="filterTradeType.items"
                    :selected-index="filterTradeType.activeIndex"
                    :change-selected-index="changeSelectedFilterTradeTypeIndex"
                />
            </div>
            <div class="term flex items-center">
                <h1 class="text-cap-1m text-font-dark-02 mr-1">기간</h1>
                <CommonPartsSelectBox
                    tag-id="select-filter-term"
                    :items="filterStatPeriodType.items"
                    :selected-index="filterStatPeriodType.activeIndex"
                    :change-selected-index="changeSelectedFilterStatPeriodIndex"
                />
            </div>
        </div>
        <div class="sorting flex items-center">
            <CommonPartsSelectSort
                tag-id="select-sorting"
                :items="filterSortType.items"
                :selected-index="filterSortType.activeIndex"
                :change-selected-index="changehomeSelectedSortingIndex"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useFilterData } from '~/composables/aimodel/business/useFilterData';
import type { AsyncDataExecuteOptions } from '~/composables/_api/_types';
import { useAimdelFilterCookies } from '~/composables/useCookie/aimodel-filter';
import type { ModelListSortTypeParamType, StatPeriodTypeParamType } from '~/composables/aimodel/service/_types';
import type { TradeTypeParam, TradeTypeParamType } from '~/composables/home/service/_types';
import { messageWebview } from '~/composables/_app/useFlutterWebview';

const { refresh } = defineProps<{
    refresh: (opts?: AsyncDataExecuteOptions | undefined) => Promise<void>;
}>();


const { filterTradeType, filterStatPeriodType, filterSortType, changeSelectedFilter } = useFilterData();
// const { setCookie_tradeType, setCookie_statPeriod ,setCookie_sorting } = useAimdelFilterCookies();

// 첫 진입시 디폴트로 전송
messageWebview(`mixpanel/AI모델`);

const sendMixpanel = (tradeType:  keyof typeof TradeTypeParam) => {
    if (tradeType === 'all') messageWebview(`mixpanel/AI모델`);
    if (tradeType === 'futures') messageWebview(`mixpanel/선물_AI모델`);
    if (tradeType === 'spot') messageWebview(`mixpanel/현물_AI모델`);
}

const changeSelectedFilterTradeTypeIndex = (index: number) => {
    const tradeType = filterTradeType.items[index].key;

    sendMixpanel(tradeType);
    
    changeSelectedFilter<TradeTypeParamType>({
        index,
        filterReactive: filterTradeType,
        // setCookie: setCookie_tradeType,
        refresh,
        changeQueryParam: {
            'tradeType': tradeType
        }
    });
}

const changeSelectedFilterStatPeriodIndex = (index: number) => {
    changeSelectedFilter<StatPeriodTypeParamType>({
        index,
        filterReactive: filterStatPeriodType,
        // setCookie: setCookie_statPeriod,
        refresh,
        changeQueryParam: {
            'statPeriodType': filterStatPeriodType.items[index].key
        }
    });
}

const changehomeSelectedSortingIndex = (index: number) => {
    changeSelectedFilter<ModelListSortTypeParamType>({
        index,
        filterReactive: filterSortType,
        // setCookie: setCookie_sorting,
        refresh,
        changeQueryParam: {
            'sortType': filterSortType.items[index].key
        }
    });
}


</script>