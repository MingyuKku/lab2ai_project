<template>
    <div class="worth-content-recent-report-wrap py-5 bg-bg-white pb-space-page-bottom">
        <h1 class="text-body-1 px-primary mb-3">
            {{ title }}
        </h1>
        <NewsChatFluidContentSwiper
            :items="recentNews"
        />
    </div>
</template>

<script lang="ts" setup>
import type { AiPersonaNewsListItem } from '~/composables/news/service/_types';
import { useFetchNewsChat } from '~~/composables/news/service/useFetchNewsChat';

defineProps<{
    title: string;
}>();

const { params } = useRoute();
const { reporterid, newsid } = params;
const recentNews = ref<AiPersonaNewsListItem[]>([])


const { getRecentPersonaNews } = useFetchNewsChat();
const res = await getRecentPersonaNews(reporterid as string, newsid as string)
if (res) {
    recentNews.value = res;
}

</script>