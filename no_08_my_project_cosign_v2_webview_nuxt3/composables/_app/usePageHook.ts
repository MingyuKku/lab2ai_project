import { PAGE_LOADING } from "../useState/keys";
import { useCommon } from "./useCommon";

export const throttleTimout = 600;

export function usePageHook() {
    const { hook } = useNuxtApp();
    const { delay } = useCommon();

    const timeoutRef = ref<NodeJS.Timeout | null>(null);

    const pageLoading = useState(PAGE_LOADING, () => false);


    hook("page:start", async () => {
        await delay(timeoutRef, throttleTimout);
        pageLoading.value = true;
    });
    
    hook("page:finish", () => {
        if (timeoutRef.value) clearTimeout(timeoutRef.value);
        pageLoading.value = false;
    });


    onUnmounted(() => {
        if (timeoutRef.value) clearTimeout(timeoutRef.value);
    })


    return {
        pageLoading
    }
}