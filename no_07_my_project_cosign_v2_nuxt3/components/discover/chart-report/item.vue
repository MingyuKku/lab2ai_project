<template>
    <div class="discover-rank-item px-primary">
        <DiscoverChartReportItemTitle
            :fetchParamRankMetaType="fetchParamRankMetaType"
        />
        <div class="">
            <NuxtLink
                v-for="(item, idx) in items" :key="idx"
                :to="`/coin/${item.cryptoCurrencyId}`"
                class="flex items-center justify-between py-3 border-b border-border-gray-05 last:border-none"
            >
                <div class="crypto flex items-center">
                    <div class="image w-6 h-6">
                        <NuxtImg
                            :src="`${imageBase}coin-image/v1/${item.digitalAssetsId}.png`"
                            :alt="item.digitalAssetsKoName"
                            width="24" height="24"
                            format="webp"
                        />
                    </div>
                    <p class="text-body-3 ml-2">{{ item.digitalAssetsKoName }}</p>
                </div>
                <div class="right flex items-center">
                    <div v-if="fetchParamRankMetaType === 'RANK_META_MARKET_CAPITALIZATION'" class="price">
                        <span class="text-price-14b leading-none">{{ numFormat((item.price / 100000000).toFixed(0)) }}</span>
                        <span class="text-cap-2m leading-none ml-px">억원</span>
                    </div>
                    <div v-else class="price">
                        <span class="text-price-14b leading-none">{{ numFormat(item.price) }}</span>
                        <span class="text-[11px] leading-none ml-0.5">원</span>
                    </div>
                    <div
                        v-if="item.fluctuateRange"
                        class="volatility flex items-center justify-center min-w-16 ml-3 rounded pb-0.5"
                        :class="{
                            'bg-position-long': item.fluctuateRange >= 0,
                            'bg-position-short': item.fluctuateRange < 0,
                        }"
                    >
                        <CommonPartsEarningRate
                            :earning="numberFormat(fetchParamRankMetaType === 'RANK_META_TRADING_VOLUME' ? item.fluctuateRange.truncateDecimal(1) : item.fluctuateRange.truncateDecimal(100))"
                            :size="14"
                            class="text-font-white"
                            :class="{'w-[75px]': fetchParamRankMetaType === 'RANK_META_TRADING_VOLUME'}"
                        />
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useInstance } from '~/composables/_api/useInstance';
import type { DiscoverChartFetchParamsRankMetaType } from '~/composables/discover/chart-report/business/_types';
import type { RankMeta } from '~/composables/discover/chart-report/service/_types';

defineProps<{
    items: RankMeta[] | null;
    fetchParamRankMetaType: DiscoverChartFetchParamsRankMetaType;
    imageBase: string;
    numFormat: (value: string | number) => string;
}>();

const { numberFormat } = useInstance();

</script>