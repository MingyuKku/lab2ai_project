import { piniaDetailServiceData } from "~/pinia/aimodel/piniaDetailServiceData";

export function useIntersectObserver() {
    // let intersectObserver: IntersectionObserver | null = null;
    const intersectObserver = ref<IntersectionObserver | null>(null);

    /**
     * 홈화면의 싸인리스트 DOM 아이템이 뷰포트 노출/비노출을 감시하기 위해 IntersectionObserver API를 실행하는 함수
     */
    const initIntersectObserver = async (dom: HTMLElement | null, moreRefresh: () => Promise<void>, updateSignlistRefreshed?: (value: boolean) => void) => {
        if (!dom) return;

        const intersectOpt: IntersectionObserverInit  = {
            root: null,
            threshold: 0,
            // threshold: [0, 0.2],
        }

        const handleIntersect: IntersectionObserverCallback = async (entries) => {
            for (const entrie of entries) {
                const target = entrie.target as HTMLElement;
    
                // console.log('인터섹션', cardHeight.value, entrie.isIntersecting, entrie.target)
                if (entrie.isIntersecting) {
                    // 화면에 노출될 때

                    if (updateSignlistRefreshed) updateSignlistRefreshed(true); // 싸인리스트 더보기 refresh호출 조건 => true
                    // intersectObserver?.unobserve(target);
                    intersectObserver.value?.unobserve(target);
                    moreRefresh();
                }
            }
        }
        
        intersectObserver.value = new IntersectionObserver(handleIntersect, intersectOpt);
        intersectObserver.value.observe(dom);
    }

    onUnmounted(() => {
        intersectObserver.value?.disconnect();
    })

    return {
        intersectObserver,
        initIntersectObserver
    }
}