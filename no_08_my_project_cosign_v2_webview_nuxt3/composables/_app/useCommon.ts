export function useCommon() {

    /**
     * dev 환경일 경우 true
     */
    const isDev = () => {
        const config = useRuntimeConfig();

        if (config.public.DEPLOY_TYPE === "main") return false;
        return true;
    }


    /**
     * 뒤로가기로 페이지 진입시 return값은 true
     */
    const isHistoryBack = () => {
        const { options } = useRouter();
        const isScroll = options.history.state.scroll;
        if (isScroll) return true;
        else return false;
    }


    const delay = (timeoutRef: Ref<NodeJS.Timeout | null>, timer: number) => {
        return new Promise<void>((resolve) => {
            if (timeoutRef.value) clearTimeout(timeoutRef.value);
            timeoutRef.value = setTimeout(() => {
                resolve();
            }, timer)
        })
    }


    return {
        isDev,
        isHistoryBack,
        delay,
    }
}