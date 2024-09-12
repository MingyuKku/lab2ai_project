<template>
    <div class="ai-report-page pt-app-header">
        <CommonHeadersAppHeader>
            <template #left>
                <!-- <h1 v-if="isMobile" class="text-h1">AI 기자단</h1> -->
                <IconBrandCosignFull />
            </template>
            <template #right>
                <CommonHeadersBasicMenu />
            </template>
        </CommonHeadersAppHeader>
        <NuxtPage
            :reporters="reporters"
        />
        <LazyNewsAlarmButton />
        <!-- 이곳에 푸터 -->
    </div>
</template>


<script lang="ts" setup>
import { PERSONA_NEWS_REPORTERS } from '~/composables/_app/asyncDataFetchKeys';
import { useFetchNews } from '~~/composables/news/service/useFetchNews';

const { isMobile } = useDevice();
const { getPersonaReporters } = useFetchNews();


const {
    data: reporters
} = await useAsyncData(
    PERSONA_NEWS_REPORTERS,
    () => getPersonaReporters(PERSONA_NEWS_REPORTERS)
);


</script>