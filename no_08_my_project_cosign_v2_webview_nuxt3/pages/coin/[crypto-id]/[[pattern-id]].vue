<template>
    <div class="crypto-detail-page">
        <div class="chart-view-wrap bg-bg-gray-04 mb-2.5">
            <div class="flex justify-between py-[8px] px-[12px] relative">
                <div class="flex">
                    <div class="px-[12px] text-cap-1m align-middle"
                        v-for="i in intervals" :key="i.value"
                        :class="{
                            'text-black': interval === i.value,
                            'text-font-dark-02': interval !== i.value,
                            'pl-[4px] pr-[12px]': i.value === '1',
                            'px-[12px]': i.value !== '1',
                        }"
                        @click="interval = i.value">
                        {{i.text}}
                    </div>
                </div>
                <div class="exchange-image" v-if="cryptoInfo">
                    <NuxtImg
                        v-if="cryptoInfo.exchange === 'upbit'"
                        src="https://kr.object.ncloudstorage.com/cosign/version2/sign/upbit.png"
                        alt="upbit"
                        width="45" height='18'
                        class="w-[45px] h-[18px]"
                        loading="lazy"
                        format="webp"
                    />
                    <NuxtImg
                        v-else-if="cryptoInfo.exchange === 'binance'"
                        src="https://kr.object.ncloudstorage.com/cosign/version2/sign/binance.png"
                        alt="binance"
                        width="80" height='18'
                        class="w-[80px] h-[18px]"
                        loading="lazy"
                        format="webp"
                    />
                </div>
            </div>
            <div ref="containerRef" class="tv-tech-chart-view h-[324px]"></div>
        </div>
        <div class="tab-contents-wrap bg-bg-white">
            <CoinTabContentsTabNav 
                :exchange="cryptoInfo?.exchange"
                :tab-index="tabIndex"
                :on-click-tab-nav="onClickTabNav"
            />
            <CoinTabContentsTimeline 
                v-if="tabIndex === 'timeline'"
                :move-by-seconds="moveBySeconds"
            />
            <CoinTabContentsSignlist 
                v-else-if="tabIndex === 'signs' && cryptoInfo" 
                :crypto-info="cryptoInfo" 
            />
            <div
                v-if="tabIndex === 'pattern'"
                class="pb-space-page-bottom"
            >
                <div v-if="isLoading"
                    class="flex justify-center h-[100px] items-center">
                    <CommonLoadingSpinnerMoreFetchPending />
                </div>
                <CoinTabContentsPatterns
                    v-else-if="patternStatType && patternStat && buttonPatternId"
                    :pattern-stat="patternStat"
                    :pattern-stat-type="patternStatType"
                    :change-pattern-stat-type="(i) => patternStatType = i"
                    :buttons="buttons"
                    :selected-button-pattern-id="buttonPatternId"
                    :set-pattern-id="(i) => buttonPatternId = i"
                    :interval="interval"
                    class="pb-space-bottom-lg"
                />
                <CoinTabContentsPatternsNoPattern 
                    v-else-if="cryptoId !== null"
                    :crypto-id="cryptoId"
                />
                <CommonAd
                    class="min-h-[100px] bg-bg-white text-center"
                    :adsense="{
                        slot: '9339594852',
                        format: 'fluid',
                        layoutKey: '-fb+5w+4e-db+86',
                        style: {
                            'display': 'block',
                        }
                    }"
                    :adfit="{
                        src: '//t1.daumcdn.net/kas/static/ba.min.js',
                        unit: 'DAN-PNsOsE2TSrEquzd5',
                        width: '300',
                        height: '100',
                    }"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useFetchCryptoInfo } from '~/composables/coin/useFetchCryptoInfo';

import { useCDChart } from '~/composables/coin/tv-tech-chart/services/useCDChart';
import { EInterval } from '~/composables/_tv-tech-chart/_types';
import { createIntervalTexts, getTextByInterval } from '~/composables/_tv-tech-chart/common';
import { CRYPTO_DETAIL_INFO } from '~/composables/_app/asyncDataFetchKeys';
import type { CryptoDetailPageQueryContentsType } from '~/composables/coin/tab-contents/business/_types';
import type { LocationQuery } from 'vue-router';
import type { TradeExchangeType } from '~/composables/home/service/_types';
import { useCoinTabIndex } from '~/composables/coin/useTabIndex';
import { useCoinDetailMetaHeadOg } from '~/composables/coin/useCoinDetailMetaHeadOg';


definePageMeta({
    // middleware: 'coin-detail-page',
})

const { params } = useRoute();

const paramCryptoId = typeof(params.cryptoid) === 'string'? parseInt(params.cryptoid) : null;
// const cryptoInfo = await useFetchCryptoInfo(cryptoId);


const intervals = [
    EInterval.M1, EInterval.M5, EInterval.H1, EInterval.H4, EInterval.D1, EInterval.D7
].map(interval => getTextByInterval(interval));
// const intervals = createIntervalTexts();
        
const {
    interval,
    symbolName,
    buttons, buttonPatternId,
    isLoading,
    patternStatType, patternStat,
    create, moveBySeconds, setPatternVisible
} = useCDChart();

const {
    cryptoId,
    exchange,
    tabIndex,
    cryptoInfo,
    onClickTabNav,
    initTabSelection,
    initCryptoInfo,
} = useCoinTabIndex(paramCryptoId, setPatternVisible);


watch(
  () => {
    const { params: {patternid} } = useRoute();

    return patternid;
  },
  (value) => {
    buttonPatternId.value = typeof(value) === 'string' ? parseInt(value) : null;
  },
);

const containerRef = ref<HTMLElement | null>(null);

onMounted(async () => {
    const { query } = useRoute();

    await initCryptoInfo();
    useCoinDetailMetaHeadOg(cryptoInfo.value);
    await initTabSelection(query.tabIndex as CryptoDetailPageQueryContentsType ?? null, 
            buttonPatternId.value);
      
    if(containerRef.value && cryptoId.value) {
        create(containerRef.value, cryptoId.value, buttonPatternId.value);
    }

    // routeUpbit();
});

onUnmounted(() => {
    // clearStore();
})

</script>