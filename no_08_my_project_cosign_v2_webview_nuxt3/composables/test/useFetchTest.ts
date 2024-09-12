
export const useFetchTest = () => {

    const getRandomData = async (): Promise<any | null> => {

        const { $testApiFetch } = useNuxtApp();

        const { results } = await $testApiFetch<any>('https://randomuser.me/api/?results=500')
        
        return results;
    }

    return {
        getRandomData
    }
    
}



export const visualScroll = () => {

    const wrapRef = ref<HTMLDivElement>();
    const wrapDomTopRef = ref<HTMLDivElement>();
    const wrapDomBottmRef = ref<HTMLDivElement>();
    const scrollTimeout = ref<NodeJS.Timeout | null>();

    const itemHeightRef = ref<number>(0);
    const itemStart = ref<number>(0);
    const itemVisibleCountRef = ref<number>(7);
    const itemEnd = ref<number>(itemStart.value + itemVisibleCountRef.value);

    const createVisualScroll = ({
        wrapDom,
        wrapDomTop,
        wrapDomBottm,
        itemHeight,
        visibleItemCount
    }: {
        wrapDom: HTMLDivElement | null,
        wrapDomTop: HTMLDivElement | null;
        wrapDomBottm: HTMLDivElement | null;
        itemHeight: number;
        visibleItemCount: number;
    }) => {
        if (!wrapDom || !wrapDomTop || !wrapDomBottm) return;

        wrapRef.value = wrapDom;
        wrapDomTopRef.value = wrapDomTop;
        wrapDomBottmRef.value = wrapDomBottm;
        itemHeightRef.value = itemHeight;
        itemVisibleCountRef.value = visibleItemCount;
        itemEnd.value = itemStart.value + visibleItemCount;
    }


    const windowScroll = () => {
        if (scrollTimeout.value) return;

        scrollTimeout.value = setTimeout(() => {
            if (!wrapRef.value) return;
            scrollTimeout.value = null;

            const { y } = wrapRef.value.getBoundingClientRect();
            if (y > 0) return;


            console.log('스크롤', Math.abs(y))
        }, 100)
    }

    onMounted(() => {
        window.addEventListener('scroll', windowScroll, { passive: false });
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', windowScroll);
    })


    return {
        createVisualScroll
    }
}