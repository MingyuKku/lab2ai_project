<template>
    <div
        class="crypto-title flex items-end justify-between"
        :class="{'items-center': item.simpleStatusType === 'end'}"
    >
        <div
            @click.stop="onClickCrypto"
            class="left flex items-center"
        >
            <div
                class="crypto-image w-9 h-9 mr-2 bg-center bg-cover bg-no-repeat"
                :style="cryptoBg"
            >
            </div>
            <div class="crypto-info">
                <h1 v-if="item.tradeExchangeType === 'UPBIT'" class="text-h2 text-font-black pb-space-between-y-xs">{{ item.cryptoCurrencyItem.digitalAssetsKoName }}</h1>
                <h1 v-if="item.tradeExchangeType === 'BINANCE'" class="text-h2 text-font-black pb-space-between-y-xs">{{ item.cryptoCurrencyItem.cryptoFullCode }}</h1>
                <div v-if="item.simpleStatusType !== 'end'" class="price flex items-center text-cap-1r">
                    <p class="text-font-dark-01">현재가</p>
                    <div
                        v-if="tradePrice" class="ml-0.5"
                        :class="change === 'RISE' ? 'text-position-long' : change === 'FALL' ? 'text-position-short' : 'text-font-black'"
                    >
                        <span v-if="item.tradeExchangeType === 'BINANCE'">{{ tradePrice }} USDT</span>
                        <span v-if="item.tradeExchangeType === 'UPBIT'">{{ tradePrice }}원</span>
                    </div>
                    <CommonLoadingSpinnerLdsEllipsis v-else class="ml-2" />
                </div>
            </div>
        </div>
        <div class="right">
            <div v-if="item.tradeType === 'FUTURES'">
                <CommonPartsTradePositionTypeBoxFuturesBlur v-if="isSignBlur(item.pay, item.ticket, item.simpleStatusType)" size="medium" />
                <CommonPartsTradePositionTypeBoxFutures
                    v-else
                    :bg-color-class="item.positionType === 'LONG' ? 'bg-position-long' : 'bg-position-short'"
                    :label="item.positionTypeText"
                    :leverage="item.leverage"
                    size="medium"
                />
            </div>
            <CommonPartsTradePositionTypeBoxSpot v-if="item.tradeType === 'SPOT'" size="medium" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { UpbitTickerChangeType } from '~/composables/home/business/_types';
import type { ClassHomeSignItem } from '~/composables/home/service/_types';
import { isSignBlur } from '~/composables/home/business/_methods';
import { messageWebview } from '~/composables/_app/useFlutterWebview';


const { item, imageBase } = defineProps<{
    item: ClassHomeSignItem;
    tradePrice: number | string | null;
    change: UpbitTickerChangeType | null;
    imageBase: string;
}>();


const cryptoBg = computed(() => ({
    'background-image': `url(${imageBase}coin-image/v1/${item.cryptoCurrencyItem.digitalAssetsId}.png)`
}))

const onClickCrypto = () => {
    // messageWebview(`2.0.0: {"major": "route","category": "coinDetail","title": "${item.cryptoCurrencyItem.digitalAssetsKoName}","params": {"digitalAssetId": ${item.cryptoCurrencyItem.digitalAssetsId},"cryptoCurrencyId": ${item.cryptoCurrencyItem.cryptoCurrencyId},"content": "timeline"}}`)
    messageWebview(`https://cosign/coin_detail/timeline?digitalAssetsId=${item.cryptoCurrencyItem.digitalAssetsId}&digitalAssetsName=${item.cryptoCurrencyItem.digitalAssetsKoName}&cryptoCurrencyId=${item.cryptoCurrencyItem.cryptoCurrencyId}`)
}

</script>