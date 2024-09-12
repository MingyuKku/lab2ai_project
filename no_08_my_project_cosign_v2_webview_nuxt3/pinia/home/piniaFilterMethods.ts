import { SignStatusTypeParam, type SignIdListParams, SignListSortTypeParam, TradeTypeParam, type SignIdListParamsKeys } from "~/composables/home/service/_types";
import { PiniaHomeFilterMethods } from "../keys";



export const piniaFilterMethods = defineStore(PiniaHomeFilterMethods, () => {

    const filterParams = reactive<SignIdListParams>({
        digitalAssetsId: 0,
        signStatusType: 'all',
        sortType: 'updated',
        tradeType: 'all',
    });


    const changeFilterParams = (params: Partial<SignIdListParams>) => {
        if (params.digitalAssetsId !== undefined && !isNaN(Number(params.digitalAssetsId))) {
            filterParams.digitalAssetsId = Number(params.digitalAssetsId);
        }

        if (params.signStatusType !== undefined && params.signStatusType in SignStatusTypeParam) {
            filterParams.signStatusType = params.signStatusType;
        }

        if (params.sortType !== undefined && params.sortType in SignListSortTypeParam) {
            filterParams.sortType = params.sortType;
        }

        if (params.tradeType !== undefined && params.tradeType in TradeTypeParam) {
            filterParams.tradeType = params.tradeType;
        }
    }


    return {
        filterParams,
        changeFilterParams,
    }
})