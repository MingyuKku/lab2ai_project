<template>
    <div class="relative pb-space-between-y-xs">
        <div
            class="symbol w-[22px] h-[22px] flex items-center justify-center rounded-full"
            :class="checkSymbolCondition ? (positionType === 'LONG' || positionType === null) ? 'bg-position-long' : 'bg-position-short' : 'bg-bg-gray-02'"
        >
            <div class="w-2"><IconBrandCosign2 :fill="checkSymbolCondition ? 'white' : '#9B9B9B'" /></div>
        </div>
        <h1
            class="absolute left-1/2 -bottom-0.5 -translate-x-1/2 translate-y-full text-cap-2m whitespace-nowrap"
            :class="
                checkSymbolCondition
                ? `font-medium ${(positionType === 'LONG' || positionType === null) ? 'text-position-long' : 'text-position-short'}`
                : 'font-normal text-font-dark-03'"
            >{{ label }}</h1>
    </div>
</template>

<script lang="ts" setup>
import type { TradeFuturesPositionType } from '~/composables/home/service/_types';


defineProps<{
    label: string;
    checkSymbolCondition: boolean;
    positionType: TradeFuturesPositionType | null;
}>()






</script>