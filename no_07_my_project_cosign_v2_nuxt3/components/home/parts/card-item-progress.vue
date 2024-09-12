<template>
    <div class="card-item-progress py-3.5">
        <div class="line relative h-4 flex px-primary">
            <div
                class="left flex-1 flex items-center"
                :class="leftBarBackgroundColor"
            >
                <!-- <div v-if="item.evaluateState !== 'sell_wait3'" class="flex-1 flex items-center justify-center"> -->
                <div class="flex-1 flex items-center justify-center">
                    <div
                        v-for="(cnt,idx) in arrowCount" :key="idx"
                        :class="item.evaluateState !== 'sell_wait3' ? `home-sign-progressbar-opacity-change-animation-9step-${idx+1}` : ''"
                        class="relative w-3 h-3 scale-x-75 opacity-20"
                        :style="{
                            'animation-duration': '1500ms'
                        }"
                    >
                        <span
                            class="absolute xy-center text-[11px] text-font-white leading-none"
                        >&#9654;</span>
                    </div>
                </div>
            </div>
            <div
                class="right flex-1 flex items-center"
                :class="rightBarBackgroundColor"
            >
                <div v-if="item.evaluateState === 'sell_wait3'" class="flex-1 flex items-center justify-center">
                    <div
                        v-for="(cnt,idx) in arrowCount" :key="idx"
                        :class="`home-sign-progressbar-opacity-change-animation-9step-${idx+1} opacity-20`"
                        class="relative w-3 h-3 scale-x-75"
                        :style="{
                            'animation-duration': '1500ms'
                        }"
                    >
                        <span
                            class="absolute xy-center text-[11px] text-font-white leading-none"
                        >&#9654;</span>
                    </div>
                </div>
            </div>
            <HomePartsCardItemProgressIcon
                class="start absolute left-0 y-center"
                :iconType="'SUCCESS'"
                :iconColor="(item.positionType && item.positionType === 'SHORT') ? (isBlurComputed && item.tradeType === 'FUTURES') ? '#707A8A' : '#F3475D' : (isBlurComputed && item.tradeType === 'FUTURES') ? '#707A8A' : '#00B287'"
                :shadow="isSuccessTarget1() && !isSuccessTarget2()"
            />
            <HomePartsCardItemProgressIcon
                class="center absolute xy-center"
                :iconType="isWaitTarget3() ? 'SUCCESS' : 'TARGET'"
                :iconColor="item.positionType && item.positionType === 'SHORT' ? (isBlurComputed && item.tradeType === 'FUTURES') ? '#707A8A' : '#F3475D' : (isBlurComputed && item.tradeType === 'FUTURES') ? '#707A8A' : '#00B287'"
                :shadow="isSuccessTarget2()"
            />
            <HomePartsCardItemProgressIcon
                class="end absolute right-0 y-center"
                :iconType="isWaitTarget3() ? 'TARGET' : 'WAIT'"
                :iconColor="isWaitTarget3() ? item.positionType && item.positionType === 'SHORT' ? (isBlurComputed && item.tradeType === 'FUTURES') ? '#707A8A' : '#F3475D' : (isBlurComputed && item.tradeType === 'FUTURES') ? '#707A8A' : '#00B287' : '#EFF1F2'"
            />
        </div>
    </div>
</template>


<script lang="ts" setup>
import { useProgressColor } from '~/composables/home/business/useProgressColor';
import type { ClassHomeSignItem } from '~/composables/home/service/_types';
import { useFuctions } from '~/composables/home/business/useFuctions';
import { isSignBlur } from '~/composables/home/business/_methods';
import { useSignOnState } from '~/composables/sign-detail/business/useSignOnState';

const { item } = defineProps<{
    item: ClassHomeSignItem;
}>();

const arrowCount = 9;

const { isWaitTarget3 } = useFuctions(item.evaluateState);
const { isSuccessTarget1, isSuccessTarget2 } = useSignOnState({
    evaluateState: item.evaluateState
})


const isBlurComputed = computed(() => item.tradeType === 'FUTURES' && isSignBlur(item.pay, item.ticket, item.simpleStatusType));

const {
    leftBarBackgroundColor,
    rightBarBackgroundColor
} = useProgressColor({
    evaluateState: item.evaluateState,
    tradeFuturesPositionType: item.positionType,
    isBlurComputed: isBlurComputed.value,
});


</script>