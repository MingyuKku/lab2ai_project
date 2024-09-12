import type { DiscoverChartFetchParamsRankMetaType, DiscoverNavItems } from "./_types";

export const useTabValues = () => {

    // const { navItems, swiperVisibelFetchParamRankMetaTypes } = piniaDiscoverNavItems();
    const navItems = reactive<DiscoverNavItems>({
        activeIndex: 0, 
        activeFetchParamRankMetaType: 'RANK_META_SURGE',
        items: [
            {
                label: '급상승',
                fetchParamRankMetaType: 'RANK_META_SURGE',
            },
            {
                label: '급하락',
                fetchParamRankMetaType: 'RANK_META_PLUNGE',
            },
            {
                label: '거래대금',
                fetchParamRankMetaType: 'RANK_META_TRADING_VOLUME',
            },
            {
                label: '시가총액',
                fetchParamRankMetaType: 'RANK_META_MARKET_CAPITALIZATION',
            },
        ]
    })

    const updateActiveIndex = (index: number) => {
        navItems.activeIndex = index;
        navItems.activeFetchParamRankMetaType = navItems.items[index].fetchParamRankMetaType;
    }

    // const pushSwiperVisibelFetchParamRankMetaTypes = (RankMeta: DiscoverChartFetchParamsRankMetaType) => {

    //     const isIncludes = () => swiperVisibelFetchParamRankMetaTypes.includes(RankMeta);

    //     if (isIncludes()) return;

    //     swiperVisibelFetchParamRankMetaTypes.push(RankMeta);
    // }


    return {
        navItems,
        updateActiveIndex,
        // swiperVisibelFetchParamRankMetaTypes,
        // pushSwiperVisibelFetchParamRankMetaTypes,
    }
}