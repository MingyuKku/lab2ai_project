<template>
    <div class="copy-trading-model-stats flex items-center justify-between">
        <div class="win-rate">
            <span class="text-cap-1r text-font-dark-01">WinRate</span>
            <CommonPartsEarningRate
                :earning="items.winRate.truncateDecimal(100)"
                :size="13"
                class="inline-block ml-1"
                :class="{
                    'text-price-profit': items.winRate > 0,
                    'text-position-short': items.winRate < 0,
                }"
            />
        </div>
        <div class="mdd">
            <span class="text-cap-1r text-font-dark-01">MDD</span>
            <CommonPartsEarningRate
                :earning="items.mdd.truncateDecimal(100)"
                :size="13"
                class="inline-block ml-1"
                :class="{
                    'text-price-profit': items.mdd > 0,
                    'text-position-short': items.mdd < 0,
                }"
            />
        </div>
        <div class="sharp-ratio">
            <span class="text-cap-1r text-font-dark-01">SharpRatio</span>
            <span class="text-price-13m ml-1">{{ items.sharpRatio.truncateDecimal(100) }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { CopyTradingRankMeta } from '~/composables/discover/copy-trading/service/_types';


defineProps<{
    items: CopyTradingRankMeta;
}>();

</script>