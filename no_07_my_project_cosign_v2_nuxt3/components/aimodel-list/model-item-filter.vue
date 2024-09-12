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
import type { TradeTypeParamType } from '~/composables/home/service/_types';

const { refresh } = defineProps<{
    refresh: (opts?: AsyncDataExecuteOptions | undefined) => Promise<void>;
}>();


const { filterTradeType, filterStatPeriodType, filterSortType, changeSelectedFilter } = useFilterData();
const { setCookie_tradeType, setCookie_statPeriod ,setCookie_sorting } = useAimdelFilterCookies();


const changeSelectedFilterTradeTypeIndex = (index: number) => {
    changeSelectedFilter<TradeTypeParamType>({
        index,
        filterReactive: filterTradeType,
        // setCookie: setCookie_tradeType,
        refresh,
        changeQueryParam: {
            'tradeType': filterTradeType.items[index].key
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