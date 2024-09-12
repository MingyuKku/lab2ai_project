import type { Options } from "~/plugins/api";
import type { CryptoDetailSignListParams, SignListResponse } from "./_types";
import type { BasicRes } from "~/composables/_api/_types";
import { piniaSignlistLastFetchCheckValues } from "~/pinia/coin/tab-contents/piniaSignlistLastFetchCheckValues";

export const useFetchSortTypeEarning = async (
    key: string,
    serviceSignApiFetch: <BasicRes>(url: string, opts?: Options) => Promise<BasicRes>,
    params: CryptoDetailSignListParams,
    digitalAssetsId: number
): Promise<SignListResponse | null> => {
    
    const { data: cache } = useNuxtData(key);
    const { sortingEarningRateData, updatedSortingEarningRateData } = piniaSignlistLastFetchCheckValues();

    let returnData: SignListResponse | null = null;
    const pathSignStatus = sortingEarningRateData.isBuyFail ? 'buyFail' : 'earning';

    const apiParam = sortingEarningRateData.isBuyFail ? {
        'tradeType': params.tradeType,
        'signStatusType': params.signStatusType,
        'subSeqId': sortingEarningRateData.subSeqId
    } : {
        'tradeType': params.tradeType,
        'signStatusType': params.signStatusType,
        'earningRate': sortingEarningRateData.earningRate
    }
    
    try {
        if (sortingEarningRateData.earningRate === null) {
            // 최초 데이터 패치
            if (cache.value) return cache.value;
                
            const { data } = await serviceSignApiFetch<BasicRes>(`sign/crypto-detail/sign-list/${params.sortType}/${digitalAssetsId}/${pathSignStatus}`, {
                method: 'POST',
                credentials: 'include',
                params: apiParam,
                body: []
            });

            if (data && data.signListResponse) {
                const { signListResponse }:{signListResponse: SignListResponse} = data;
                returnData = signListResponse;
            }
        }

        if (sortingEarningRateData.earningRate !== null){
            // 더보기 데이터 패치
            const { data } = await serviceSignApiFetch<BasicRes>(`sign/crypto-detail/sign-list/${params.sortType}/${digitalAssetsId}/${pathSignStatus}`, {
                method: 'POST',
                credentials: 'include',
                params: apiParam,
                body: sortingEarningRateData.signIds
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

        updatedSortingEarningRateData(returnData);

        return returnData;

    } catch (err) {
        return null;
    }
}