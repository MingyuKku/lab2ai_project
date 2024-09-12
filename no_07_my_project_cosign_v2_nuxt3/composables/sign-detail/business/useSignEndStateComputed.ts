import type { EvaluateState } from "~/composables/home/service/_types";

/**
 * 종료된 싸인에 대한 상태계산
 */
export const useSignEndStateComputed = (evaluateState: keyof typeof EvaluateState) => {

    /**
     * 목표가1 도달, 2도달, 3도달 모두 해당
     */
    const isTarget1Pass = () => (
        evaluateState === 'sell_success' ||
        evaluateState === 'sell_success2' ||
        evaluateState === 'sell_success3'
    );

    /**
     * 목표가 2도달, 3도달에 해당
     */
    const isTarget2Pass = () => (
        evaluateState === 'sell_success2' ||
        evaluateState === 'sell_success3'
    );

    /**
     * 목표가 3도달에만 해당
     */
    const isTarget3Pass = () => evaluateState === 'sell_success3';

    /**
     * 진입 성공했는지
     */
    const isBuySuccess = () => (
        evaluateState === 'sell_fail' ||
        isTarget1Pass()
    );


    return {
        isTarget1Pass,
        isTarget2Pass,
        isTarget3Pass,
        isBuySuccess,
    }
}
