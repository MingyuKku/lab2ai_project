import type { Options } from "~/plugins/api";
import type { CryptoDetailSignListParams, SignListResponse } from "./_types";
import type { BasicRes } from "~/composables/_api/_types";
import { piniaSignlistLastFetchCheckValues } from "~/pinia/coin/tab-contents/piniaSignlistLastFetchCheckValues";

export const useFetchSortTypeTimes = async (
    key: string,
    serviceSignApiFetch: <BasicRes>(url: string, opts?: Options) => Promise<BasicRes>,
    params: CryptoDetailSignListParams,
    digitalAssetsId: number
): Promise<SignListResponse | null> => {

    const { data: cache } = useNuxtData<SignListResponse>(key);

    const {
        sortTypeCreatedMoreParam, updatedSortTypeCreatedMoreParam
    } = piniaSignlistLastFetchCheckValues();

    let returnData: SignListResponse | null = null;
    
    try {
        if (sortTypeCreatedMoreParam.dateTime === null) {
            // 최초 데이터 패치
            if (cache.value) return cache.value;

            const { data } = await serviceSignApiFetch<BasicRes>(`sign/crypto-detail/sign-list/${params.sortType}/${digitalAssetsId}`, {
                method: 'POST',
                credentials: 'include',
                params: {
                    'tradeType': params.tradeType,
                    'signStatusType': params.signStatusType
                },
                body: []
            });
            
            if (data && data.signListResponse) {
                const { signListResponse }:{signListResponse: SignListResponse} = data;
                returnData = signListResponse;
            }
        }

        if (sortTypeCreatedMoreParam.dateTime !== null){
            // 더보기 데이터 패치
            if (cache.value && cache.value.isLast) return cache.value;

            const { data } = await serviceSignApiFetch<BasicRes>(`sign/crypto-detail/sign-list/${params.sortType}/${digitalAssetsId}`, {
                method: 'POST',
                credentials: 'include',
                params: {
                    'tradeType': params.tradeType,
                    'signStatusType': params.signStatusType,
                    'dateTime': sortTypeCreatedMoreParam.dateTime
                },
                body: sortTypeCreatedMoreParam.signIds
            });

            if (data && data.signListResponse) {
                const { signListResponse }: {signListResponse: SignListResponse} = data;

                if (cache.value) {
                    cache.value.isLast = signListResponse.isLast;
                    cache.value.signList = cache.value.signList.concat(signListResponse.signList);

                    returnData = cache.value;

                } else {
                    returnData = signListResponse;
                }
                
            } else {
                returnData = cache.value;
            }
        }

        updatedSortTypeCreatedMoreParam(returnData, params.sortType);

        return returnData;

    } catch (err) {
        return null;
    }
}