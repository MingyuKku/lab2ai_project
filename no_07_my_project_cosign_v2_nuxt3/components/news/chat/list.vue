<template>
    <div
        v-if="items"
        class="news-reporter-chat-wrap px-primary pt-[18px] pb-[43px] bg-[#FAFAFA]"
    >
        <p class="text-center text-cap-1r text-font-dark-01">
            {{ items.createdAtText }}
        </p>
        <ul>
            <li
                v-for="item,idx in items.aiPersonaNewsChatItems" :key="idx" 
                class="my-5"
            >
                <NewsChatItemLeft 
                    v-if="item.characterType === 'REPORTER' && item.newsChatTextArray.length > 0" 
                    :item="item"
                />
                <NewsChatItemRight 
                    v-if="item.characterType === 'PANEL' && item.newsChatTextArray.length > 0"
                    :item="item"
                />
                <NewsChatItemAd
                    v-if="item.characterType === 'AD'"
                    :item="item"
                />
            </li>
            <!-- <li v-if="isLocale('ko')">
                <div class="flex">
                    <div class="shrink-0 w-11 mr-[7px]"></div>
                    <div class="w-full">
                        <NewsChatVote :isVote="isVote" class="my-primary" />
                        <div v-if="!isVote" class="w-full">
                            <div class="inline-block py-primary px-3 bg-[#E4F0FD] rounded-[10px]">
                                <p class="text-14 text-justify leading-primary break-words break-all">투표가 종료되었어요.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </li> -->
        </ul>
    </div>
</template>

<script lang="ts" setup>

import type { ClassAiPersonaNewsChats } from '~/composables/news/service/_types-chat';
import { useStateLocale } from '~/composables/useState/locale';



const { items } = defineProps<{
    items: ClassAiPersonaNewsChats | null;
}>();





</script>