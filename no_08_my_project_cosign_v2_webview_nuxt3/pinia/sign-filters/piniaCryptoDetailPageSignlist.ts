import type { CryptoDetailSignListParams } from "~/composables/coin/tab-contents/service/_types";
import { SignListSortTypeParam, SignStatusTypeParam, TradeTypeParam } from "~/composables/home/service/_types";
import { piniaSignlistLastFetchCheckValues } from "../coin/tab-contents/piniaSignlistLastFetchCheckValues";
import { PiniaCryptoDetailPageSignlist } from "../keys";



export const piniaCryptoDetailPageSignlist = defineStore(PiniaCryptoDetailPageSignlist, () => {
    const filterParams = reactive<CryptoDetailSignListParams>({
        tradeType: 'all',
        signStatusType: 'all',
        sortType: 'created',
    });


    const changeFilterParams = (params: Partial<CryptoDetailSignListParams>) => {
        if (params.tradeType !== undefined && params.tradeType in TradeTypeParam) {
            filterParams.tradeType = params.tradeType;
        }

        if (params.signStatusType !== undefined && params.signStatusType in SignStatusTypeParam) {
            filterParams.signStatusType = params.signStatusType;
        }

        if (params.sortType !== undefined && params.sortType in SignListSortTypeParam) {
            filterParams.sortType = params.sortType;
        }

        piniaSignlistLastFetchCheckValues().updatedSortTypeCreatedMoreParam(null);
    }


    return {
        filterParams,
        changeFilterParams,
    }
})