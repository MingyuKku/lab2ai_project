import type { SignListRes } from "~/composables/aimodel-detail/service/_types";
import type { EarningRateData, UpdatedData } from "./_types";
import { PiniaModelDetailServiceData } from "../keys";



export const piniaDetailServiceData = defineStore(PiniaModelDetailServiceData, () => {
    
    const lastSubSeqId = ref<number | null>(null);

    const updateLastSubSeqId = (signList: SignListRes | null) => {
        if (signList === null) {
            lastSubSeqId.value = null;
            return;
        } else {
            if (!signList || signList.isLast) return;
        }
        
        const lastSign = signList.signList[signList.signList.length - 1];
        lastSubSeqId.value = lastSign.subSeqId;
    }



    const sortingUpdatedData = reactive<UpdatedData>({
        dateTime: null,
        signIds: []
    })

    const updatedSortingUpdateData = (signList: SignListRes | null) => {
        if (signList === null) {
            sortingUpdatedData.dateTime = null;
            sortingUpdatedData.signIds = [];
            return;
        } else {
            if (!signList || signList.isLast) return;
        }

        const lastSign = signList.signList[signList.signList.length - 1];
        const getSameAllLastTimeSignIds = () => {
            return signList.signList.filter(sign => sign.updatedAt === lastSign.updatedAt).map(sign => sign.signId);
        }

        const lastSignIds = getSameAllLastTimeSignIds();
        sortingUpdatedData.dateTime = lastSign.updatedAt;
        sortingUpdatedData.signIds = lastSignIds;
    }


    
    const sortingEarningRateData = reactive<EarningRateData>({
        subSeqId: null,
        earningRate: null,
        signIds: [],
        isBuyFail: false,
    })



    const updatedSortingEarningRateData = (signList: SignListRes | null) => {
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
        updateLastSubSeqId(null);
        updatedSortingUpdateData(null);
        updatedSortingEarningRateData(null);
    }



    return {
        lastSubSeqId,
        updateLastSubSeqId,
        sortingUpdatedData,
        updatedSortingUpdateData,
        sortingEarningRateData,
        updatedSortingEarningRateData,
        clearSortingData,
    }
})