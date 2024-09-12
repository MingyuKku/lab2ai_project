<template>
    <div class="imeline-item chart-pattern py-3 px-primary">
        <div class="label flex items-center">
            <div class="icon mr-1.5"><IconContentChartPattern /></div>
            <h2 class="text-cap-1m">차트 패턴</h2>
            <span class="text-[11px] text-font-dark-03 ml-1.5">{{ createdAtDiffNow }}</span>
        </div>
        <div class="info-content flex items-center mt-2">
            <p class="text-body-2">{{ timelineItem.description }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ICryptoTimelineItem } from '~/composables/coin/tab-contents/service/_types';

const { timelineItem } = defineProps<{
    timelineItem: ICryptoTimelineItem
}>();

const createdAtDiffNow = Date.parseUtcToLocal(timelineItem.createdAt).diffNow();
</script>