import type { BasicRes } from "~/composables/_api/_types";
import type { CryptoFilterItem, CryptoListReactiveData } from "./_types";
import { HOME_CRYPTO_FILTER_LIST } from "~/composables/_app/asyncDataFetchKeys";

export const useCryptoList = async () => {
    
    const { $serviceSignApiFetch } = useNuxtApp();

    const cryptoList = reactive<CryptoListReactiveData>({
        total: [],
        view: []
    })

    /**
     * 홈화면 싸인리스트의 필터 중 코인 종류 필터를 하기 위해 서버로부터 홈피드에 노출중인 코인 리스트를 받아오는 함수 
     */
    const getHomeCryptoList = async (key: string): Promise<CryptoFilterItem[] | null> => {
        
        try {
            const { data: cache } = useNuxtData(key);

            if (cache.value) return cache.value;
                
            const { data } = await $serviceSignApiFetch<BasicRes>(`sign/main/coin-list`);

            if (!data || !data.coinList) return [];
            
            const { coinList }:{ coinList: CryptoFilterItem[] } = data;
            return coinList;

        } catch (err) {
            return [];
        }
    }


    const initCryptoList = (list: CryptoFilterItem[] | null) => {
        if (!list) return;

        cryptoList.total = list;

        if (list.length >= 5) {
            cryptoList.view = list.slice(0,4);
        } else {
            cryptoList.view = list;
        }
    }


    const updateCryptoViewList = (digitalAssetsId: number) => {
        const fineView = cryptoList.view.find(item => item.digitalAssetsId === digitalAssetsId);
        if (fineView) return;

        const fineItem = cryptoList.total.find(item => item.digitalAssetsId === digitalAssetsId);
        if (!fineItem) return;

        cryptoList.view.unshift(fineItem);
        cryptoList.view.pop();
    }

    
    const {
        data,
    } = await useAsyncData(HOME_CRYPTO_FILTER_LIST, () => getHomeCryptoList(HOME_CRYPTO_FILTER_LIST));
    initCryptoList(data.value);


    return {
        cryptoList,
        getHomeCryptoList,
        updateCryptoViewList,
    }
}