<template>
    <div ref="itemRef" class="coin-detail-page-tab-contents-sign-item">
        <div
            @click="onClickSignItem"
            class="signlist-item relative flex items-center justify-between h-16"
        >
            <div v-if="!isLast" class="bottom-line absolute w-[calc(100%-50px)] bottom-0 right-0 h-px bg-border-gray-04"></div>
            <div class="left flex items-center h-full">
                <div class="sign-status pr-primary">
                    <div class="w-[34px] flex flex-col items-center">
                        <CommonLoadingSpinnerLdsEllipsis v-if="item.signStatusType !== 'END'" class="mb-2.5" />
                        <span class="text-cap-1b whitespace-nowrap" :class="item.signStatusType === 'END' ? 'text-font-dark-01' : 'text-price-profit'">
                            {{ item.signStatusType === 'END' ? '종료' : '진행중' }}
                        </span>
                    </div>
                </div>
                <div class="crypto flex items-center">
                    <div class="crypto-image w-6 h-6 shrink-0 bg-center bg-cover bg-no-repeat" :style="cryptoBg">
                    </div>
                    <span v-if="item.tradeType === 'SPOT'" class="ml-1.5 text-body-3">{{ item.digitalAssetsKoName }}</span>
                    <span v-if="item.tradeType === 'FUTURES'" class="ml-1.5 text-body-3">{{ item.cryptoFullCode }}</span>
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
                        v-if="!isBuyFail(item.signStatusType, item.earningRate)"
                        :earning="(item.earningRate ?? item.targetEarningRate).truncateDecimal(100)"
                        :size="16"
                        class="text-ellipsis overflow-hidden text-end"
                        :class="(item.earningRate ?? item.targetEarningRate) > 0 ? 'text-position-long' : (item.earningRate ?? item.targetEarningRate) === 0 ? 'text-font-dark-02' : 'text-position-short'"
                    />
                    <span v-else class="text-font-dark-02 text-cap-1b">진입 실패</span>
                </div>
            </div>
        </div>
        <CommonAd
            v-if="adShow"
            class="bg-bg-white min-h-[100px]"
            :adsense="{
                slot: '4972974439',
                format: 'fluid',
                layoutKey: '-fb+5w+4e-db+86',
                style: {
                    'display': 'block',
                }
            }"
            :adfit="{
                src: '//t1.daumcdn.net/kas/static/ba.min.js',
                unit: 'DAN-ztDxXbJQKJldgGMK',
                width: '320',
                height: '100',
            }"
        />
    </div>
</template>

<script lang="ts" setup>
import type { CryptoSignList } from '~/composables/coin/tab-contents/service/_types';
import { isFreeSign, isSignBlur } from '~/composables/home/business/_methods';
import { useIntersectObserver } from '~/composables/aimodel-detail/business/useIntersectObserver';
import { messageWebview } from '~/composables/_app/useFlutterWebview';
import { useSignState } from '~/composables/sign-detail/business/useSignState';


const { item, isLast, isMoreEnd, refresh, imageBase } = defineProps<{
    item: CryptoSignList;
    adShow: boolean;
    isLast: boolean;
    isMoreEnd?: boolean;
    refresh?: () => Promise<void>;
    imageBase: string;
}>();


const itemRef = ref<HTMLDivElement | null>(null);

const cryptoBg = computed(() => ({
    'background-image': `url(${imageBase}coin-image/v1/${item.digitalAssetsId}.png)`
}))

const tradeFuturesPositionTypeText = computed(() => {
    if (item.positionType === 'LONG') return 'Long';
    if (item.positionType === 'SHORT') return 'Short';
    else return '';
})

const { isBuyFail } = useSignState();

const onClickSignItem = () => {
    messageWebview(`https://cosign/sign_detail?modelId=${item.modelId}&subSeqId=${item.subSeqId}&isFree=${isFreeSign(item.ticket, item.pay, item.signStatusType)}`)
}

onMounted(() => {
    if (
        isLast &&
        refresh &&
        !isMoreEnd
    ) {
        const { initIntersectObserver } = useIntersectObserver();

        initIntersectObserver(itemRef.value, refresh);
    }
})

</script>