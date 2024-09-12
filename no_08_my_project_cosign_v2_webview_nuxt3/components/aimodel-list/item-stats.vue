<template>
    <div class="model-item-stats block">
        <div class="model-title flex items-center">
            <div class="model-images model-image-md">
                <NuxtImg
                    :src="imgSrc"
                    :alt="item.modelKoName"
                    width="40"
                    height="33"
                    format="webp"
                    :loading="lazyLoad ? 'lazy' : 'eager'"
                    @error="() => imgSrc = `${config.public.IMAGE_URL}lab2ai/app-logo.png`"
                    class="object-cover h-full"
                />
            </div>
            <h1 class="text-h4 ml-2">{{ item.modelKoName }}</h1>
            <CommonPartsTradeType :trade-type="item.modelType" class="ml-2"/>
        </div>
        <div class="stats flex mt-space-between-y-sm">
            <div class="left flex-1 flex items-center justify-between">
                <div class="flex items-center">
                    <p class="text-h4 -mt-0.5 mr-1">🎯</p>
                    <h2 class="text-body-4">수익 적중률</h2>
                </div>
                <div class="mr-[22px]">
                    <CommonPartsEarningRate
                        v-if="item.successRate"
                        :earning="item.successRate.truncateDecimal(100) ?? 0"
                        :size="16"
                    />
                    <span v-else class="text-body-3 text-font-dark-03">집계 중</span>
                </div>
            </div>
            <div class="right flex-1 flex items-center justify-between">
                <div class="flex items-center">
                    <p class="text-h4 -mt-0.5 mr-1">👍🏻</p>
                    <h2 class="text-body-4">최고 수익률</h2>
                </div>
                <div class="text-price-profit">
                    <CommonPartsEarningRate
                        v-if="item.maxEarningRate"
                        :earning="item.maxEarningRate.truncateDecimal(100) ?? 0"
                        :size="16"
                    />
                    <span v-else class="text-body-3 text-font-dark-03">집계 중</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import type { PredictionModelItem } from '~/composables/aimodel/service/_types';


const { item } = defineProps<{
    item: PredictionModelItem;
    lazyLoad: boolean;
}>();

const config = useRuntimeConfig();
let imgSrc = `${config.public.IMAGE_URL}version2/model-image/medium/${item.modelId}.png`;


</script>