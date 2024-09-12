export const DiscoverChartFetchParamsRankMetaData = {
    RANK_META_SURGE: '급상승',
    RANK_META_PLUNGE: '급하락',
    RANK_META_TRADING_VOLUME: '거래대금',
    RANK_META_MARKET_CAPITALIZATION: '시가총액',
} as const;

export type DiscoverChartFetchParamsRankMetaType = keyof typeof DiscoverChartFetchParamsRankMetaData;
export type DiscoverChartFetchParamsRankMetaLabels = typeof DiscoverChartFetchParamsRankMetaData[keyof typeof DiscoverChartFetchParamsRankMetaData];


export interface DiscoverNavItems {
    activeIndex: number;
    activeFetchParamRankMetaType: DiscoverChartFetchParamsRankMetaType;
    items: {
        label: DiscoverChartFetchParamsRankMetaLabels;
        fetchParamRankMetaType: DiscoverChartFetchParamsRankMetaType;
    }[];
}