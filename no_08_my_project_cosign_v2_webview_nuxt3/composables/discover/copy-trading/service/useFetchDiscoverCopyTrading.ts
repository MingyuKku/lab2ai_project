import type { BasicRes } from "~/composables/_api/_types";
import type { CopyTradingParamPeriodType, CopyTradingRankMeta } from "./_types";
import type { TradeExchangeType } from "~/composables/home/service/_types";

export const useFetchDiscoverCopyTrading = () => {

    const getCopyTradingInfo = async (key: string, exchange: TradeExchangeType = 'BINANCE', period: CopyTradingParamPeriodType = 7): Promise<CopyTradingRankMeta | null> => {
        const { $serviceContentApiFetch } = useNuxtApp();

        try {
            const { data: cache } = useNuxtData(key);
            if (cache.value) return cache.value;

            const { data } = await $serviceContentApiFetch<BasicRes>(`discover/copy-trading/${exchange}/${period}`);

            if (!data || !data.rankMeta) return null;

            const { rankMeta }:{rankMeta: CopyTradingRankMeta} = data;
            return rankMeta;
            

        } catch (err) {
            return null;
        }
    }

    return {
        getCopyTradingInfo,
    }
}