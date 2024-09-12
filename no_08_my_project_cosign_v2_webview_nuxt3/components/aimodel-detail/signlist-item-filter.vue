<template>
    <div class="signlist-item-filter flex justify-between">
        <div class="filter flex items-center">
            <div class="type flex items-center mr-2">
                <h1 class="text-cap-1m text-font-dark-02 mr-1">상태</h1>
                <CommonPartsSelectBox
                    tag-id="select-filter-type"
                    :items="filterSignStatus.items"
                    :selected-index="filterSignStatus.activeIndex"
                    :change-selected-index="changeSelectedFilterTypeIndex"
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
import { MODEL_DETAIL_SIGN_LIST } from '~/composables/_app/asyncDataFetchKeys';
import { useReplaceRedirect } from '~/composables/_app/useReplaceRedirect';
import { useFilterData } from '~/composables/aimodel-detail/business/useFilterData';
import type { ModelDetailSignlistParams } from '~/composables/aimodel-detail/service/_types';
import { useAimdelDetailFilterCookies } from '~/composables/useCookie/aimodel-detail-filter';
import { piniaDetailFilterMethods } from '~/pinia/aimodel/piniaDetailFilterMethods';
import { piniaDetailServiceData } from '~/pinia/aimodel/piniaDetailServiceData';

const { refetch, updateSignlistRefreshed } = defineProps<{
    refetch: () => Promise<void>;
    updateSignlistRefreshed: (value: boolean) => void;
}>();


const { filterSignStatus, filterSortType } = useFilterData();
// const { setCookie_statusType, setCookie_sorting } = useAimdelDetailFilterCookies();
// const { changeQueryParams } = useReplaceRedirect();
const { changeFilterParams } = piniaDetailFilterMethods();
// const { clearSortingData } = piniaDetailServiceData();


const changeSelectedFilterTypeIndex = (index: number) => {
    
    filterSignStatus.activeIndex = index;
    const signStatus = filterSignStatus.items[index].key;
    const queryParam = {
        'signStatusType': signStatus
    }

    // setCookie_statusType(signStatus);
    commonFilterChange(queryParam);
    // changeQueryParams<ModelDetailSignlistParams>(queryParam);
}


const changeSelectedSortingIndex = (index: number) => {
    filterSortType.activeIndex = index;
    const sort = filterSortType.items[index].key;
    const queryParam = {
        'sortType': sort
    }

    // setCookie_sorting(sort);
    commonFilterChange(queryParam);
    // changeQueryParams<ModelDetailSignlistParams>(queryParam);
}


const commonFilterChange = (queryParam: Partial<ModelDetailSignlistParams>) => {
    changeFilterParams(queryParam);
    updateSignlistRefreshed(false);

    const { data } = useNuxtApp().payload;

    for (const key in data) {
        if (key.includes(MODEL_DETAIL_SIGN_LIST)) {
            delete data[key];
        }
    }
    // clearSortingData();
    // clearNuxtData(fetchKey);
    refetch();
}

</script>