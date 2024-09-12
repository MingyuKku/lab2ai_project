import { piniaStompSocket } from "~/pinia/cosign-chat/piniaStompSocket";

export const useRefreshFetch = (refresh: () => Promise<void>) => {

    const { isMobile, isIos } = useDevice();

    const stopFlag = ref(false);
    const previousScrollPosition = ref(0);


    const beforeReFetchScrollPosition = () => {
        
        const mobileScrollEl = piniaStompSocket().chatWrapRef;

        if (mobileScrollEl) {
            const container = isIos ? mobileScrollEl : document.documentElement;
            previousScrollPosition.value = container?.scrollHeight - container?.scrollTop;

            if (isIos) {
                // isIos에서 생기는 스크롤 버그 해결을 위해
                container.style.overflow = 'hidden';
                container.style.touchAction = 'none';
            }
            
        }
    }

    const afterReFetchScrollPosition = () => {
        const mobileScrollEl = piniaStompSocket().chatWrapRef;

        if (mobileScrollEl) {
            const container = isIos ? mobileScrollEl : document.documentElement;
            container.scrollTop = container.scrollHeight - previousScrollPosition.value;
            
            if (isIos) {
                // isIos에서 생기는 스크롤 버그 해결을 위해
                container.style.removeProperty('overflow');
                container.style.removeProperty('touch-action');
            }
        }
    }



    const moreListFetch = async () => {
        if (stopFlag.value) return;
        
        stopFlag.value = true;
        beforeReFetchScrollPosition();

        await refresh();
        await nextTick();
        
        afterReFetchScrollPosition();
        stopFlag.value = false;
    }


    return {
        moreListFetch,
    }
}