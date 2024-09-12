<template>
    <div class="no-pattern-ui bg-bg-gray-04">
        <div class="above px-primary pt-space-top-lg pb-space-bottom-lg flex flex-col items-center bg-bg-white">
            <div class="text text-center">
                <h1 class="text-h4 mb-1">포착된 패턴이 없습니다.</h1>
                <p class="text-body-4">패턴포착 알림설정을 하시면</p>
                <p class="text-body-4">패턴이 포착되었을 때 실시간으로 알려드려요.</p>
            </div>
            <div class="button w-full h-12 border-[1.5px] border-border-dark-02 rounded-lg flex items-center justify-center mt-space-top-lg">
                <span class="text-body-2">알림설정 바로가기</span>
                <IconDirectionMd fill="#000000" class="ml-1 -mt-px" />
            </div>
        </div>
        <div class="below px-primary pt-space-top-lg pb-space-bottom-lg bg-bg-white mt-2">
            <h1 class="text-h3">최근 포착된 패턴</h1>
            <div v-if="recentPatterns && recentPatterns.length" class="mt-1">
                <NuxtLink
                    v-for="(pattern,idx) in recentPatterns" :key="pattern.patternScanId"
                    :to="{params: {...params, patternid: pattern.patternScanId}, query: {...query, tabIndex: 'pattern'}}"
                    >
                    <div
                        class="flex items-center justify-between py-3 border-b border-border-gray-04 last:border-none"
                    >
                            <div class="left flex items-center">
                                <div class="w-[55px] py-[5px] rounded border border-border-gray-04 text-center text-cap-1m text-font-dark-01">{{ pattern.intervalTimeText.text }} 봉</div>
                                <p class="text-body-2 ml-2" :class="pattern.patternUpDownStatus === 'UP' ? 'text-position-long-goal-2' : 'text-position-short-goal-3'">{{ pattern.patternName }}</p>
                            </div>
                            <div class="right">
                                <span class="text-cap-1r text-font-dark-03">{{ pattern.patternTimeText }}</span>
                            </div>
                    </div>
                </NuxtLink>
                <div class="mt-space-top-md flex items-center justify-end">
                    <div class="flex items-center">
                        <div class="w-2 h-2 rounded-[1px] bg-position-long-goal-2 mr-1"></div>
                        <span class="text-cap-1r text-font-dark-02">상승 추세</span>
                    </div>
                    <div class="flex items-center ml-2">
                        <div class="w-2 h-2 rounded-[1px] bg-position-short-goal-3 mr-1"></div>
                        <span class="text-cap-1r text-font-dark-02">하락 추세</span>
                    </div>
                </div>
            </div>
            <CoinTabContentsPatternsNoRecentPattern v-else />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useFetchCDCPattern } from '~/composables/coin/tv-tech-chart/services/useFetchCDCPattern';

const { cryptoId } = defineProps<{
    cryptoId: number,
}>();

const { getRecentPattern } = useFetchCDCPattern();
const recentPatterns = await getRecentPattern(cryptoId);

const { params, query } = useRoute();

</script>