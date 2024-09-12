<template>
    <div class="right-chat-item-wrap flex justify-end">
        <div class="shrink-0 w-11 mr-[7px]"></div>
        <div class="text-list mr-[7px]">
            <h1 class="text-right text-body-4 mb-1.5">{{ item.characterDisplayName }}</h1>
            <ul class="flex flex-col">
                <li
                    v-if="item.newsChatSequence !== null"
                    v-for="text,idx in item.newsChatTextArray" :key="idx"
                    class="mb-[5px] self-end"
                >
                    <div
                        v-if="text.type === 'text'"
                        :class="{'rounded-se-none': idx === 0}"
                        class="py-2.5 px-3 bg-bg-gray-02 rounded-[10px]"
                    >
                        <p v-html="text.text" class="text-body-3 font-normal break-words break-all"></p>
                    </div>
                    <div v-if="text.type ==='image'">
                        <div class="thumbnail rounded-[3px] overflow-hidden min-h-[100px]">
                            <NuxtImg
                                v-if="text.text !== 'null' && typeof text.text === 'string'"
                                :src="text.text"
                                alt="썸네일"
                                format="webp"
                                loading="lazy"
                                class="max-w-[200px] w-auto object-cover"
                            />
                            <!-- <img v-if="text.text !== 'null'" :src="text.text" alt="썸네일" loading="lazy" class="max-w-[200px] w-auto object-cover" /> -->
                        </div>
                    </div>
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
</template>

<script lang="ts" setup>
import type { ClassAiPersonaNewsChatItem } from '~/composables/news/service/_types-chat';



defineProps<{
    item: ClassAiPersonaNewsChatItem;
}>();

</script>
