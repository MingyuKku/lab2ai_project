<template>
    <div class="rate-bar-graph-wrap">
        <div
            class="graph flex rounded overflow-hidden"
            :style="{height: `${barHeight ?? 26}px`}"
        >
            <div
                class="left flex bg-gradient-to-r from-[#76E2C8] to-[#00C696]"
                :class="{'px-2': (parseFloat(leftRate.toFixed(0)) || 0) > 7}"
                :style="{width: `${leftRate}%`}"
            >
                <CommonPartsEarningRate v-if="(parseFloat(leftRate.toFixed(0)) || 0) > 7" :earning="Number(leftRate.toFixed(0))" :size="14" class="text-font-white"/>
            </div>
            <div
                class="right flex justify-end bg-gradient-to-r from-[#F33652] to-[#FF7697]"
                :class="{'px-2': (parseFloat(rightRate.toFixed(0)) || 0) > 7}"
                :style="{width: `${100 - leftRate}%`}"
            >
                <CommonPartsEarningRate v-if="(parseFloat(rightRate.toFixed(0)) || 0) > 7" :earning="Number(rightRate.toFixed(0))" :size="14" class="text-font-white"/>
            </div>
        </div>
        <div v-if="(parseFloat(leftRate.toFixed(0)) || 0) <= 7" class="flex items-center justify-between">
            <div class="cramps-line-l py-[5px] px-2.5"><span class="text-price-14b text-font-dark-01">{{ leftRate.toFixed(0) }}%</span></div>
            <div></div>
        </div>
        <div v-if="(parseFloat(rightRate.toFixed(0)) || 0) <= 7" class="flex items-center justify-between">
            <div></div>
            <div class="cramps-line-r py-[5px] px-2.5"><span class="text-price-14b text-font-dark-01">{{ rightRate.toFixed(0) }}%</span></div>
        </div>
    </div>
</template>

<script lang="ts" setup>

defineProps<{
    leftRate: number;
    rightRate: number;
    barHeight?: number;
}>()


</script>