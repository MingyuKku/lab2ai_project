<template>
    <div class="discover-copy-trading bg-bg-white px-primary pt-space-top-lg pb-space-page-bottom">
        <div class="title flex items-center">
            <div class="icon relative w-[38px] h-[38px] bg-black rounded-full flex justify-center items-center">
                <IconBrandCosign class="w-7" />
            </div>
            <h1 class="text-h2 ml-2">COSIGN 카피트레이딩</h1>
        </div>
        <div v-if="info" class="infomation-area">
            <div class="trade-type flex justify-end mb-space-between-y-ssm">
                <div class="flex items-center">
                    <div class="logo w-[66px]"><IconBrandBinanceFull /></div>
                    <span class="text-cap-2m text-font-dark-01 ml-1">기준</span>
                </div>
            </div>
            <div class="main-infomation flex justify-between">
                <div class="left shrink-0 w-[158px]">
                    <span class="text-cap-1r text-font-dark-01">{{ info.period }}일</span>
                    <div class="flex items-center">
                        <span class="text-h1_5">ROI</span>
                        <CommonPartsEarningRate
                            :earning="info.roi.truncateDecimal(100)" :size="20"
                            class="ml-1.5 leading-none"
                            :class="info.roi > 0 ? 'text-price-profit' : 'text-position-short'"
                        />
                    </div>
                    <div class="flex items-center">
                        <span class="text-body-4">PnL</span>
                        <p class="text-price-13m ml-1" :class="{'text-position-short': info.pnl.price < 0}">{{ numberFormat(info.pnl.price) }}
                            <span class="text-cap-2m text-font-dark-01 ml-px">{{ info.pnl.currencyCode }}</span>
                        </p>
                    </div>
                </div>
                <div class="right flex-1 ml-4">
                    <DiscoverCopyTradingLightweightChartView
                        :items="info.roiChart"
                    />
                </div>
            </div>
            <DiscoverCopyTradingModelStats :items="info" class="mt-space-between-y-sm pb-space-between-y-sm"/>
        </div>
        <DiscoverCopyTradingPartnerExchange />
    </div>
</template>

<script lang="ts" setup>
import { useInstance } from '~/composables/_api/useInstance';
import { COPY_TRADING_INFO } from '~/composables/_app/asyncDataFetchKeys';
import { useFetchDiscoverCopyTrading } from '~/composables/discover/copy-trading/service/useFetchDiscoverCopyTrading';


const { getCopyTradingInfo } = useFetchDiscoverCopyTrading();
const { numberFormat } = useInstance();

const {
    data: info
} = await useAsyncData(
    COPY_TRADING_INFO,
    () => getCopyTradingInfo(COPY_TRADING_INFO)
)

</script>