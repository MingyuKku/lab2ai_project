<template>
    <div class="discover-lightweight-chart-view">
        <div ref="chartDomRef" class="chart"></div>
    </div>
</template>

<script lang="ts" setup>
import type { RoiChart } from '~/composables/discover/copy-trading/service/_types';
import { useLightweightChart } from '~/composables/discover/copy-trading/business/lightweight-chart/useLightweightChart';

const { items } = defineProps<{
    items: RoiChart;
}>();

const { chartDomRef, initData, createChart, drawChart, createPriceLine } = useLightweightChart();

initData(items.chartPointList, items.topROI);


onMounted(() => {
    createChart();
    drawChart();
    // createPriceLine()
})


</script>