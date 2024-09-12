import type { BasicRes } from "~/composables/_api/_types";
import { type AiPersonaNewsList, type AiPersonaReporter, type AiPersonaReporterDesc } from "./_types";

export function useFetchNews() {

    const { $serviceContentApiFetch } = useNuxtApp();

    const getPersonaReporters = async (key: string): Promise<AiPersonaReporter[] | null> => {
        try {
            const { data: cache } = useNuxtData(key);

            if (cache.value) return cache.value;

            const { data } = await $serviceContentApiFetch<BasicRes>(`ai-persona-news/ai-persona-characters`);

            if (!data || !data.aiPersonaReporters) return null;

            const { aiPersonaReporters }:{aiPersonaReporters: AiPersonaReporter[]} = data;

            return hiringReporterMoveTotheBack(aiPersonaReporters);

        } catch (err) {
            return null;
        }
    }


    /**
     * 기자 채용 중을 리포터 리스트 맨 뒤로 이동시키는 함수
     */
    const hiringReporterMoveTotheBack = (aiPersonaReporters: AiPersonaReporter[]): AiPersonaReporter[] => {
        const clone = [...aiPersonaReporters];
        const findHiringIndex = clone.findIndex(item => item.characterType === 'HIRING');

        if (findHiringIndex < 0) return aiPersonaReporters;

        const spliceHring = clone.splice(findHiringIndex, 1)[0];
        clone.push(spliceHring);
        return clone;
    }

    
    const getPersonaReporterDescription = async (key: string, aiPersonaCharacterId: number | string): Promise<AiPersonaReporterDesc | null> => {
        try {
            const { data: cache } = useNuxtData(key);

            if (cache.value) return cache.value;

            const { data } = await $serviceContentApiFetch<BasicRes>(`ai-persona-news/description/${aiPersonaCharacterId}`);

            if (!data || !data.aiPersonaReporterInfo) return null;

            const { aiPersonaReporterInfo }:{aiPersonaReporterInfo: AiPersonaReporterDesc} = data;
            return aiPersonaReporterInfo;

        } catch (err) {
            return null;
        }
    }


    const getPersonaNewsList = async (key: string, aiPersonaCharacterId: number | string, aiPersonaNewsId: number | string | null): Promise<AiPersonaNewsList | null> => {
        try {
            const { data: cache } = useNuxtData<AiPersonaNewsList>(key);

            if (aiPersonaNewsId === null) {
                // 최초 데이터 패치
                if (cache.value) return cache.value;

                const { data } = await $serviceContentApiFetch<BasicRes>(`ai-persona-news/list/${aiPersonaCharacterId}`);
                // console.log('응답', data)

                if (!data || !data.aiPersonaNewsItems) return null;

                const { aiPersonaNewsItems }:{aiPersonaNewsItems: AiPersonaNewsList} = data;
                return aiPersonaNewsItems;

            }
            if (aiPersonaNewsId !== null) {
                // 더보기 데이터 패치
                const { data } = await $serviceContentApiFetch<BasicRes>(`ai-persona-news/list/${aiPersonaCharacterId}/${aiPersonaNewsId}`);

                if (!cache.value || !data.aiPersonaNewsItems) return null;

                const { aiPersonaNewsItems }:{aiPersonaNewsItems: AiPersonaNewsList} = data;

                cache.value.aiPersonaNewsItems = cache.value.aiPersonaNewsItems.concat(aiPersonaNewsItems.aiPersonaNewsItems);
                cache.value.isLast = aiPersonaNewsItems.isLast;
                return cache.value;
            }

            return null;

        } catch (err) {
            return null;
        }
    }


    return {
        getPersonaReporters,
        getPersonaReporterDescription,
        getPersonaNewsList,
    }
}