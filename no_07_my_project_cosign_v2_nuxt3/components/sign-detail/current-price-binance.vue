<template>
    <div class="current-price mt-1">
        <div class="price flex items-center text-cap-1r">
            <p class="text-font-dark-01 mr-0.5">현재가</p>
            <div
                v-if="binanceUiData.tradePrice"
                :class="binanceUiData.change === 'RISE' ? 'text-position-long' : binanceUiData.change === 'FALL' ? 'text-position-short' : 'text-font-black'"
            >
                <span>{{ binanceUiData.tradePrice }} USDT</span>
            </div>
            <CommonLoadingSpinnerLdsEllipsis v-else class="ml-2" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useBinanceSocket } from '~/composables/home/business/useBinanceSocket';


const { digitalAssetsCode } = defineProps<{
    digitalAssetsCode: string;
}>();


const { connectBinance, binanceUiData } = useBinanceSocket(digitalAssetsCode);

onMounted(() => {
    connectBinance();
})

</script>