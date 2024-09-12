<template>
    <div ref="DOM_lastItem">
        <NuxtLink
            :to="`${item.aiPersonaCharacterId}/${item.aiPersonaNewsId}`"
            class="content-box block rounded-lg border"
            :class="
                item.newsImportant 
                ? item.aiPersonaCharacterId === 3 
                ? 'border-[#00A4FF] border-2' 
                : 'border-[#705E55] border-2' 
                : 'border-border-gray-03'
            "
        >
            <div class="top-content flex items-center -translate-y-1/2 -mb-3 ml-2.5">
                <div
                    class="profile-image relative z-[1] w-11 h-11 rounded-full overflow-hidden border"
                    :style="bgStyle"
                >
                    <div
                        class="w-11 h-11 bg-no-repeat bg-center bg-cover"
                        :style="bgSrcUrl"
                    ></div>
                </div>
                <div
                    v-if="item.newsImportant"
                    class="recommend relative z-0 flex items-center justify-center h-7 pr-2.5 pl-6 rounded-full -ml-[18px]"
                    :class="
                        item.aiPersonaCharacterId === 3
                        ? 'bg-gradient-to-r from-[#75CEFF] to-[#0098EC]' 
                        : 'bg-gradient-to-r from-[#AA9489] to-[#836658]'
                    "
                >
                    <h1
                        class="text-body-4 text-font-white leading-none" 
                        :class="item.aiPersonaCharacterId === 3 ? 'text-[#00A4FF]' : 'text-[#705E55]'"
                    >{{ $I.pages.news.content.aiCommend }}</h1>
                </div>
                <div class="time flex items-center justify-center px-2.5 mx-[5px] rounded-full border border-border-gray-03 h-7 bg-bg-white">
                    <div class="flex items-center">
                        <div class="icon w-[14px] mr-1">
                            <NuxtImg
                                :src="`${$config.public.IMAGE_URL}version1/icon/i-time-gray.png`"
                                alt="time"
                                format="webp"
                                :loading="lazyLoad ? 'lazy' : 'eager'"
                                width="14"
                                height="14"
                            />
                        </div>
                        <p class="text-body-4 font-normal text-font-dark-02">{{ item.postTime }}</p>
                    </div>
                </div>
                <div v-if="item.newsPositiveNegativeType !== 'NORMAL'" class="type flex items-center justify-center px-2.5 rounded-full border border-border-gray-03 h-7 bg-bg-white">
                    <div v-if="item.newsPositiveNegativeType === 'POSITIVE'" class="good flex items-center text-body-4">
                        <span class="icon mr-[3px] -mt-0.5">{{ Emoji.positive.uniCode }}</span>
                        <span class="font-normal text-font-dark-02">{{ $I.labels.goodNews }}</span>
                    </div>
                    <div v-if="item.newsPositiveNegativeType === 'NEGATIVE'" class="bad flex items-center text-body-4">
                        <span class="icon mr-[3px] -mt-0.5">{{ Emoji.negative.uniCode }}</span>
                        <span class="font-normal text-font-dark-02">{{ $I.labels.badNews }}</span>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between px-2.5 pb-2.5 pt-0">
                <p class="text-body-3 font-normal text-justify line-clamp-2 break-words break-all">{{ item.newsDisplayTitle }}</p>
                <div v-if="item.newsTitleImg" class="thumbnail-image shrink-0 w-[57px] h-[57px] ml-2.5 rounded overflow-hidden">
                    <NuxtImg
                        :src="item.newsTitleImg"
                        alt="썸네일"
                        format="webp"
                        :loading="lazyLoad ? 'lazy' : 'eager'"
                        width="57"
                        height="57"
                        class="object-cover"
                    />
                </div>
            </div>
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
import type { ClassNewPersonaNewsItem } from '~/composables/news/service/_types';
import { Emoji } from '~/composables/news/business/emoji';


const { isLastItem, item, refresh } = defineProps<{
    item: ClassNewPersonaNewsItem;
    isLastItem: boolean;
    lazyLoad: boolean;
    refresh: () => void;
}>();


const DOM_lastItem = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
const options = {
    root: null,
    threshold: 0,
}

const bgStyle = computed(() => ({
    'background-color': `#${item.characterProfileBackgroundCode}`,
    'border': item.newsImportant ? `1px solid #${item.characterProfileBackgroundCode}` : '1px solid #e4e6eb'
}))
const bgSrcUrl = computed(() => ({
    'background-image': `url(${item.characterProfileImg})`
}))

onMounted(() => {
    nextTick(() => {
        if (
            isLastItem && 
            DOM_lastItem.value
        ) {
            observer = new IntersectionObserver(handleIntersect, options);

            function handleIntersect(entries: IntersectionObserverEntry[]):void  {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        refresh();
                        observer?.unobserve(entry.target);
                    }
                })
            }

            observer.observe(DOM_lastItem.value as HTMLDivElement);
        }
        
    })
})

onUnmounted(() => {
    if (observer !== null) {
        observer.disconnect();
        observer = null;
    }
})

</script>