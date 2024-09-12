import { CHAT_GET_HISTORY } from "~/composables/_app/asyncDataFetchKeys";
import type { ChatHistoryRes } from "../service/_types";

/**
 * onMounted 훅 안에서 실행해야 함
 */
export const useIntersectionObserver = ({
    element,
    refresh
}: {
    element?: Element;
    refresh: () => Promise<void>;
}) => {

    let intersectObserver = ref<IntersectionObserver | null>(null);
    

    const initObserver = () => {
        if (!element) return;

        const intersectOpt: IntersectionObserverInit  = {
            root: null,
            threshold: 0,
            // rootMargin: `${paddingNodes * cardHeight.value}px 0px`, 
        }
        
        intersectObserver.value = new IntersectionObserver(handleIntersect, intersectOpt);
        intersectObserver.value?.observe(element);
    }


    const handleIntersect: IntersectionObserverCallback = async (entries) => {

        /**
         * 메세지가 마지막인지 아닌지
         */
        const isLastMessage = () => {
            const { data: cache } = useNuxtData<ChatHistoryRes>(CHAT_GET_HISTORY);
            if (!cache.value) return;

            const { is_last_message } = cache.value;
            return is_last_message;
        }


        for (const entrie of entries) {
            // const target = entrie.target as HTMLElement;
    
            if (entrie.isIntersecting) {

                if (isLastMessage()) return;

                refresh();
            }
        }
    }


    initObserver();

    onUnmounted(() => {
        intersectObserver.value?.disconnect();
    })
}