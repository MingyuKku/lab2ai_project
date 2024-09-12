import type { BasicRes } from "~/composables/_api/_types";
import type { ICryptoTimelineDetail, ICryptoTimelineMainCategory, ICryptoTimelineWrap } from "./_types";

export const useFetchTimeline = () => {
    const { $serviceContentApiFetch } = useNuxtApp();

    const getCryptoTimeline = async (key: string, cryptoCurrencyId: string): Promise<ICryptoTimelineWrap | null> => {
        try {
            const { data: cache } = useNuxtData(key);

            if (cache.value) return cache.value;

            const { data }: {data: ICryptoTimelineWrap} = await $serviceContentApiFetch<BasicRes>(`crypto-timeline/${cryptoCurrencyId}`);

            if (data) {
                console.log("test", data.cryptoTimeline.cryptoTimelineItems.map((item) => item.timelineId))
                return data;
            } else {
                return null;
            }

        } catch (err) {
            return null;
        }
    }

    const getCryptoTimelineNextPage = async (cryptoCurrencyId: string, cryptoTimelineId: number): Promise<ICryptoTimelineWrap | null> => {
        try {
            const { data }: {data: ICryptoTimelineWrap} = await $serviceContentApiFetch<BasicRes>(`crypto-timeline/${cryptoCurrencyId}/${cryptoTimelineId}`);

            if (data) {
                return data;
            } else {
                return null;
            }

        } catch (err) {
            return null;
        }
    }

    const getCryptoTimelineDetail = async (mainCategory: ICryptoTimelineMainCategory, cryptoTimelineId: number): Promise<ICryptoTimelineDetail | null> => {
        try {
            const { data } = await $serviceContentApiFetch<BasicRes>(`crypto-timeline/category/${mainCategory}/${cryptoTimelineId}`);
            const { cryptoTimelineDetail } = data;

            if (cryptoTimelineDetail) {
                return cryptoTimelineDetail;
            } else {
                return null;
            }

        } catch (err) {
            return null;
        }
    }

    return {
        getCryptoTimeline,
        getCryptoTimelineNextPage,
        getCryptoTimelineDetail,
    }
}