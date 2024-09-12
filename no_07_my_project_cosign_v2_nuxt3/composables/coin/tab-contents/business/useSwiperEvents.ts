import * as SwiperModule from 'swiper';
import { piniaCoinTabNav } from '~/pinia/coin/tab-contents/piniaCoinTabNav';
import { queryName, coinDetailTabNav } from '~/composables/coin/tab-contents/business/variables';

export const useSwiperEvents = () => {

    const { setSwiperRef, getActiveTabIndex, setActiveTabIndex } = piniaCoinTabNav();

    const swiperRef = ref<SwiperModule.Swiper>();

    const initSwiper = (swiper: SwiperModule.Swiper) => {
        swiperRef.value = swiper;
        setSwiperRef(swiper);
        const index = getActiveTabIndex();
        if (index !== null) {
            swiper.slideTo(index, 0);
            setActiveTabIndex(index);
        }
    }
    
    const slideChange = (swiepr: SwiperModule.Swiper) => {
        const { path } = useRoute();
        const activeTab = coinDetailTabNav[swiepr.activeIndex];
        navigateTo(`${path}?${queryName}=${activeTab.name}`, { replace: true });
    
        setActiveTabIndex(swiepr.activeIndex);
    }
    
    const moveSlide = (index: number) => {
        const { path } = useRoute();
        const activeTab = coinDetailTabNav[index];
        navigateTo(`${path}?${queryName}=${activeTab.name}`, { replace: true });
    
        setActiveTabIndex(index);
    }

    const updateAutoHeight = () => {
        swiperRef.value?.updateAutoHeight();
    }

    return {
        swiperRef,
        initSwiper,
        slideChange,
        updateAutoHeight,
        moveSlide,
    }
}
