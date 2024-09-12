import type { CryptoDetailPageQueryContentsType } from "../business/_types";
import type { CryptoDetailSignListParams, SignListResponse } from "./_types";
import { useQueryContentName } from "../business/useQueryContentName";
import { useFetchSortTypeEarning } from "./useFetchSortTypeEarning";
import { useFetchSortTypeTimes } from "./useFetchSortTypeTimes";
import { piniaCoinTabNav } from "~/pinia/coin/tab-contents/piniaCoinTabNav";

export const useFetchSignlist = () => {

    // const signs = ref<SignListResponse | null>(null);

    const { $serviceSignApiFetch } = useNuxtApp();


    const getCryptoDetailSignlist = async (
        key: string,
        // contentName: CryptoDetailPageQueryContentsType,
        params: CryptoDetailSignListParams,
        digitalAssetsId: number
    ): Promise<SignListResponse | null> => {
        // console.log('!!!!!')
        // const { activeTabIndex } = piniaCoinTabNav();
        // console.log('호호이', activeTabIndex)

        // console.log('히익', useQueryContentName().value)
        
        // if (dsds.value !== 'signs') return null;
        if (
            params.sortType === 'created' ||
            params.sortType === 'updated'
        ) {
            return useFetchSortTypeTimes(key, $serviceSignApiFetch, params, digitalAssetsId);
        }
        if (params.sortType === 'earningRate') {
            return useFetchSortTypeEarning(key, $serviceSignApiFetch, params, digitalAssetsId);
        }
        return null;
    }

    return {
        getCryptoDetailSignlist
    }
}