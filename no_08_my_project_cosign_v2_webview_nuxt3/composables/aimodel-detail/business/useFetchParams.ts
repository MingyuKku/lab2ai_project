import type { SignList } from "../service/_types";

export const useFetchParams = () => {

    const getUpdateParams = (signList: SignList[]) => {
        const lastSign = signList[signList.length - 1];
        const getSameAllLastTimeSignIds = () => {
            return signList.filter(sign => sign.updatedAt === lastSign.updatedAt).map(sign => sign.signId);
        }

        const lastSignIds = getSameAllLastTimeSignIds();
        const dateTime = lastSign.updatedAt;

        return {
            lastSignIds,
            dateTime
        }
    }


    const getEarningRateParams = (signList: SignList[]) => {
        const lastSign = signList[signList.length - 1];

        const getSameAllLastTimeSignIds = () => {
            return signList.filter(sign => (sign.earningRate ?? lastSign.targetEarningRate) === (lastSign.earningRate ?? lastSign.targetEarningRate)).map(sign => sign.signId);
        }

        let isBuyFail = false;
        
        if (lastSign.signStatusType === 'END' && lastSign.earningRate === null) {
            isBuyFail = true;
        }
        else {
            if (isBuyFail) isBuyFail = false;
        }

        const lastSignIds = isBuyFail ? [] : getSameAllLastTimeSignIds();
        const lastSeqId = lastSign.subSeqId;
        const earningRate = lastSign.earningRate ?? lastSign.targetEarningRate;
        

        return {
            lastSignIds,
            lastSeqId,
            earningRate,
            isBuyFail,
        }
    }

    return {
        getUpdateParams,
        getEarningRateParams
    }
}