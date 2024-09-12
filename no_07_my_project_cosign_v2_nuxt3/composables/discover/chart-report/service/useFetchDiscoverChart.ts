import type { BasicRes } from "~/composables/_api/_types";
import type { ChartRankMetaFetchKeysType, RankMeta } from "./_types";
import type { DiscoverChartFetchParamsRankMetaType } from "../business/_types";

export const useFetchDiscoverChart = () => {

    const rankList = ref<RankMeta[] | null>(null);

    const getChartRankList = async (rankMetaType: DiscoverChartFetchParamsRankMetaType): Promise<void> => {
        const { $serviceContentApiFetch } = useNuxtApp();

        try {
            const { data } = await $serviceContentApiFetch<BasicRes>(`discover/rank/${rankMetaType}`);

            if (!data || !data.rankMeta) return;
            // console.log('응답', data)

            const { rankMeta }:{rankMeta: RankMeta[]} = data;
            // if (rankMetaType === 'RANK_META_TRADING_VOLUME') rankList.value = rankMeta.slice(0, 2)
            // else rankList.value = rankMeta;
            rankList.value = rankMeta;
            

        } catch (err) {
            return;
        }
    }


    return {
        rankList,
        getChartRankList,
    }
}