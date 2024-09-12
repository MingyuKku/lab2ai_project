import { piniaDetailFilterMethods } from "~/pinia/aimodel/piniaDetailFilterMethods";
import type { SignListSortTypeParamType, SignStatusTypeParamType } from "~/composables/home/service/_types";
import type { FilterReactiveType } from "~/composables/home/business/_types";



export function useFilterData() {

    const { filterParams, changeFilterParams } = piniaDetailFilterMethods();

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
                label: '등록일순',
                key: 'created',
            },
            {
                label: '업데이트순',
                key: 'updated',
            },
            {
                label: '수익률순',
                key: 'earningRate',
            },
        ]
    })
    filterSortType.activeIndex = Math.max(filterSortType.items.findIndex(item => item.key === filterParams.sortType), 0); // 초기값 셋팅

    return {
        filterSignStatus,
        filterSortType,
    }
}