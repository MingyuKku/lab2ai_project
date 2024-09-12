<template>
    <div class="title text-cap-2m text-font-dark-03 flex items-center justify-between pb-space-between-y-xs">
        <div class="crypto">코인명</div>
        <div
            v-if="fetchParamRankMetaType === 'RANK_META_SURGE' || fetchParamRankMetaType === 'RANK_META_PLUNGE'"
            class="right flex items-center"
        >
            <div class="price">가격</div>
            <div class="volatility min-w-16 ml-3 text-center">1시간 변동률</div>
        </div>
        <div
            v-if="fetchParamRankMetaType === 'RANK_META_TRADING_VOLUME'"
            class="right flex items-center"
        >
            <div class="price">가격</div>
            <div class="volatility min-w-16 ml-[23px] text-center">1시간 변동률</div>
        </div>
        <div v-if="fetchParamRankMetaType === 'RANK_META_MARKET_CAPITALIZATION'">
            <div class="volatility">시가총액</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { DiscoverChartFetchParamsRankMetaType } from '~/composables/discover/chart-report/business/_types';


defineProps<{
    fetchParamRankMetaType: DiscoverChartFetchParamsRankMetaType;
}>();

</script>