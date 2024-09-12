import { piniaStompSocket } from "~/pinia/cosign-chat/piniaStompSocket";

export const useVisualViewport = () => {

    const { isIos } = useDevice();

    const viewportScroll = (e: Event) => {
        e.preventDefault();
        window.scrollTo(0, 0);
    }
    
    const viewportResize = (e: Event) => {
        // if (!window.visualViewport) return;
        // const mobileScrollEl = piniaStompSocket().chatWrapRef;
        // if (!mobileScrollEl) return;

        // const { height: viewHeight } = window.visualViewport;

        // if (window.innerHeight > viewHeight) {
        //     // 키보드 ON
        //     mobileScrollEl.style.height = `${viewHeight}px`;
        // }

        window.scrollTo(0,0);
    }
    
    
    onMounted(() => {
        const { documentElement, body } = document;
        documentElement.style.overscrollBehavior = 'none';
        body.style.overscrollBehavior = 'none';

        if (window.visualViewport && isIos) {
            window.visualViewport.addEventListener('resize', viewportResize);
            // window.visualViewport.addEventListener('scroll', viewportScroll);
        }
    })

    onUnmounted(() => {
        const { documentElement, body } = document;
        documentElement.style.removeProperty('overscroll-behavior');
        body.style.removeProperty('overscroll-behavior');

        if (window.visualViewport && isIos) {
            window.visualViewport.removeEventListener('resize', viewportResize);
            // window.visualViewport.removeEventListener('scroll', viewportScroll);
        }
    })
}