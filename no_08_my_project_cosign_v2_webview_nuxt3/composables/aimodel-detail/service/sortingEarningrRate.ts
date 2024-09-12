import type { Options } from "~/plugins/api";
import type { ModelDetailSignlistParams, SignListRes } from "./_types";
import type { BasicRes } from "~/composables/_api/_types";
import { piniaDetailServiceData } from "~/pinia/aimodel/piniaDetailServiceData";
import { useFetchParams } from "../business/useFetchParams";

export const sortingTypeEarningrRate = async (
    key: string,
    serviceSignApiFetch: <BasicRes>(url: string, opts?: Options) => Promise<BasicRes>,
    modelId: string,
    params: ModelDetailSignlistParams,
    isRefreshed: boolean,
): Promise<SignListRes | null> => {
    
    const { data: cache } = useNuxtData<SignListRes>(key);
    // const { updateIsLastList, sortingEarningRateData, updatedSortingEarningRateData } = piniaDetailServiceData();

    let returnData: SignListRes | null = null;
    
    try {

        if (cache.value) {
            const { signList } = cache.value;

            const {
                lastSignIds,
                lastSeqId,
                earningRate,
                isBuyFail,
            } = useFetchParams().getEarningRateParams(signList);

            // 수익률 정렬시 'buy_fail' : '진입실패'의 경우는 수익률이 null이기 때문에 api호출할 때 path url의 변화를 줘야 함
            const pathSignStatus = isBuyFail ? 'buyFail' : 'earning';

            const apiParam = isBuyFail ? {
                'signStatusType': params.signStatusType,
                'subSeqId': lastSeqId
            } : {
                'signStatusType': params.signStatusType,
                'earningRate': earningRate
            }

            if (!isRefreshed) {
                returnData = cache.value;
            } else {
                // 더보기 데이터 패치
                const { data } = await serviceSignApiFetch<BasicRes>(`sign/model-detail/sign-list/${params.sortType}/${modelId}/${pathSignStatus}`, {
                    method: 'POST',
                    credentials: 'include',
                    params: apiParam,
                    body: lastSignIds
                });
    
                if (data && data.signList) {
                    const { signList }: {signList: SignListRes} = data;
    
                    if (cache.value) {
                        cache.value.isLast = signList.isLast;
                        cache.value.signList = cache.value.signList.concat(signList.signList);
    
                        returnData = cache.value;
    
                    } else {
                        returnData = signList;
                    }
                    
                } else {
                    returnData = cache.value;
                }
            }

            

        } else {
            // 최초 데이터 패치
            const { data } = await serviceSignApiFetch<BasicRes>(`sign/model-detail/sign-list/${params.sortType}/${modelId}/${'earning'}`, {
                method: 'POST',
                credentials: 'include',
                params: {
                    'signStatusType': params.signStatusType,
                    'earningRate': null
                },
                body: []
            });

            if (data && data.signList) {
                const { signList }: {signList: SignListRes} = data;
                returnData = signList;
            }
        }

        return returnData;

    } catch (err) {
        return null;
    }
}