import type { BasicRes } from "~/composables/_api/_types";
import { ClassHomeSignItem, type CryptoFilterItem, type HomeSignItem, type SignIdList, type SignIdListParams } from "./_types";
import { useInstance } from "~/composables/_api/useInstance";
import { piniaServiceData } from "~/pinia/home/piniaServiceData";


export function useFetchHome() {

    const { $serviceSignApiFetch } = useNuxtApp();
    

    /**
     * 홈화면 싸인리스트의 id만 받아오는 함수
     */
    const getHomeSignIdList = async (key: string, params: SignIdListParams): Promise<SignIdList | null> => {

        try {
            const { data: cache } = useNuxtData<SignIdList>(key);

            if (cache.value) return cache.value;

            const { data } = await $serviceSignApiFetch<BasicRes>(`sign/main/id-list`, {
                method: 'POST',
                credentials: 'include',
                params: params
            });
            

            if (!data || !data.signIdList) return null;

            const { signIdList }:{signIdList: SignIdList} = data;

            const { initSignIdList } = piniaServiceData();
            initSignIdList(signIdList);

            return signIdList;

        } catch (err) {
            console.log('getSignIdList err', err)
            return null;
        }
    }


    /**
     * 홈화면 싸인리스트의 id를 파라미터로 받아서 해당하는 싸인데이타를 반환하는 함수
     */
    const getHomeSignItemList = async (key: string, signIdList: SignIdList | null): Promise<ClassHomeSignItem[] | null> => {
        if (!signIdList || !signIdList.length) return null;

        try {
            const { startIndex, endIndex, isMore } = piniaServiceData();
            const { data: cache } = useNuxtData<ClassHomeSignItem[]>(key);

            if (!isMore) {
                // 최초 패치 or 필터 리프레시 패치
                if (cache.value) return cache.value;

                const { data } = await $serviceSignApiFetch<BasicRes>(`sign/main`, {
                    method: 'POST',
                    credentials: 'include',
                    body: signIdList.slice(startIndex, endIndex)
                });
    
                if (!data || !data.signItemList) return null;

                const { POJO, numberFormat } = useInstance();
                    
                const { signItemList }:{ signItemList: HomeSignItem[] } = data;
                const instance = signItemList.map(sign => new ClassHomeSignItem(sign, numberFormat));
                return POJO<ClassHomeSignItem[]>(instance);

            } else {
                // 더보기 패치
                const { data } = await $serviceSignApiFetch<BasicRes>(`sign/main`, {
                    method: 'POST',
                    credentials: 'include',
                    body: signIdList.slice(startIndex, endIndex)
                });
    
                if (!data || !data.signItemList) return null;

                const { POJO, numberFormat } = useInstance();
                
                const { signItemList }:{ signItemList: HomeSignItem[] } = data;
                const instance = signItemList.map(sign => new ClassHomeSignItem(sign, numberFormat));

                if (!cache.value) return POJO<ClassHomeSignItem[]>(instance);

                cache.value = cache.value.concat(instance);
                return cache.value;
            }

        } catch (err) {
            return null;
        }
    }



    return {
        getHomeSignIdList,
        getHomeSignItemList,
    }
}