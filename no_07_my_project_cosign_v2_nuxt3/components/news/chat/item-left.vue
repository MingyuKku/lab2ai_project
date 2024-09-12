<template>
    <div class="left-chat-item-wrap flex">
        <div 
            class="thumbnail self-start shrink-0 w-11 h-11 mr-[7px] border border-border-gray-03 rounded-full overflow-hidden"
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
        <div class="text-list">
            <h1 class="text-body-4 mb-1.5">{{ item.characterDisplayName }}</h1>
            <ul class="flex flex-col">
                <li
                    v-for="text,idx in item.newsChatTextArray" :key="idx" 
                    class="mb-[5px] self-start"
                >
                    <div 
                        v-if="text.type === 'text'" 
                        :class="{'rounded-ss-none': idx === 0}"
                        class="py-2.5 px-3 bg-[#E4F0FD] rounded-[10px]"
                    >
                        <p v-if="typeof text.text === 'string'" class="chat-desc text-body-3 font-normal break-words break-all" v-html="text.text"></p>
                        <div v-if="Array.isArray(text.text)" class="text-body-3 font-normal break-words break-all">
                            <p v-for="t,i in text.text" :key="i" class="chat-desc">{{ t }}</p>
                        </div>
                    </div>
                    <div v-if="text.type ==='image'">
                        <div class="thumbnail rounded-[3px] overflow-hidden">
                            <img
                                v-if="text.text !== 'null' && text.text !== null && typeof text.text === 'string'"
                                :src="text.text"
                                alt="썸네일"
                                loading="lazy"
                                class="max-w-[200px] w-auto object-cover"
                            />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>


<script lang="ts" setup>
import type { ClassAiPersonaNewsChatItem } from '~/composables/news/service/_types-chat';



defineProps<{
    item: ClassAiPersonaNewsChatItem;
}>();

</script>