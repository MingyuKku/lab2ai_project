import type { ModelDetailSignlistParams } from "~/composables/aimodel-detail/service/_types";
import { SignListSortTypeParam, SignStatusTypeParam } from "~/composables/home/service/_types";
import { PiniaModelDetailFilterMethods } from "../keys";



export const piniaDetailFilterMethods = defineStore(PiniaModelDetailFilterMethods, () => {

    const filterParams = reactive<ModelDetailSignlistParams>({
        signStatusType: 'all',
        sortType: 'created',
    });


    const changeFilterParams = (params: Partial<ModelDetailSignlistParams>) => {
        if (params.signStatusType !== undefined && params.signStatusType in SignStatusTypeParam) {
            filterParams.signStatusType = params.signStatusType;
        }
            
        if (params.sortType !== undefined && params.sortType in SignListSortTypeParam) {
            filterParams.sortType = params.sortType;
        }
    }


    return {
        filterParams,
        changeFilterParams,
    }

})