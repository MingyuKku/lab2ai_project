<template>
    <div class="news-reporter-chat-page">
        <CommonHeadersAppHeader>
            <template #left>
                <div class="flex items-center">
                    <CommonHeadersBackHeaderIcon />
                    <h1 class="text-h3 ml-1">{{ chats?.aiPersonaReporterName }}</h1>
                </div>
            </template>
        </CommonHeadersAppHeader>
        <NewsChatList
            :items="newsChatList"
            class="mb-2.5"
        />
        <NewsChatFluidContent
            :title="`
                ${$I.pages.news.content.lookAtRecentTitle_1}
                ${chats?.aiPersonaReporterName}${$I.pages.news.content.lookAtRecentTitle_2 ? $I.pages.news.content.lookAtRecentTitle_2 : undefined}
            `"
        />
    </div>
</template>

<script lang="ts" setup>
import { useFetchNewsChat } from '~/composables/news/service/useFetchNewsChat';
import { useStateHeaderLabel } from '~/composables/useState/header-label';
import { useNewsHeadOg } from '~/composables/news/business/useNewsHeadOg';
import { PERSONA_NEWS_CHAT_LIST } from '~/composables/_app/asyncDataFetchKeys';
import { useStateLocale } from '~/composables/useState/locale';


const { params } = useRoute();
const { reporterid, newsid } = params;
const { getLocales } = useStateLocale();
const locales = getLocales();
const locale = locales.value[0];
const { newsChatList, getPersonaNewsChatList, setPersonaNewsChatList } = useFetchNewsChat();


const dynamicFetchKey = `${PERSONA_NEWS_CHAT_LIST}-${newsid}`;
const {
    data: chats,
    pending,
    status,
    refresh
} = await useAsyncData(
    dynamicFetchKey,
    () => getPersonaNewsChatList(dynamicFetchKey, newsid as string, reporterid as string)
)

setPersonaNewsChatList(chats.value, locale as string);
useNewsHeadOg(newsChatList.value);

</script>