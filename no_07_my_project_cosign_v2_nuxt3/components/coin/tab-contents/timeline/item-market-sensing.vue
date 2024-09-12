<template>
    <div class="timeline-item market-sensing py-3 px-primary">
        <div class="label flex items-center">
            <div class="icon mr-1"><IconContentMarketSensing /></div>
            <h2 class="text-cap-1m">시장감지</h2>
            <span class="text-[11px] text-font-dark-03 ml-1.5">{{ createdAtDiffNow }}</span>
        </div>
        <div class="info-content flex items-center mt-2">
            <p class="text-body-2">{{ splitted[0] }}</p>
            <p class="text-body-2" v-if="splitted.length > 1">:</p>
            <div 
                v-if="splitted.length > 1"
                class="flex items-center ml-1">
                <div class="flex items-end">
                    <p class="text-body-2">
                        {{ beforeValueText }}
                    </p>
                    <span class="text-body-5 ml-[2px]">
                        {{ unit }}
                    </span>
                </div>
                <span :class="afterColor"
                    class="text-[10px] px-[4px]">
                    &#9654;
                </span>
                <p :class="afterColor"
                    class="text-body-2"
                    >
                    {{ afterValueText }}
                </p>
                <span 
                    :class="afterColor"
                    class="text-body-5 ml-[2px]">
                    {{ unit }}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ICryptoTimelineItem } from '~/composables/coin/tab-contents/service/_types';

const { timelineItem } = defineProps<{
    timelineItem: ICryptoTimelineItem
}>();

const createdAtDiffNow = Date.parseUtcToLocal(timelineItem.createdAt).diffNow();
const splitted = timelineItem.description.split(/:|→/)

const beforeText = splitted.length > 2? splitted[1].trim() : null;
const afterText = splitted.length > 2? splitted[2].trim() : null;

const beforeValueText = beforeText !== null? beforeText.substring(0, beforeText.length - 1) : null;
const afterValueText = afterText !== null? afterText.substring(0, afterText.length - 1) : null;
const unit = afterText?.substring(afterText.length - 1);
const beforeValue = beforeValueText? parseFloat(beforeValueText.replaceAll(",", "")) : null;
const afterValue = afterValueText? parseFloat(afterValueText.replaceAll(",", "")) : null;
const isUp = (beforeValue ?? 0) <= (afterValue ?? 0);
const afterColor = isUp? "text-position-long" : "text-position-short";
</script>