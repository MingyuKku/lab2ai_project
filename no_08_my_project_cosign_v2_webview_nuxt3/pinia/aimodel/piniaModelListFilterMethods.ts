import { StatPeriodTypeParam, type ModelListParams, ModelListSortTypeParam } from "~/composables/aimodel/service/_types";
import { TradeTypeParam } from "~/composables/home/service/_types";
import { PiniaModelListFilterMethods } from "../keys";



export const piniaModelListFilterMethods = defineStore(PiniaModelListFilterMethods, () => {

    const filterParams = reactive<ModelListParams>({
        sortType: 'earningRate',
        statPeriodType: 'total',
        tradeType: 'all',
    });


    const changeFilterParams = (params: Partial<ModelListParams>) => {
        if (params.statPeriodType !== undefined && params.statPeriodType in StatPeriodTypeParam) {
            filterParams.statPeriodType = params.statPeriodType;
        }

        if (params.sortType !== undefined && params.sortType in ModelListSortTypeParam) {
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