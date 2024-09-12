<template>
    <div class="bg-bg-gray-04">
        <div class="flex justify-between py-[8px] px-[12px]">
            <div class="flex">
                <div class="text-cap-1m align-middle"
                    v-for="interval in intervals" :key="interval.value"
                    :class="{
                        'text-black': selectedInterval === interval.value,
                        'text-font-dark-02': selectedInterval !== interval.value,
                        'pl-[4px] pr-[12px]': interval.value === '1',
                        'px-[12px]': interval.value !== '1',

                    }"
                    @click="onClickIntervalButton(interval.value)">
                    {{interval.text}}
                </div>
            </div>
            <div class="exchange-image" v-if="signProfile">
                <NuxtImg
                    v-if="signProfile.exchangeType === 'UPBIT'"
                    src="https://kr.object.ncloudstorage.com/cosign/version2/sign/upbit.png"
                    alt="upbit"
                    width="45" height='18'
                    class="w-[45px] h-[18px]"
                    loading="lazy"
                    format="webp"
                />
                <NuxtImg
                    v-else-if="signProfile.exchangeType === 'BINANCE'"
                    src="https://kr.object.ncloudstorage.com/cosign/version2/sign/binance.png"
                    alt="binance"
                    width="80" height='18'
                    class="w-[80px] h-[18px]"
                    loading="lazy"
                    format="webp"
                />
            </div>
            <!-- <div class="flex items-center bg-white px-[12px] h-[24px]"
                @click="onToggleEarningRateButton">
                <IconObjectEyeOpen v-if="visiblePosition" />
                <IconObjectEyeClose v-else />
                <div class="px-[4px] text-cap-1m">수익률</div>
            </div> -->
        </div>
        <div
            ref="tvChartContainerRef"
            class="sign-detail-tv-tech-chart-view h-[304px] border-b border-border-gray-04"
        ></div>
    </div>
</template>

<script lang="ts" setup>
import type { ClassSignDetailInfo } from '~/composables/sign-detail/service/_types';
import { EInterval } from '~/composables/_tv-tech-chart/_types';
import { useSignDetailCoinChart } from '~/composables/sign-detail/tv-tech-chart/services/useSignDetailCoinChart';
import { createIntervalTexts, getTextByInterval } from '~/composables/_tv-tech-chart/common';

const { signProfile } = defineProps<{
    signProfile: ClassSignDetailInfo,
}>()

const { selectedInterval, visiblePosition, tvChartContainerRef, onToggleEarningRateButton, onClickIntervalButton } = useSignDetailCoinChart(signProfile);
const intervals = [
    EInterval.M1, EInterval.M5, EInterval.M15, EInterval.H1, EInterval.H4,
].map(interval => getTextByInterval(interval));
// const onToggleEarningRateButton = () => {
//     setVisibleEarningRate(!isVisibleEarningRate.value);
// }

// const onClickIntervalButton = (interval: EInterval) => {
//     setInterval(interval);
// }

// onMounted(() => {
//     createChart(signProfile.cryptoId, EInterval.M15);

//     createPositionsBySignProfile(signProfile);
// })

</script>