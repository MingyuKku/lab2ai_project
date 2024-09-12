<template>
    <div class="sign-profile border-t-[1px] border-border-gray-05">
        <div v-if="item" class="px-primary pt-space-top-lg pb-space-between-y-md">
            <div class="flex">
                <div
                    @click="onClickModelItem"
                    class="model flex items-center mb-space-between-y-sm"
                >
                    <span class="text-body-3 text-font-dark-03">AI 모델</span>
                    <span class="text-body-3 ml-2">{{ item.modelName }}</span>
                    <div class="w-4 h-4 ml-1 rounded-full bg-bg-gray-04 flex items-center justify-center"><IconArrow /></div>
                </div>
            </div>
            <div class="flex">
                <div
                    @click='onClickCrypto'
                    class="crypto flex items-center"
                >
                    <div class="crypto-image w-9 h-9">
                        <NuxtImg
                            :src="`${$config.public.IMAGE_URL}coin-image/v1/${item.digitalAssetsId}.png`"
                            alt="btc"
                            width="36"
                            height="36"
                            loading="lazy"
                            format="webp"
                        />
                    </div>
                    <div class="ml-2">
                        <div class="flex items-center">
                            <h1 v-if="item.exchangeType === 'UPBIT'" class="text-h3">{{ item.digitalAssetsKoName }}</h1>
                            <h1 v-if="item.exchangeType === 'BINANCE'" class="text-h3">{{ item.cryptoFullCode }}</h1>
                            <!-- <span class="text-cap-1m text-font-dark-03 ml-1">{{ item.cryptoFullCode }}</span> -->
                        </div>
                        <SignDetailCurrentPriceUpbit v-if="item.signStatusType !== 'END' && item.exchangeType === 'UPBIT'" :digitalAssetsCode="item.digitalAssetsCode" />
                        <SignDetailCurrentPriceBinance v-if="item.signStatusType !== 'END' && item.exchangeType === 'BINANCE'" :digitalAssetsCode="item.digitalAssetsCode" />
                    </div>
                </div>
            </div>
            <div class="info flex items-center justify-between mt-4">
                <div class="time flex items-center">
                    <div class="validate py-1.5 px-2 border border-border-gray-04 text-cap-1m rounded">{{ item.validateMinText }}</div>
                    <div class="text-cap-2m text-font-dark-01 ml-2">
                        <span>{{ item.createdAtText }}</span>
                        ~ <span>{{ item.endTimeText }}</span>
                    </div>
                </div>
                <div class="type">
                    <div v-if="item.exchangeType === 'UPBIT'">
                        <CommonPartsTradePositionTypeBoxSpotBlur
                            v-if="isSignBlur(item.pay, item.ticket, item.signStatusType)" size="medium" />
                        <CommonPartsTradePositionTypeBoxSpot v-else size="medium" />
                    </div>
                    <div v-if="item.exchangeType === 'BINANCE'">
                        <CommonPartsTradePositionTypeBoxFuturesBlur
                            v-if="isSignBlur(item.pay, item.ticket, item.signStatusType)" size="medium" />
                        <CommonPartsTradePositionTypeBoxFutures
                            v-else
                            size="medium"
                            :bg-color-class="item.positionType === 'LONG' ? 'bg-position-long' : 'bg-position-short'"
                            :label="tradeFuturesPositionTypeText"
                            :leverage="item.leverage"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ClassSignDetailInfo } from '~/composables/sign-detail/service/_types';
import { isSignBlur } from '~/composables/home/business/_methods';
import { messageWebview } from '~/composables/_app/useFlutterWebview';

const { item } = defineProps<{
    item: ClassSignDetailInfo;
}>()


const tradeFuturesPositionTypeText = computed(() => {
    if (item.positionType === 'LONG') return 'Long';
    if (item.positionType === 'SHORT') return 'Short';
    else return '';
})

const onClickCrypto = () => {
    // messageWebview(`2.0.0: {"major": "route","category": "coinDetail","title": "${item.digitalAssetsKoName}","params": {"digitalAssetId": ${item.digitalAssetsId},"cryptoCurrencyId": ${item.cryptoId},"content": "timeline"}}`);

    messageWebview(`https://cosign/coin_detail/timeline?digitalAssetsId=${item.digitalAssetsId}&digitalAssetsName=${item.digitalAssetsKoName}&cryptoCurrencyId=${item.cryptoId}`)
}

const onClickModelItem = () => {
    // messageWebview(`2.0.0: {"major": "route", "category": "modelDetail", "title": "${item.modelName}", "params": {"modelId": "${item.modelId}", "tradeType": "${item.tradeType}"}}`)
    messageWebview(`https://cosign/model_detail?modelId=${item.modelId}&modelName=${item.modelName}&tradeType=${item.tradeType}`)
}

</script>