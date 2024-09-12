<template>
    <div class="top-rank-model bg-white pt-space-top-lg pb-6 px-primary">
        <div class="title flex items-center justify-between">
            <h1 class="text-h2">최근 적중률 <span :style="{ 'color': colors[0] }">Best 모델</span></h1>
            <p class="text-cap-2m text-font-dark-03">최근 7일 기준</p>
        </div>
        <div class="ranking-items flex items-center mt-2.5">
            <NuxtLink
                v-for="(item,idx) in items"
                :key="idx"
                :to="`/${item.modelId}`"
                class="item flex flex-col justify-between flex-1 pt-[13px] pb-primary px-3 rounded-xl mr-2 last:mr-0 shadow-01"
                :style="{ 'background-color': colors[idx] }"
            >
                <div>
                    <p class="box-ssm inline-block text-cap-1m bg-bg-white leading-none" :class="item.modelType === 'SPOT' ? 'text-font-dark-01' : 'text-position-long'">
                        {{ predictionModelMarketTypeText(item.modelType) }}
                    </p>
                    <p class="text-body-4 text-font-white mt-1.5 h-[37px]">{{ item.modelKoName }}</p>
                </div>
                <CommonPartsEarningRate
                    :earning="item.successRate.truncateDecimal(10)"
                    :size="17"
                    class="text-font-white text-start"
                />
            </NuxtLink>
        </div>
    </div>
</template>


<script lang="ts" setup>
import type { BestPredictionModel } from '~/composables/aimodel/service/_types';
import type { TradeType } from '~/composables/home/service/_types';


defineProps<{
    items: BestPredictionModel[];
}>();

const colors = [
    '#6F6BFF',
    '#6DB5DD',
    '#6FCDCD',
]

const predictionModelMarketTypeText = computed(() => {
    return (predictionModelMarketType: TradeType) => {
        if (predictionModelMarketType === 'FUTURES') return '선물';
        else if (predictionModelMarketType === 'SPOT') return '현물';
        else return '';
    }
})

</script>