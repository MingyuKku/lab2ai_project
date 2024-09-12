import type { EvaluateState } from "~/composables/home/service/_types";
import type { ClassSignDetailInfo } from "../service/_types";

export const useEarlyEndSign = (evaluateState: keyof typeof EvaluateState) => {

    /**
     * 조기 종료일 경우 true 반환
     */
    const isEarlyEnd = computed(() => {
        if (
            evaluateState === 'sell_success3' ||
            evaluateState === 'buy_fail' ||
            evaluateState === 'cut'
        ) {
            return true;
        }

        return false;
    })

    const targetText = computed(() => {
        if (evaluateState === 'sell_success3') return '목표 3에 도달하여'
        if (evaluateState === 'buy_fail') return '진입가에 도달하지 못하여'
        if (evaluateState === 'cut') return '손절가에 도달하여'
    })
    
    
    return {
        isEarlyEnd,
        targetText,
    }
}