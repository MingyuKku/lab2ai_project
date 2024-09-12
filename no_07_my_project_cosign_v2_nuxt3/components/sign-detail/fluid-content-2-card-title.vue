<template>
    <div class="crypto flex items-center justify-between">
        <div @click.prevent="onClickCrypto" class="flex items-center">
            <div class="crypto-imag w-8 h-8">
                <NuxtImg
                    :src="`${$config.public.IMAGE_URL}coin-image/v1/${item.cryptoCurrencyItem.digitalAssetsId}.png`"
                    alt="btc"
                    width="32" height="32"
                    format="webp"
                    loading="lazy"
                />
            </div>
            <h1 v-if="item.tradeType === 'SPOT'" class="text-body-2 ml-1.5">{{ item.cryptoCurrencyItem.digitalAssetsKoName }}</h1>
            <h1 v-if="item.tradeType === 'FUTURES'" class="text-body-2 ml-1.5">{{ item.cryptoCurrencyItem.cryptoFullCode }}</h1>
        </div>
        <div class="type">
            <div v-if="item.tradeType === 'FUTURES'">
                <CommonPartsTradePositionTypeBoxFuturesBlur v-if="isSignBlur(item.pay, item.ticket, item.simpleStatusType)" size="medium" />
                <CommonPartsTradePositionTypeBoxFutures
                    v-else
                    :bg-color-class="item.positionType === 'LONG' ? 'bg-position-long' : 'bg-position-short'"
                    :label="item.positionTypeText"
                    :leverage="item.leverage"
                    size="small"
                />
            </div>
            <CommonPartsTradePositionTypeBoxSpot v-if="item.tradeType === 'SPOT'" size="small" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ClassAnotherModelSignItem } from '~/composables/sign-detail/service/_types';
import { isSignBlur } from '~/composables/home/business/_methods';


const { item } = defineProps<{
    item: ClassAnotherModelSignItem;
}>();


const onClickCrypto = () => {
    navigateTo(`/coin/${item.cryptoCurrencyItem.cryptoCurrencyId}`);
}


</script>