import type { SignListResponse } from "~/composables/coin/tab-contents/service/_types";
import type { SignListSortTypeParam, SignListSortTypeParamType } from "~/composables/home/service/_types";
import type { EarningRateData, UpdatedData } from "~/pinia/aimodel/_types";
import { PiniaSignlistLastFetchCheckValues } from "~/pinia/keys";



export const piniaSignlistLastFetchCheckValues = defineStore(PiniaSignlistLastFetchCheckValues, () => {
    
    const sortTypeCreatedMoreParam = reactive<UpdatedData>({
        dateTime: null,
        signIds: []
    })

    const updatedSortTypeCreatedMoreParam = (signList: SignListResponse | null, sortTime?: SignListSortTypeParamType) => {
        if (signList === null) {
            sortTypeCreatedMoreParam.dateTime = null;
            sortTypeCreatedMoreParam.signIds = [];
            return;
        } else {
            if (!signList || signList.isLast) return;
        }

        const lastSign = signList.signList[signList.signList.length - 1];
        const getSameAllLastTimeSignIds = () => {
            if (sortTime === 'created') return signList.signList.filter(sign => sign.createdAt === lastSign.createdAt).map(sign => sign.signId);
            if (sortTime === 'updated') return signList.signList.filter(sign => sign.updatedAt === lastSign.updatedAt).map(sign => sign.signId);
        }

        const lastSignIds = getSameAllLastTimeSignIds();
        sortTypeCreatedMoreParam.dateTime = lastSign.updatedAt;
        sortTypeCreatedMoreParam.signIds = lastSignIds ? lastSignIds : [];
    }



    const sortingEarningRateData = reactive<EarningRateData>({
        subSeqId: null,
        earningRate: null,
        signIds: [],
        isBuyFail: false,
    })


    const updatedSortingEarningRateData = (signList: SignListResponse | null) => {
        if (signList === null) {
            sortingEarningRateData.earningRate = null;
            sortingEarningRateData.signIds = [];
            sortingEarningRateData.subSeqId = null;
            sortingEarningRateData.isBuyFail = false;
            return;
        } else {
            if (!signList || signList.isLast) return;
        }

        const lastSign = signList.signList[signList.signList.length - 1];
        const getSameAllLastTimeSignIds = () => {
            return signList.signList.filter(sign => (sign.earningRate ?? lastSign.targetEarningRate) === (lastSign.earningRate ?? lastSign.targetEarningRate)).map(sign => sign.signId);
        }

        const lastSignIds = getSameAllLastTimeSignIds();
        sortingEarningRateData.earningRate = lastSign.earningRate ?? lastSign.targetEarningRate;
        sortingEarningRateData.signIds = lastSignIds;
        sortingEarningRateData.subSeqId = lastSign.subSeqId;

        // 수익률 정렬시 'buy_fail' : '진입실패'의 경우는 수익률이 null이기 때문에 api호출할 때 path url의 변화를 줘야 함
        if (lastSign.signStatusType === 'END' && lastSign.earningRate === null) {
            sortingEarningRateData.isBuyFail = true;
        }
        else {
            if (sortingEarningRateData.isBuyFail) sortingEarningRateData.isBuyFail = false;
        }
    }


    const clearSortingData = () => {
        updatedSortTypeCreatedMoreParam(null);
        updatedSortingEarningRateData(null);
    }
    

    return {
        sortTypeCreatedMoreParam,
        updatedSortTypeCreatedMoreParam,
        sortingEarningRateData,
        updatedSortingEarningRateData,
        clearSortingData,
    }
})