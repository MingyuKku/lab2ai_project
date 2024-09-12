<template>
    <div class="sign-on px-primary pt-space-between-y-sm pb-[35px] bg-bg-gray-04">
        <!-- <p>{{ item.evaluateState }}</p>
        <p>{{ item.signStatusType }}</p>
        <p>{{ item.positionType }}</p> -->
        <div class="progress-wrap flex items-center justify-between">
            <SignDetailSignOnProgressLabel
                target="start"
                :label="getProgressLabel('start')"
                :labelClass="getProgressLabelStyleClass('start')"
                :isPriceLabel="false"
            />
            <SignDetailSignOnProgressArrow
                :filledClass="filledArrowStyleClass('start')"
            />
            <SignDetailSignOnProgressLabel
                target="target1"
                :label="getProgressLabel('target1')"
                :labelClass="getProgressLabelStyleClass('target1')"
                :isPriceLabel="!isSuccessTarget1() && !isSuccessTarget2()"
                :price="isSuccessEnter() ? item.targetPrice : item.startPrice"
                :price-tag="item.exchangeType === 'BINANCE' ? 'USDT' : '원'"
                :earning="isSuccessEnter() ? item.targetEarningRate : undefined"
            />
            <SignDetailSignOnProgressArrow
                :filledClass="filledArrowStyleClass('target1')"
            />
            <SignDetailSignOnProgressLabel
                target="target2"
                :label="getProgressLabel('target2')"
                :labelClass="getProgressLabelStyleClass('target2')"
                :isPriceLabel="isSuccessTarget1() && !isSuccessTarget2()"
                :price="item.targetPrice2"
                :price-tag="item.exchangeType === 'BINANCE' ? 'USDT' : '원'"
                :earning="item.targetEarningRate2"
            />
            <SignDetailSignOnProgressArrow
                :filledClass="filledArrowStyleClass('target2')"
            />
            <SignDetailSignOnProgressLabel
                target="target3"
                :label="getProgressLabel('target3')"
                :labelClass="getProgressLabelStyleClass('target3')"
                :isPriceLabel="isSuccessTarget2()"
                :price="item.targetPrice3"
                :price-tag="item.exchangeType === 'BINANCE' ? 'USDT' : '원'"
                :earning="item.targetEarningRate3"
            />
        </div>
        
    </div>
</template>

<script lang="ts" setup>
import type { ClassSignDetailInfo } from '~/composables/sign-detail/service/_types';
import { useSignOnState } from '~/composables/sign-detail/business/useSignOnState';

const { item } = defineProps<{
    item: ClassSignDetailInfo;
}>();


const {
    isSuccessEnter, isSuccessTarget1, isSuccessTarget2,
    getProgressLabel, getProgressLabelStyleClass, filledArrowStyleClass
} = useSignOnState({
    evaluateState: item.evaluateState,
    positionType: item.positionType,
    signStatusType: item.signStatusType,
})


</script>