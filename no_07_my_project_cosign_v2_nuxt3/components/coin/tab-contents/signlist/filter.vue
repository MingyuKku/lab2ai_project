<template>
    <div class="crypto-detail-page-signlist-filter flex items-center justify-between pt-space-top-lg">
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
            <div class="type flex items-center mr-2">
                <h1 class="text-cap-1m text-font-dark-02 mr-1">상태</h1>
                <CommonPartsSelectBox
                    tag-id="select-filter-sign-status"
                    :items="filterSignStatus.items"
                    :selected-index="filterSignStatus.activeIndex"
                    :change-selected-index="changeSelectedFilterSignStatusIndex"
                />
            </div>
        </div>
        <div class="sorting">
            <CommonPartsSelectSort
                tag-id="select-sorting"
                :items="filterSortType.items"
                :selected-index="filterSortType.activeIndex"
                :change-selected-index="changeSelectedSortingIndex"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useFilterValues } from '~/composables/coin/tab-contents/business/useFilterValues';
import { piniaSignlistLastFetchCheckValues } from '~/pinia/coin/tab-contents/piniaSignlistLastFetchCheckValues';
import { piniaCryptoDetailPageSignlist } from '~/pinia/sign-filters/piniaCryptoDetailPageSignlist';

const { fetchKey, refetch } = defineProps<{
    fetchKey: string;
    refetch: () => Promise<void>;
}>();

const { filterTradeType, filterSignStatus, filterSortType } = useFilterValues();
const { changeFilterParams } = piniaCryptoDetailPageSignlist();
const { clearSortingData } = piniaSignlistLastFetchCheckValues();


const changeSelectedFilterTradeTypeIndex = (index: number) => {
    filterTradeType.activeIndex = index;
    clearSortingData();
    clearNuxtData(fetchKey);

    const tradeType = filterTradeType.items[index].key;

    changeFilterParams({
        'tradeType': tradeType
    });

    refetch();
}

const changeSelectedFilterSignStatusIndex = (index: number) => {
    filterSignStatus.activeIndex = index;
    clearSortingData();
    clearNuxtData(fetchKey);

    const signStatus = filterSignStatus.items[index].key;

    changeFilterParams({
        'signStatusType': signStatus
    });

    refetch();
}

const changeSelectedSortingIndex = (index: number) => {
    filterSortType.activeIndex = index;
    clearSortingData();
    clearNuxtData(fetchKey);

    const sortType = filterSortType.items[index].key;

    changeFilterParams({
        'sortType': sortType
    });

    refetch();
}

</script>