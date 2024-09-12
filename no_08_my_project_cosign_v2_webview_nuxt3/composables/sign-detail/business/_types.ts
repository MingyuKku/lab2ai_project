import type { SignStatusType } from "~/composables/aimodel-detail/service/_types";
import type { EvaluateState, SimpleStatusType, TradeFuturesPositionType } from "~/composables/home/service/_types";

export interface UseSignOnStateHookParams {
    evaluateState?: keyof typeof EvaluateState;
    positionType?: TradeFuturesPositionType | null;
    signStatusType?: SignStatusType | SimpleStatusType;
}


const SignOnProgressLabel = {
    "start": "진입",
    "target1": "목표 1",
    "target2": "목표 2",
    "target3": "목표 3",
} as const;

export type SignOnProgressLabelKeyType = keyof typeof SignOnProgressLabel;
export type SignOnProgressLabelValueType = "예측시작" | typeof SignOnProgressLabel[keyof typeof SignOnProgressLabel];