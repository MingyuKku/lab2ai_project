<template>
    <div class="sign-end pb-3">
        <div class="flex items-stretch pt-2 pb-3">
            <div class="left flex-1 flex flex-col items-center justify-center border-r border-border-gray-03">
                <h3 class="text-cap-2m">AI 예측 결과</h3>
                <div v-if="!isBuyFail(item.signStatusType, item.earningRate)" class="flex items-center mt-2">
                    <span class="text-body-1 text-font-dark-01">수익률</span>
                    <CommonPartsEarningRate
                        :size="20"
                        :earning="item.earningRate?.truncateDecimal(100) ?? 0"
                        :class="(item.earningRate ?? 0) >= 0 ? 'text-price-profit' : 'text-position-short'"
                        class="ml-1.5 text-font-dark-02"
                    />
                </div>
                <span v-else class="text-body-2 text-font-dark-01 mt-1.5">진입 실패</span>
            </div>
            <div class="right flex-1 flex flex-col items-center justify-center">
                <div class="flex items-center w-[135px]">
                    <span class="text-body-4 text-font-dark-01">진입 성공</span>
                    <CommonPartsIndicatorCircleShapeStatus :is-active="isBuySuccess()" class="ml-2">
                        <div class="w-3.5"><IconCheckSm :fill="isBuySuccess() ? '#FFFFFF' : '#D9DCE1'" /></div>
                    </CommonPartsIndicatorCircleShapeStatus>
                </div>
                <div class="flex items-center mt-2 w-[135px]">
                    <span class="text-body-4 text-font-dark-01">수익 성공</span>
                    <CommonPartsIndicatorCircleShapeStatus :is-active="isProfit()" class="ml-2">
                        <div class="w-3.5"><IconCheckSm :fill="isProfit() ? '#FFFFFF' : '#D9DCE1'" /></div>
                    </CommonPartsIndicatorCircleShapeStatus>
                </div>
                <div class="flex items-center mt-2 w-[135px]">
                    <span class="text-body-4 text-font-dark-01">목표 도달</span>
                    <div class="targets flex items-center">
                        <CommonPartsIndicatorCircleShapeStatus :is-active="isTarget1Pass()" class="ml-2">
                            <span class="text-cap-1b" :class="isTarget1Pass() ? 'text-font-white' : 'text-border-gray-03'">1</span>
                        </CommonPartsIndicatorCircleShapeStatus>
                        <CommonPartsIndicatorCircleShapeStatus :is-active="isTarget2Pass()" class="ml-2">
                            <span class="text-cap-1b" :class="isTarget2Pass() ? 'text-font-white' : 'text-border-gray-03'">2</span>
                        </CommonPartsIndicatorCircleShapeStatus>
                        <CommonPartsIndicatorCircleShapeStatus :is-active="isTarget3Pass()" class="ml-2">
                            <span class="text-cap-1b" :class="isTarget3Pass() ? 'text-font-white' : 'text-border-gray-03'">3</span>
                        </CommonPartsIndicatorCircleShapeStatus>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isEarlyEnd" class="px-primary mb-1">
            <div class="flex items-center justify-center py-2 text-cap-1r text-font-dark-01 border border-border-gray-04">
                {{ targetText }} {{ earlyTimeComputed }} 종료
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ClassSignDetailInfo } from '~/composables/sign-detail/service/_types';
import { useSignEndStateComputed } from '~/composables/sign-detail/business/useSignEndStateComputed';
import { useSignState } from '~/composables/sign-detail/business/useSignState';
import { useEarlyEndSign } from '~/composables/sign-detail/business/useEarlyEndSign';


const { item } = defineProps<{
    item: ClassSignDetailInfo;
}>()

const { isTarget1Pass, isTarget2Pass, isTarget3Pass, isBuySuccess } = useSignEndStateComputed(item.evaluateState);
const { isBuyFail } = useSignState();

const isProfit = () => ((item.earningRate ?? 0) > 0);


const { isEarlyEnd, targetText } = useEarlyEndSign(item.evaluateState);
const earlyTimeComputed = computed(() => Date.parseUtcToLocal(item.endEarningTime).format('MM월 dd일 HH:mm'))


</script>