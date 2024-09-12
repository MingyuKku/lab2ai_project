import * as SwiperModule from 'swiper';
import type { DiscoverChartFetchParamsRankMetaType, DiscoverNavItems } from './_types';

export const useSwiper = ({
    navItems,
    updateActiveIndex,
    getChartRankList
}: {
    navItems: DiscoverNavItems;
    updateActiveIndex: (index: number) => void;
    getChartRankList: (rankMetaType: DiscoverChartFetchParamsRankMetaType) => Promise<void>;
}) => {
    
    const swiperRef = ref<SwiperModule.Swiper | null>(null);

    const initSwiper = (swiper: SwiperModule.Swiper) => {
        swiperRef.value = swiper;
    }


    const slideChangeStart = (swiper: SwiperModule.Swiper) => {
        // console.log('스타트', swiper.wrapperEl)
    }

    const slideChangeEnd = (swiper: SwiperModule.Swiper) => {
        // console.log('앤드', swiper.wrapperEl)
    }


    const slideChange = async (swiper: SwiperModule.Swiper) => {
        updateActiveIndex(swiper.activeIndex);
        await getChartRankList(navItems.activeFetchParamRankMetaType);
        // console.log('첸지', swiper.wrapperEl)

        // swiper.updateAutoHeight();
    }

    return {
        swiperRef,
        initSwiper,
        slideChange,
        slideChangeStart,
        slideChangeEnd,
    }
    
}