import type { DiscoverChartFetchParamsRankMetaType } from "../business/_types";

export interface RankMeta {
    createdAt: string;
    cryptoCurrencyId: number;
    digitalAssetsId: number;
    digitalAssetsKoName: string;
    fluctuateRange?: number;
    id: number;
    price: number;
    rank: number;
    rankMetaId: number;
}


export type ChartRankMetaFetchKeysType = {
    [K in DiscoverChartFetchParamsRankMetaType]: string;
};