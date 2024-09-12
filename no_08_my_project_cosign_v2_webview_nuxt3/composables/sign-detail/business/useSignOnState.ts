import type { SignOnProgressLabelKeyType, SignOnProgressLabelValueType, UseSignOnStateHookParams } from "./_types"

export const useSignOnState = ({ evaluateState, positionType, signStatusType }: UseSignOnStateHookParams) => {

    /**
     * 싸인이 진입가에 도달했는지
     * @returns 진입 성공시 true 반환
     */
    const isSuccessEnter = () => (
        evaluateState === 'sell_wait' ||
        evaluateState === 'sell_wait2' ||
        evaluateState === 'sell_wait3'
    )

    /**
     * 싸인이 목표가1 도달했는지
     * @returns 진입 성공시 true 반환
     */
    const isSuccessTarget1 = () => (
        evaluateState === 'sell_wait2' ||
        evaluateState === 'sell_wait3'
    )

    /**
     * 싸인이 목표가2 도달했는지
     * @returns 진입 성공시 true 반환
     */
    const isSuccessTarget2 = () => (evaluateState === 'sell_wait3')


    const getProgressLabel = (target: SignOnProgressLabelKeyType): SignOnProgressLabelValueType | undefined => {

        if (target === 'start') {
            if (isSuccessEnter()) {
                return '진입';
            } else {
                return '예측시작'
            }
        }

        if (target === 'target1') {
            if (isSuccessEnter()) {
                return '목표 1';
            } else {
                return '진입';
            }
        }
        if (target === 'target2') {
            if (isSuccessEnter()) {
                return '목표 2';
            } else {
                return '목표 1';
            }
        }
        if (target === 'target3') {
            if (isSuccessEnter()) {
                return '목표 3';
            } else {
                return '목표 2';
            }
        }
    }


    const getProgressLabelStyleClass = (target: SignOnProgressLabelKeyType): string | undefined => {
        if (target === 'start') {
            return 'text-font-black border-border-dark-01';
        }

        if (target === 'target1') {
            if (isSuccessTarget1()) {
                if (!positionType || positionType === 'LONG') return 'text-position-long border-position-long-goal-1';
                if (positionType === 'SHORT') return 'text-position-short border-position-short-goal-1';
            }
            if (isSuccessEnter()) {
                if (!positionType || positionType === 'LONG') return 'text-font-dark-03 border-position-long-goal-1';
                if (positionType === 'SHORT') return 'text-font-dark-03 border-position-short-goal-1';
            } else {
                return 'text-font-dark-03 border-border-dark-01';
            }
        }

        if (target === 'target2') {
            if (isSuccessTarget2()) {
                if (!positionType || positionType === 'LONG') return 'text-position-long border-position-long-goal-2';
                if (positionType === 'SHORT') return 'text-position-short border-position-short-goal-2';
            }
            if (isSuccessTarget1()) {
                if (!positionType || positionType === 'LONG') return 'text-font-dark-03 border-position-long-goal-2';
                if (positionType === 'SHORT') return 'text-font-dark-03 border-position-short-goal-2';
            }
            return 'text-font-dark-03 border-border-dark-03';
        }

        if (target === 'target3') {
            if (isSuccessTarget2()) {
                if (!positionType || positionType === 'LONG') return 'text-font-dark-03 border-position-long-goal-3';
                if (positionType === 'SHORT') return 'text-font-dark-03 border-position-short-goal-3';
            }
            return 'text-font-dark-03 border-border-dark-03';
        }
    }


    const filledArrowStyleClass = (target: SignOnProgressLabelKeyType): string | undefined => {
        if (target === 'start') {
            if (isSuccessTarget1()) {
                if (!positionType || positionType === 'LONG') return 'text-position-long';
                if (positionType === 'SHORT') return 'text-position-short';
            }

            if (!positionType || positionType === 'LONG') return 'long-progressbar-color-change-animation';
            if (positionType === 'SHORT') return 'short-progressbar-color-change-animation';
            // if (isSuccessEnter()) {
            //     if (!positionType || positionType === 'LONG') return 'long-progressbar-color-change-animation';
            //     if (positionType === 'SHORT') return 'short-progressbar-color-change-animation';
            // }
            // return 'text-border-gray-02';
        }

        if (target === 'target1') {
            if (isSuccessTarget2()) {
                if (!positionType || positionType === 'LONG') return 'text-position-long';
                if (positionType === 'SHORT') return 'text-position-short';
            }
            if (isSuccessTarget1()) {
                if (!positionType || positionType === 'LONG') return 'long-progressbar-color-change-animation';
                if (positionType === 'SHORT') return 'short-progressbar-color-change-animation';
            }
            return 'text-border-gray-02';
        }

        if (target === 'target2') {
            if (isSuccessTarget2()) {
                if (!positionType || positionType === 'LONG') return 'long-progressbar-color-change-animation';
                if (positionType === 'SHORT') return 'short-progressbar-color-change-animation';
            }
            return 'text-border-gray-02';
        }
    }


    return {
        isSuccessEnter,
        isSuccessTarget1,
        isSuccessTarget2,
        getProgressLabel,
        getProgressLabelStyleClass,
        filledArrowStyleClass,
    }
}