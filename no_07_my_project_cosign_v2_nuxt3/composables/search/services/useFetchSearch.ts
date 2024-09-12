import type { BasicRes } from "~/composables/_api/_types";
import { ClassSearchItem, type SearchItem } from "./_types";
import { useInstance } from "~/composables/_api/useInstance";
import { ALL_CRYPTO_LIST } from "~/composables/_app/asyncDataFetchKeys";

export const useFetchSearch = async () => {
    
    const totalList = ref<ClassSearchItem[] | null>(null);
    const searchResultList = ref<ClassSearchItem[]>([]);

    const getCosignAllCryptoList = async (key: string): Promise<ClassSearchItem[] | null> => {
        const { $serviceContentApiFetch } = useNuxtApp();
        const { POJO } = useInstance();

        try {
            const { data: cache } = useNuxtData(key);

            if (cache.value) return cache.value;

            const { data } = await $serviceContentApiFetch<BasicRes>(`search`);

            if (!data && !data.search) return null;

            const { search }:{search: SearchItem[]} = data;

            const instance = search.map((item) => new ClassSearchItem(item));
            return POJO<ClassSearchItem[]>(instance);

        } catch (err) {
            return null;
        }
    }

    const initTotalCryptoList = (list: ClassSearchItem[] | null) => {
        if (!list) return;

        totalList.value = list;
    }

    
    const {
        data: totalCryptoList,
        pending,
        status,
        refresh
    } = await useAsyncData(
        ALL_CRYPTO_LIST,
        () => getCosignAllCryptoList(ALL_CRYPTO_LIST)
    )
    initTotalCryptoList(totalCryptoList.value);


    const updateSearchResultList = (list: ClassSearchItem[]) => {
        searchResultList.value = list;
    }

    return {
        totalList,
        searchResultList,
        updateSearchResultList,
    }
}