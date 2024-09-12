import type { BasicRes } from "~/composables/_api/_types";
import { type ModelDetailSignlistParams, type ModelProfileDetail, type RecentBestSignItems, type SignListRes } from "./_types";
import { sortingTypeCreated } from "./sortingCreated";
import { sortingTypeUpdated } from "./sortingUpdated";
import { sortingTypeEarningrRate } from "./sortingEarningrRate";
import { useInstance } from "~/composables/_api/useInstance";

export function useFetchAimodelDetail() {

    const { $serviceSignApiFetch } = useNuxtApp();


    const getModelDetail = async (key: string, modelId: string): Promise<ModelProfileDetail | null> => {
        try {
            const { data: cache } = useNuxtData<ModelProfileDetail>(key);

            if (cache.value) return cache.value;
            
            const { data } = await $serviceSignApiFetch<BasicRes>(`sign/model-detail/${modelId}`);

            if (!data || !data.modelDetail) return null;

            const { modelDetail }:{modelDetail: ModelProfileDetail} = data;
            // const instance = new ClassModelProfileDetail(modelDetail);
            // const { POJO } = useInstance();
            
            // return POJO<ClassModelProfileDetail>(instance);
            return modelDetail;

        } catch (err) {
            return null;
        }
    }


    const getModelDetailRecentBest = async (key: string, modelId: string): Promise<RecentBestSignItems[] | null> => {
        try {
            const { data: cache } = useNuxtData<RecentBestSignItems[]>(key);

            if (cache.value) return cache.value;
                
            const { data } = await $serviceSignApiFetch<BasicRes>(`sign/model-detail/recent-best-signs/${modelId}`);

            if (!data || !data.recentBestSignItems) return null;

            const { recentBestSignItems }:{recentBestSignItems: RecentBestSignItems[]} = data;
            return recentBestSignItems;

        } catch (err) {
            return null;
        }
    }

    
    const getModelDetailSignlist = async (key: string, params: ModelDetailSignlistParams, modelId: string, isRefreshed: boolean): Promise<SignListRes | null> => {
        if (params.sortType === 'created') {
            return sortingTypeCreated(key, $serviceSignApiFetch, modelId, params, isRefreshed);
        }
        if (params.sortType === 'updated') {
            return sortingTypeUpdated(key, $serviceSignApiFetch, modelId, params, isRefreshed);
        }
        if (params.sortType === 'earningRate') {
            return sortingTypeEarningrRate(key, $serviceSignApiFetch, modelId, params, isRefreshed);
        }
        return null;
    }


    const recentContents = ref<(RecentBestSignItems | string)[]>([]);

    const initRecentBest = (contents: RecentBestSignItems[] | null) => {
        if (!contents) return;
        
        recentContents.value = contents;
        
        if (
            contents.length === 1 ||
            contents.length === 3
        ) {
            recentContents.value.push('blank');
        }
    }


    return {
        getModelDetail,
        getModelDetailRecentBest,
        getModelDetailSignlist,
        recentContents,
        initRecentBest,
    }
}