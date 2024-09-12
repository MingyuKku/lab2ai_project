import type { Options } from "~/plugins/api";
import type { ModelDetailSignlistParams, SignListRes } from "./_types";
import type { BasicRes } from "~/composables/_api/_types";
import { piniaDetailServiceData } from "~/pinia/aimodel/piniaDetailServiceData";
import { useFetchParams } from "../business/useFetchParams";

export const sortingTypeUpdated = async (
    key: string,
    serviceSignApiFetch: <BasicRes>(url: string, opts?: Options) => Promise<BasicRes>,
    modelId: string,
    params: ModelDetailSignlistParams,
    isRefreshed: boolean,
): Promise<SignListRes | null> => {
    
    const { data: cache } = useNuxtData<SignListRes>(key);
    // const { updateIsLastList, sortingUpdatedData, updatedSortingUpdateData } = piniaDetailServiceData();

    let returnData: SignListRes | null = null;
    // console.log('이힛', sortingUpdatedDateTime)
    try {

        if (cache.value) {
            const { signList } = cache.value;

            const {
                lastSignIds,
                dateTime
            } = useFetchParams().getUpdateParams(signList);


            if (!isRefreshed) {
                returnData = cache.value;
            } else {
                // 더보기 데이터 패치
                const { data } = await serviceSignApiFetch<BasicRes>(`sign/model-detail/sign-list/${params.sortType}/${modelId}`, {
                    method: 'POST',
                    credentials: 'include',
                    params: {
                        'signStatusType': params.signStatusType,
                        'dateTime': dateTime
                    },
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
            const { data } = await serviceSignApiFetch<BasicRes>(`sign/model-detail/sign-list/${params.sortType}/${modelId}`, {
                method: 'POST',
                credentials: 'include',
                params: {
                    'signStatusType': params.signStatusType
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