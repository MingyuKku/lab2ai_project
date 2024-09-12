import type { BasicRes } from "~/composables/_api/_types";
import { ClassAiPersonaNewsChats, type AiPersonaNewsChats, type RecentPersonaNews } from "./_types-chat";
import { useInstance } from "~/composables/_api/useInstance";
import type { AiPersonaNewsListItem } from "./_types";
import { useTimezoneCookies } from "~/composables/useCookie/timezone";

export function useFetchNewsChat() {

    const { $serviceContentApiFetch } = useNuxtApp();

    const newsChatList = ref<ClassAiPersonaNewsChats | null>(null);
    
    const getPersonaNewsChatList = async (key: string, aiPersonaNewsId: string, reporterid: string): Promise<AiPersonaNewsChats | null> => {
        try {
            const { data: cache } = useNuxtData(key);
    
            if (cache.value) return cache.value;

            const { data } = await $serviceContentApiFetch<BasicRes>(`ai-persona-news/chat/${aiPersonaNewsId}`);

            if (data && data.aiPersonaNewsChats) {
                const { aiPersonaNewsChats }:{aiPersonaNewsChats: AiPersonaNewsChats} = data;
                return aiPersonaNewsChats;

            } else {
                navigateTo(`/news/${reporterid}`, { replace: true });
                return null;
            }
    
        } catch (err) {
            navigateTo(`/news/${reporterid}`, { replace: true });
            return null;
        }
    }


    const setPersonaNewsChatList = (data: AiPersonaNewsChats | null, locale: string) => {
        if (!data) return;

        const { dateTimeFormat } = useInstance();
        const { getCookie_timezone } = useTimezoneCookies();
        const timezoneCookie = getCookie_timezone();

        const dateFormat = dateTimeFormat(locale as string, {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            weekday: 'short',
            hour: '2-digit',
            hourCycle: 'h23',
            minute: '2-digit',
            timeZone: timezoneCookie.value ?? undefined
        });

        newsChatList.value = new ClassAiPersonaNewsChats(data, dateFormat);
    }


    const getRecentPersonaNews = async (aiPersonaCharacterId: string, aiPersonaNewsId: string): Promise<AiPersonaNewsListItem[] | null> => {
        try {
            const { data } = await $serviceContentApiFetch<BasicRes>(`ai-persona-news/recent-list/${aiPersonaCharacterId}/${aiPersonaNewsId}`);

            if (!data || !data.aiPersonaRecentNewsItems) return null;
            
            const { aiPersonaRecentNewsItems }:{aiPersonaRecentNewsItems: AiPersonaNewsListItem[]} = data;
            return aiPersonaRecentNewsItems;

        } catch (err) {
            return null;
        }
    }



    return {
        newsChatList,
        getPersonaNewsChatList,
        setPersonaNewsChatList,
        getRecentPersonaNews,
    }
}

