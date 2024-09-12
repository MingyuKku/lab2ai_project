<template>
    <div class="price">
        <div v-if="questionCondition">
            <span v-if="questionCount" class="text-price-17b">
                <i v-for="count in questionCount" :key="count" class="ml-0.5">?</i>
            </span>
            <!-- <CommonPartsQuestionMark class="inline-block" /> -->
            <span v-if="tradeExchangeType === 'BINANCE'" class="text-body-2r text-font-dark-01 ml-0.5 align-bottom">USDT</span>
            <span v-if="tradeExchangeType === 'UPBIT'" class="text-body-2r text-font-dark-01 ml-0.5 align-bottom">원</span>
        </div>
        <div v-else>
            <span class="text-price-17b" :class="priceColorBind">{{ price }}</span>
            <span v-if="tradeExchangeType === 'BINANCE'" class="text-body-2r text-font-dark-01 ml-0.5">USDT</span>
            <span v-if="tradeExchangeType === 'UPBIT'" class="ttext-body-2r text-font-dark-01 ml-0.5">원</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { TradeExchangeType } from '~/composables/home/service/_types';


defineProps<{
    questionCondition: boolean;
    questionCount: number | null;
    tradeExchangeType?: TradeExchangeType;
    price?: number | string;
    priceColorBind?: any;
}>();


</script>