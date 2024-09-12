<template>
    <div class="news-reporter-detail-page bg-bg-white min-h-viewScreen-header-nav">
        <div class="top-content bg-bg-white">
            <!-- <NewsReporterTitle v-if="isLocale('ko')" /> -->
            <!-- <NewsReporterBanner /> -->
            <NewsReporterTabNav
                :items="reporters"
                :class="isLocale('ko') ? 'sticky z-20 top-app-header' : 'sticky z-20 top-lang-header'"
            />
        </div>
        <div v-if="activeReporter?.characterType === 'REPORTER'">
            <NewsReporterNewsList />
        </div>
        <div v-else class="flex items-center justify-center flex-col p-10">
            <!-- <div class="image w-[180px] mb-2.5">
                <NuxtImg
                    :src="`${$config.public.IMAGE_URL}version1/news/reporter-employ.gif`"
                    alt="기자 이미지"
                    format="webp"
                    loading="lazy"
                    width="180"
                    height="134"
                />
            </div>
            <p class="text-body-3 font-normal text-font-dark-02">신규 AI 기자를 생성하기 위해</p>
            <p class="text-body-3 font-normal text-font-dark-02">코싸인 AI 개발자가 🔥<span class="text-[#FF3D0B]">불꽃 코딩</span>중입니다.</p> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { AiPersonaReporter } from '~/composables/news/service/_types';
import { i18nMethods } from '~/locales/_methods';


const { reporters } = defineProps<{
    reporters: AiPersonaReporter[];
}>();


const { isLocale } = i18nMethods();
const { params } = useRoute();
const { reporterid } = params;

const activeReporter = reporters.find(item => String(item.aiPersonaCharacterId) === reporterid);


</script>