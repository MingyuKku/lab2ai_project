<template>
    <div class="card-item-model flex justify-between">
        <div class="left flex items-center">
            <div
                class="model-image model-image-sm mr-1 bg-no-repeat bg-cover bg-center"
                :style="bgSrcUrl"
            >
                <!-- <NuxtImg
                    :src="src"
                    :alt="item.modelName"
                    format="webp"
                    loading="lazy"
                    width="24"
                    height="20"
                    class="object-cover h-full"
                    @error="() => src = `${imageBase}lab2ai/app-logo.png`"
                /> -->
            </div>
            <h2 class="text-cap-1b text-font-dark-01">{{ item.modelName }}</h2>
        </div>
        <div class="right leading-none">
            <!-- <span v-if="$route.query.sortType === 'created'" class="text-cap-2m text-font-dark-03">{{ item.createdAtText }}</span>
            <span v-else class="text-cap-2m text-font-dark-03">{{ item.updatedAtText }}</span> -->
            <span class="text-cap-2m text-font-dark-03">{{ item.createdAtText }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ClassHomeSignItem } from '~/composables/home/service/_types';

const { item, imageBase } = defineProps<{
    item: Pick<ClassHomeSignItem, 'createdAtText' | 'updatedAtText' | 'modelId' | 'modelName'>;
    imageBase: string;
}>();

const bgSrcUrl = computed(() => ({
    'background-image': `url(${imageBase}version2/model-image/small/${item.modelId}.png)`
}))
// let src = ref(`${imageBase}version2/model-image/small/${item.modelId}.png`);


</script>