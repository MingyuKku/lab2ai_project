<template>
    <div class="imeline-item sign py-3 px-primary">
        <div class="label flex items-center">
            <div class="icon mr-1"><IconContentSign /></div>
            <h2 class="text-cap-1m">SIGN</h2>
            <span class="text-[11px] text-font-dark-03 ml-1.5">{{ createdAtDiffNow }}</span>
        </div>
        <div class="info-content flex items-center mt-2">
            <p class="text-body-2">{{ startText }}</p>
            <CommonPartsEarningRate :earning="percentageValue" :size="15" class="text-price-profit leading-none mr-px ml-0.5" />
            <p class="text-body-2">{{ endText }}</p>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { ICryptoTimelineItem } from '~/composables/coin/tab-contents/service/_types';

const { timelineItem } = defineProps<{
    timelineItem: ICryptoTimelineItem
}>();

const createdAtDiffNow = Date.parseUtcToLocal(timelineItem.createdAt).diffNow();
const description = timelineItem.description;
const percentageIndex = description.indexOf('%');
const percentageStartIndex = description.substring(0, percentageIndex).lastIndexOf(' ', percentageIndex);
const percentageValue = parseFloat(description.substring(percentageStartIndex, percentageIndex));
const startText = description.substring(0, percentageStartIndex);
const endText = description.substring(percentageIndex+1);
</script>