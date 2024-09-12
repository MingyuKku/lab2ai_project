<template>
    <div class="persona-ad-item">
        <div class="right-chat-item-wrap flex justify-end">
            <div class="shrink-0 w-11 mr-[7px]"></div>
            <div class="text-list mr-[7px]">
                <h1 class="text-right text-body-4 mb-1.5">{{ item.characterDisplayName }}</h1>
                <ul class="flex flex-col">
                    <li
                        v-for="text,idx in item.newsChatTextArray" :key="idx"
                        class="mb-[5px] self-end"
                    >
                        <div
                            :class="{'rounded-se-none': idx === 0}"
                            class="py-2.5 px-3 bg-bg-gray-02 rounded-[10px]"
                        >
                            <p v-html="text.text" class="text-body-3 font-normal text-justify break-words break-all"></p>
                        </div>
                        
                    </li>
                    <li class="self-end min-h-[250px]">
                        <CommonAd
                            class="min-h-[250px]"
                            :adsense="{
                                slot: '1239577478',
                                // widthResponsive: true,
                                style: {
                                    'display': 'inline-block',
                                    'width': `${isMobile ? '250px' : '300px'}`,
                                    'height': '250px'
                                }
                            }"
                            :adfit="{
                                src: '//t1.daumcdn.net/kas/static/ba.min.js',
                                unit: 'DAN-0uF30ATYYcisSVmp',
                                width: `${isMobile ? '250' : '300'}`,
                                height: '250',
                            }"
                        />
                    </li>
                </ul>
            </div>
            <div 
                class="thumbnail self-start shrink-0 w-11 h-11 border border-border-gray-03 rounded-full overflow-hidden"
                :style="{'background-color': item.characterProfileBackgroundCode ? `#${item.characterProfileBackgroundCode}` : ''}"
            >
                <NuxtImg
                    v-if="item.characterProfileImg"
                    :src="item.characterProfileImg"
                    alt="썸네일"
                    format="webp"
                    loading="lazy"
                    width="44"
                    height="44"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ClassAiPersonaNewsChatItem } from '~/composables/news/service/_types-chat';

defineProps<{
    item: ClassAiPersonaNewsChatItem;
}>();

const { isMobile } = useDevice();

</script>