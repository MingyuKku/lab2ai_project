import type { BasicRes } from "~/composables/_api/_types";
import type { BestPredictionModel, ModelListParams, PredictionModelItem } from "./_types";


export function useFetchAimodel() {

    const { $serviceSignApiFetch } = useNuxtApp();

    const getBestModelList = async (key: string): Promise<BestPredictionModel[] | null> => {
        try {
            const { data: cache } = useNuxtData(key);

            if (cache.value) return cache.value;

            const { data } = await $serviceSignApiFetch<BasicRes>(`sign/model-list/best`, {
                method: 'GET',
                credentials: 'include'
            });

            if (!data || !data.bestTopModels) return null;

            const { bestTopModels }: {bestTopModels: BestPredictionModel[]} = data;
            // console.log('응답', bestTopModels)
            return bestTopModels;

        } catch (err) {
            return null;
        }
    }


    const getModelList = async (key: string, params: ModelListParams): Promise<PredictionModelItem[] | null> => {
        try {
            const { data: cache } = useNuxtData<PredictionModelItem[]>(key);

            if (cache.value) return cache.value;
                
            const { data } = await $serviceSignApiFetch<BasicRes>(`sign/model-list`, {
                method: 'POST',
                credentials: 'include',
                params: params
            });

            if (!data || !data.modelList) return null;

            const { modelList }: {modelList: PredictionModelItem[]} = data;
            return modelList;


        } catch (err) {
            return null;
        }
    }


    return {
        getBestModelList,
        getModelList
    }
}