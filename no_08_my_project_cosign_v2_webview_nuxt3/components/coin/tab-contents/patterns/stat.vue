<template>
    <div class="pattern-statistics-wrap">
        <ul class="">
            <li 
                v-for="item,idx in intervalStats.slice(2)" :key="idx" 
                class="flex items-center justify-around relative h-[50px] px-primary" 
            >
                <span 
                    class="line line-top absolute w-full h-[1px] top-0 left-0" 
                    :class="selectedInterval === item.intervalType ? 'z-[2] block bg-border-gray-01': 'bg-border-gray-05'"
                ></span>
                <span 
                    class="line line-bottom absolute w-full h-[1px] left-0 -bottom-[1px] last:hidden" 
                    :class="selectedInterval === item.intervalType ? 'z-[2] bg-border-gray-01 -bottom-[1px] block' : 'bg-border-gray-05'"
                ></span>
                <span 
                    class="line line-left absolute h-full top-0 left-0" 
                    :class="selectedInterval === item.intervalType ? 'bg-bg-black w-1 z-[2] block' : 'bg-border-gray-05 w-px'"
                ></span>
                <span
                    class="line line-right absolute w-px h-full right-0 top-0" 
                    :class="selectedInterval === item.intervalType ? 'bg-border-gray-01 z-[2] block': 'bg-border-gray-05'"
                ></span>
                <div class="interval flex items-center justify-center flex-col">
                    <p :class="selectedInterval === item.intervalType ? 'text-cap-1b':'text-cap-1r'" class="">{{ getTextPatternStatType(item.intervalType) }}</p>
                    <span class="text-cap-2m font-normal mt-0.5">봉 통계</span>
                </div>
                <div class="capture flex items-center justify-between w-[91px]">
                    <span class="text-cap-1m whitespace-nowrap">포착</span>
                    <p class="text-cap-1r">
                        <span class="inline-block w-[52px] whitespace-nowrap text-right">{{ numFormat(item.intervalCount) }}</span></p>
                        <span class="text-cap-1r ml-0.5">건</span>
                </div>
                <div class="chart flex items-center w-[136px]">
                    <CoinTabContentsPatternsDonut
                        size="30"
                        :leftRate="item.intervalDownRate"
                        :rightRate="item.intervalUpRate"
                        :disable="item.intervalCount === 0"
                    />
                    <div v-if="item.intervalUpRate || item.intervalCount === 0" class="up flex-1 whitespace-nowrap mr-1">
                        <IconObjectPolygon :fill="item.intervalCount === 0 ? '#929AA5' : '#0EB48C'" class="inline-block mr-1" />
                        <CommonPartsEarningRate
                            :earning="item.intervalUpRate.truncateDecimal(1)"
                            :size="12"
                            :class="item.intervalCount === 0 ? 'text-[#929AA5]' : 'text-position-long'"
                            class="inline-block"
                        />
                    </div>
                    <div v-if="item.intervalDownRate || item.intervalCount === 0" class="down flex-1 whitespace-nowrap">
                        <IconObjectPolygon class="inline-block rotate-180 mr-1" :fill="item.intervalCount === 0 ? '#929AA5' : '#F33753'" />
                        <CommonPartsEarningRate
                            :earning="item.intervalDownRate.truncateDecimal(1)"
                            :size="12"
                            :class="item.intervalCount === 0 ? 'text-[#929AA5]' : 'text-position-short-goal-3'"
                            class="inline-block"
                        />
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import type { EInterval } from '~/composables/_tv-tech-chart/_types';
import type { IPatternStatInterval } from '~/composables/coin/tv-tech-chart/services/_types';
import { getTextPatternStatType, getPatternStatTypeByInterval } from '~/composables/coin/tv-tech-chart/services/_common';
import { useInstance } from '~/composables/_api/useInstance';


const {
    intervalStats, interval
} = defineProps<{
    intervalStats: IPatternStatInterval[];
    interval: EInterval;
    numFormat: (value: string | number) => string;
}>();

const selectedInterval = getPatternStatTypeByInterval(interval);



</script>