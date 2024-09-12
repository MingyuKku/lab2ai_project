<template>
    <div class="home-filter-select-area flex justify-between pb-space-between-y-md">
        <div class="filter flex items-center">
            <div class="type flex items-center mr-3">
                <h1 class="text-cap-1m text-font-dark-02 mr-1">유형</h1>
                <CommonPartsSelectBox
                    tag-id="select-filter-trade-type"
                    :items="filterTradeType.items"
                    :selected-index="filterTradeType.activeIndex"
                    :change-selected-index="changeSelectedFilterTradeTypeIndex"
                />
            </div>
            <div class="term flex items-center">
                <h1 class="text-cap-1m text-font-dark-02 mr-1">상태</h1>
                <CommonPartsSelectBox
                    tag-id="select-filter-status"
                    :items="filterSignStatus.items"
                    :selected-index="filterSignStatus.activeIndex"
                    :change-selected-index="changeSelectedFilterStatusIndex"
                />
            </div>
        </div>
        <div class="sorting flex items-center">
            <CommonPartsSelectSort
                tag-id="home-select-sorting"
                :align="'right'"
                :items="filterSortType.items"
                :selected-index="filterSortType.activeIndex"
                :change-selected-index="changehomeSelectedSortingIndex"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useFilterData } from '~/composables/home/business/useFilterData';
import { useHomeFilterCookies } from '~/composables/useCookie/home-filter';



const { refresh } = defineProps<{
    refresh: () => Promise<void>;
}>();

const { filterTradeType, filterSignStatus, filterSortType, filterChangeCommon } = useFilterData();
const { setCookie_tradeType, setCookie_status, setCookie_sorting } = useHomeFilterCookies();


const changeSelectedFilterTradeTypeIndex = (index: number) => {
    filterTradeType.activeIndex = index;

    const tradeType = filterTradeType.items[index].key;
    const filterParam = {
        'tradeType': tradeType
    }

    setCookie_tradeType(tradeType);
    filterChangeCommon(filterParam, refresh);
}


const changeSelectedFilterStatusIndex = (index: number) => {
    filterSignStatus.activeIndex = index;

    const signStatus = filterSignStatus.items[index].key;
    const filterParam = {
        'signStatusType': signStatus
    }

    setCookie_status(signStatus);
    filterChangeCommon(filterParam, refresh);
}


const changehomeSelectedSortingIndex = (index: number) => {
    filterSortType.activeIndex = index;

    const sortType = filterSortType.items[index].key;
    const filterParam = {
        'sortType': sortType
    }

    setCookie_sorting(sortType);
    filterChangeCommon(filterParam, refresh);
}

</script>