import type { UseIntersectionObserverType } from "./_types";
import { piniaServiceData } from "~/pinia/home/piniaServiceData";
import { useUpbitSocket } from "./useUpbitSocket";
import { useBinanceSocket } from "./useBinanceSocket";

export function useIntersectionObserver({
    digitalAssetsCode,
    type,
    isLastEl,
    signItemListRefresh
}: UseIntersectionObserverType) {


    const { upbitSocket } = useUpbitSocket(digitalAssetsCode);
    const { connectBinance, binanceSocket, binanceUiData } = useBinanceSocket(digitalAssetsCode);
    
    let intersectObserver: IntersectionObserver | null = null;


    /**
     * 홈화면의 싸인리스트 DOM 아이템이 뷰포트 노출/비노출을 감시하기 위해 IntersectionObserver API를 실행하는 함수
     */
    const initIntersectObserver = async (dom: HTMLElement | null) => {
        if (!dom) return;

        const intersectOpt: IntersectionObserverInit  = {
            root: null,
            threshold: 0,
            // rootMargin: `${paddingNodes * cardHeight.value}px 0px`, 
        }

        const handleIntersect: IntersectionObserverCallback = async (entries) => {
            for (const entrie of entries) {
                const target = entrie.target as HTMLElement;
    
                if (entrie.isIntersecting) {
                    // 화면에 노출될 때
                    // if (type === 'UPBIT') connectUpbit();

                    if (type === 'BINANCE') connectBinance();
                    
                    // 라스트 아이템 -> 아이템 더보기
                    if (isLastEl && signItemListRefresh) {
                        intersectObserver?.unobserve(target);

                        const { setSignIdListIndex, endIndex, isLast, seIsMore } = piniaServiceData();
                        
                        if (isLast) return;

                        seIsMore(true);
                        setSignIdListIndex(endIndex);
                        await signItemListRefresh();
                        seIsMore(false);
                    }
    
                } else {
                    // 화면에서 사라질 때
                    // itemData.showFlag = false;
                    // if (type === 'upbit') upbitSocket.value?.close();

                    if (type === 'binance') binanceSocket.value?.close();
                }
            }
        }
        
        intersectObserver = new IntersectionObserver(handleIntersect, intersectOpt);

        await nextTick();
        intersectObserver?.observe(dom);
        // itemData.virtualHeight = dom.offsetHeight;
    }



    onUnmounted(() => {
        intersectObserver?.disconnect();
    })

    return {
        initIntersectObserver,
        binanceUiData,
    }
}