import { CHAT_GET_HISTORY } from "~/composables/_app/asyncDataFetchKeys";
import type { ChatHistoryRes } from "../service/_types";

export const useVisibilitychange = (refetch: () => Promise<void>) => {

    const { isDesktop } = useDevice();

    if (isDesktop) return;

    const { data: cache } = useNuxtData<ChatHistoryRes>(CHAT_GET_HISTORY);

    const onvisibilitychange = async (event: Event) => {

        if (document.hidden) {
            // 브라우저 비활성화

        } else {
            // 브라우저 활성화

            if (cache.value) {
                cache.value.isVisibilitychange = true;
                await refetch();
                cache.value.isVisibilitychange = false;
            }
        }
    }


    onMounted(() => {
        window.addEventListener('visibilitychange', onvisibilitychange);
    })
    
    onBeforeUnmount(() => {
        window.removeEventListener('visibilitychange', onvisibilitychange);
    })
}