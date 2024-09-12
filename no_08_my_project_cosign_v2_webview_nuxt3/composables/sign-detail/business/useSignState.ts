import type { SignStatusType } from "~/composables/aimodel-detail/service/_types"

export const useSignState = () => {

    /**
     * @returns 진입 실패일 경우 true 반환
     */
    const isBuyFail = (signStatusType: SignStatusType, earningRate?: number | null) => {
        if (signStatusType === 'END' && earningRate === null) return true;
        return false;
    }


    

    return {
        isBuyFail
    }
}