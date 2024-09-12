import { coinDetailTabNav, queryName } from "~/composables/coin/tab-contents/business/variables";
import { PiniaCoinTabNav } from "~/pinia/keys";



export const piniaCoinTabNav = defineStore(PiniaCoinTabNav, () => {
    const swiperRef = ref<any>(null);
    const activeTabIndex = ref<number | null>(null);

    const linkRefs = ref<HTMLDivElement[]>([]);
    
    const activeBarStyle = reactive({
        width: 0,
        left: 0,
    })

    const computedStyle = computed(() => ({
        'width': `${activeBarStyle.width}px`,
        'transform': `translateX(${activeBarStyle.left}px)`
    }))

    const setSwiperRef = (swiper: any) => {
        swiperRef.value = swiper;
    }

    const setActiveTabIndex = (index: number) => {
        activeTabIndex.value = index;

        const activeRef = linkRefs.value[index];
        if (activeRef) {
            const width = activeRef.offsetWidth;
            const left = activeRef.offsetLeft;
            activeBarStyle.width = width;
            activeBarStyle.left = left;
        }
    }

    const getActiveTabIndex = () => {
        const { query } = useRoute();
    
        const findIndex = coinDetailTabNav.findIndex(nav => nav.name === query[queryName]);
        return findIndex > -1 ? findIndex : null;
    }


    // const setActiveBarStyle = (index: number) => {
    //     const activeRef = linkRefs.value[index];
    //     const width = activeRef.offsetWidth;
    //     const left = activeRef.offsetLeft;
    //     activeBarStyle.width = width;
    //     activeBarStyle.left = left;
    // }

    const clearStore = () => {
        swiperRef.value = null;
        activeTabIndex.value = null;
        linkRefs.value = [];
        activeBarStyle.width = 0;
        activeBarStyle.left = 0;
    }


    return {
        swiperRef: computed(() => swiperRef.value),
        setSwiperRef,
        activeTabIndex: computed(() => activeTabIndex.value),
        setActiveTabIndex,
        getActiveTabIndex,
        linkRefs,
        activeBarStyle,
        // setActiveBarStyle,
        computedStyle,
        clearStore,
    }
})