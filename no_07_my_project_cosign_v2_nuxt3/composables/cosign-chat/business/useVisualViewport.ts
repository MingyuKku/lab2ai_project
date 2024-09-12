import { piniaStompSocket } from "~/pinia/cosign-chat/piniaStompSocket";

export const useVisualViewport = () => {

    const { isIos } = useDevice();

    const viewportScroll = (e: Event) => {
        e.preventDefault();
    }
    
    const viewportResize = (e: Event) => {
         if (!window.visualViewport) return;
        const mobileScrollEl = piniaStompSocket().chatWrapRef;
        if (!mobileScrollEl) return;

        const { height: viewHeight } = window.visualViewport;
        
        const diff = window.innerHeight - viewHeight;
        
        window.scrollTo(0, diff);
    }
    
    
    onMounted(() => {
        const { documentElement, body } = document;
        documentElement.style.overscrollBehavior = 'none';
        body.style.overscrollBehavior = 'none';

        if (window.visualViewport && isIos) {
            // window.visualViewport.addEventListener('resize', viewportResize);
            // window.visualViewport.addEventListener('scroll', viewportScroll);
        }
    })

    onUnmounted(() => {
        const { documentElement, body } = document;
        documentElement.style.removeProperty('overscroll-behavior');
        body.style.removeProperty('overscroll-behavior');

        if (window.visualViewport && isIos) {
            // window.visualViewport.removeEventListener('resize', viewportResize);
            // window.visualViewport.removeEventListener('scroll', viewportScroll);
        }
    })
}