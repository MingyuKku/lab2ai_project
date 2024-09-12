<template>
    <div v-if="newsList" class="px-primary pb-5 bg-bg-white">
        <div 
            v-for="newContent,idx in newsList.aiPersonaNewsItems" :key="`news-${idx}`" 
            :class="{'mt-5': idx !== 0}"
        >
            <h2 class="text-body-4 text-font-dark-03 text-center mb-8">{{ newContent.date }}</h2>
            <ul>
                <li
                    v-for="item,i in newContent.news" :key="`item-${i}`"
                    :class="{'mt-8': i !== 0}"
                >
                    <NewsReporterNewsListItem
                        :item="item"
                        :isLastItem="i === newsList.aiPersonaNewsItems[newsList.aiPersonaNewsItems.length - 1].news.length - 1"
                        :lazyLoad="idx !== 0 || i >= 4"
                        :refresh="fetchMoreItem"
                    />
                    <NewsReporterNewsListItemAd v-if="newContent.news.length >= 4 && i === 2" class="mt-8" />
                </li>
            </ul>
        </div>
        <LazyCommonLoadingSpinnerMoreFetchPending v-if="pending" />
    </div>
</template>

<script lang="ts" setup>
import { useStateLocale } from '~/composables/useState/locale';
import { PERSONA_NEWS_LIST } from '~/composables/_app/asyncDataFetchKeys';
import { useFetchNews } from '~/composables/news/service/useFetchNews';
import { ClassAiPersonaNewsList } from '~/composables/news/service/_types';
import { useInstance } from '~/composables/_api/useInstance';
import { useTimezoneCookies } from '~/composables/useCookie/timezone';


const { getLocales } = useStateLocale();
const locales = getLocales();
const { params } = useRoute();
const { reporterid } = params;
            
const { getPersonaNewsList } = useFetchNews();

const newsList = ref<ClassAiPersonaNewsList | null>(null);
const lastAiPersonaNewsId = ref<number | null>(null);

const dynamicFetchKey = `${PERSONA_NEWS_LIST}-${reporterid}`;
const {
    data: list,
    pending,
    refresh,
} = await useAsyncData(
    dynamicFetchKey,
    () => getPersonaNewsList(dynamicFetchKey, reporterid as string, lastAiPersonaNewsId.value)
)

const setNewsList = () => {
    if (!list.value) return;

    const { dateTimeFormat } = useInstance();
    const { getCookie_timezone } = useTimezoneCookies();
    const timezoneCookie = getCookie_timezone();

    const locale = locales.value[0];
    const dateFormat = dateTimeFormat(locale as string, {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        weekday: 'short',
        timeZone: timezoneCookie.value ?? undefined
    });

    newsList.value = new ClassAiPersonaNewsList(list.value, dateFormat);
}

setNewsList();

const setLastAiPersonaNewsId = () => {
    if (!newsList.value) return;

    const lastAiPersonaNewsList = newsList.value.aiPersonaNewsItems[newsList.value.aiPersonaNewsItems.length - 1];
    lastAiPersonaNewsId.value = lastAiPersonaNewsList.news[lastAiPersonaNewsList.news.length - 1].aiPersonaNewsId;
}

const fetchMoreItem = async () => {
    if (
        !list.value ||
        (list.value && list.value.isLast)
    ) return;

    setLastAiPersonaNewsId();
    await refresh();
    setNewsList();
}

</script>