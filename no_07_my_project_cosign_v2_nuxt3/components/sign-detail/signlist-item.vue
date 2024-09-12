<template>
    <div class="sign-detail-signlist-item">
        <NuxtLink
            :to="`/${item.modelId}/${item.subSeqId}`"
            class="signlist-item relative flex items-center justify-between h-16"
        >
            <div class="left flex items-center h-full">
                <div class="crypto flex items-center">
                    <div class="crypto-image w-6 h-6 shrink-0">
                        <NuxtImg
                            :src="`${$config.public.IMAGE_URL}coin-image/v1/${item.digitalAssetsId}.png`"
                            :alt="item.digitalAssetsKoName"
                            format="webp"
                            loading="lazy"
                            width="24"
                            height="24"
                        />
                    </div>
                    <span v-if="item.tradeType === 'SPOT'" class="ml-2 text-body-3">{{ item.digitalAssetsKoName }}</span>
                    <span v-if="item.tradeType === 'FUTURES'" class="ml-2 text-body-3">{{ item.cryptoFullCode }}</span>
                </div>
            </div>
            <div class="right flex items-center h-full">
                <div class="futures-position-type px-3">
                    <div class="wrap flex justify-center">
                        <CommonPartsFreeSign v-if="isFreeSign(item.ticket, item.pay, item.signStatusType)" />
                        <div v-else-if="item.tradeType === 'FUTURES'">
                            <CommonPartsTradePositionTypeBoxFuturesBlur v-if="isSignBlur(item.pay, item.ticket, item.signStatusType)" size="small" />
                            <CommonPartsTradePositionTypeBoxFutures
                                v-else
                                size="small"
                                :bg-color-class="item.positionType === 'LONG' ? 'bg-position-long' : 'bg-position-short'"
                                :label="tradeFuturesPositionTypeText"
                                :leverage="item.leverage"
                            />
                        </div>
                        <div v-else-if="item.tradeType === 'SPOT'">
                            <CommonPartsTradePositionTypeBoxSpotBlur v-if="isSignBlur(item.pay, item.ticket, item.signStatusType)" size="small" />
                            <CommonPartsTradePositionTypeBoxSpot v-else size="small" />
                        </div>
                    </div>
                </div>
                <div class="earning text-right pr-1 w-[70px] overflow-hidden">
                    <span class="text-cap-1m text-font-dark-03">{{ item.signStatusType === 'END' ? '실현 수익률' : '목표 수익률' }}</span>
                    <CommonPartsEarningRate
                        :earning="(item.earningRate ?? item.targetEarningRate).truncateDecimal(100)"
                        :size="16"
                        class="text-ellipsis overflow-hidden text-end"
                        :class="(item.earningRate ?? item.targetEarningRate) > 0 ? 'text-position-long' : (item.earningRate ?? item.targetEarningRate) === 0 ? 'text-font-dark-03' : 'text-position-short'"
                    />
                </div>
            </div>
        </NuxtLink>
    </div>
</template>


<script lang="ts" setup>
import type { RecentSignList } from '~/composables/sign-detail/service/_types';
import { isFreeSign, isSignBlur } from '~/composables/home/business/_methods';

const { item } = defineProps<{
    item: RecentSignList;
}>();

const tradeFuturesPositionTypeText = computed(() => {
    if (item.positionType === 'LONG') return 'Long';
    if (item.positionType === 'SHORT') return 'Short';
    else return '';
})

</script>