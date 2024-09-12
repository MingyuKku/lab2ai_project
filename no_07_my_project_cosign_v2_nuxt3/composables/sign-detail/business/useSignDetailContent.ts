import type { SignDetailContent } from "../service/_types";

export const useSignDetailContent = (signDetailContent: SignDetailContent | null) => {
    const isSignDetailContent = computed(() => (
        signDetailContent && 
        signDetailContent.modelTopsEarningRateResponse.modelEarningRateItems.length >= 3 && // 컨텐츠 갯수가 3개 이상일때만 의미가 있음
        signDetailContent.targetModelSuccessEarningRate > 0
    ))
    
    const SignDetailContentTitle = computed(() => {
        if (!signDetailContent) return;
        return (
            signDetailContent.digitalAssetsRecentSuccessEarningCount > 0
            ? `
                <h1 class='text-h4'>최근 10일,
                ${signDetailContent.modelTopsEarningRateResponse.digitalAssetsCode}에서
                <span class='text-price-profit'>${signDetailContent.digitalAssetsRecentSuccessEarningCount}번</span> 수익 실현!</h1>
            `
            : undefined
        )
    })

    return {
        isSignDetailContent,
        SignDetailContentTitle,
    }
}