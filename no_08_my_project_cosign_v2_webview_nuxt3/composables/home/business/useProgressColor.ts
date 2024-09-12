import type { SignStatusType } from "~/composables/aimodel-detail/service/_types";
import type { TradeFuturesPositionType, EvaluateState } from "../service/_types";
import { isSignBlur } from "./_methods";

export function useProgressColor({
    evaluateState,
    tradeFuturesPositionType,
    isBlurComputed,
}:{
    evaluateState?: keyof typeof EvaluateState;
    tradeFuturesPositionType?: TradeFuturesPositionType,
    isBlurComputed: boolean;
}) {
    const leftBarBackgroundColor = computed(() => {
        if (evaluateState !== 'sell_wait3') {
            if (isBlurComputed) return 'bg-border-dark-02';
            if (tradeFuturesPositionType && tradeFuturesPositionType === 'SHORT') {
                return 'bg-position-short-gra';
            } else {
                return 'bg-position-long-gra';
            }
        } else {
            if (isBlurComputed) return 'bg-border-dark-02';
            if (tradeFuturesPositionType && tradeFuturesPositionType === 'SHORT') {
                return 'bg-position-short';
            } else {
                return 'bg-position-long';
            }
        }
    })
    
    const rightBarBackgroundColor = computed(() => {
        if (evaluateState === 'sell_wait3') {
            if (isBlurComputed) return 'bg-border-dark-02';
            if (tradeFuturesPositionType && tradeFuturesPositionType === 'SHORT') {
                return 'bg-position-short-gra';
            } else {
                return 'bg-position-long-gra';
            }
        } else {
            return 'bg-border-gray-05';
        }
    })

    
    return {
        leftBarBackgroundColor,
        rightBarBackgroundColor,
    }
}