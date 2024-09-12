import type { HomeSignItem, EvaluateState } from "../service/_types";

export function useFuctions(evaluateState?: keyof typeof EvaluateState) {

    /**
     * 진입전 / 진입성공 / 목표가1도달 전
     */
    const isBeforeTarget = () => {
        return (
            !evaluateState ||
            evaluateState === 'buy_wait' || 
            evaluateState === 'sell_wait'
        )
    }

    /**
     * 목표가1 도달 ~목표가2 대기
     */
    const isWaitTarget2 = () => {
        return (
            evaluateState === 'sell_wait2'
        )
    }

    /**
     * 목표가2 도달 ~목표가3 대기
     */
    const isWaitTarget3 = () => {
        return (
            evaluateState === 'sell_wait3'
        )
    }


    /**
     * 종료된 SIGN 중 수익 달성한 경우
     */
    const isEarningSell = () => {
        return (
            evaluateState === 'sell_fail' || 
            evaluateState === 'sell_success' || 
            evaluateState === 'sell_success2' || 
            evaluateState === 'sell_success3'
        )
    }
    

    return {
        isBeforeTarget,
        isWaitTarget2,
        isWaitTarget3,
        isEarningSell,
    }
}