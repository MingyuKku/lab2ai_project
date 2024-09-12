<template>
    <div ref="analysisPatterns" class="chart-analysis-patterns-wrap pt-5">
      <div v-if="patternStat">
         <CoinTabContentsPatternsButtons 
            :buttons="buttons" 
            :selected-button-pattern-id="selectedButtonPatternId"
            :set-pattern-id="setPatternId"
         />
         <div class="px-primary">
            <div class="description mt-4 mb-space-between-y-sm">
               <div class="text-h4">
                  <h1>{{ patternStat.patternName }}</h1>
                  <h1>포착 이후에 시세 변화는 어땠을까요?</h1>
               </div>
               <div class="text-body-5 text-[#9B9B9B] mt-1">
                  <p>이 패턴이 포착된 이후, 과연 각 패턴의 이론대로 상승 또는 하락했을까요?</p>
                  <p>분봉 별 통계 평균과 전체 코인의 통계를 확인해 보세요.</p>
               </div>
            </div>
            <div class="statistics-type clearFix mt-second">
               <div class="flex items-center float-right">
                  <span class="text-cap-1r text-[#707070] mr-1.5">전체 코인 통계</span>
                  <CommonPartsToggle
                     :flag="patternStatType === 'crypto_currency' ? false : true"
                     stickSize="42"
                     stickHeight="22"
                     buttonSize="16"
                     :styleMode="'mode-1'"
                     @click="clickToogle"
                  />
               </div>
            </div>
            <div 
               v-if="patternStat && patternStat.intervalData?.length" 
               class="patterns-rate-bar-wrap mb-2.5"
            >
               <div class="title mb-2">
                  <h1 class="text-h6">전체 포착 {{ numberFormat(patternStat.intervalData[0].intervalCount) }}건</h1>
               </div>
               <CoinTabContentsPatternsRateBars
                  :leftRate="patternStat.intervalData[0].intervalUpRate"
                  :rightRate="patternStat.intervalData[0].intervalDownRate"
               />
            </div>
            <CoinTabContentsPatternsStat 
               :intervalStats="patternStat.intervalData"
               :interval="interval"
               :numFormat="numberFormat"
            />
            <div class="standard-date clearFix mt-3">
               <div class="text-box float-right flex items-center text-cap-1r text-font-dark-02">
                  <span>{{ computedStandardDate }} 기준</span>
                  <div class="flex items-center ml-2"><span class="block w-2 h-2 rounded-[1px] bg-position-long mr-[3px]"></span>상승</div>
                  <div class="flex items-center ml-2"><span class="block w-2 h-2 rounded-[1px] bg-position-short mr-[3px]"></span>하락</div>
               </div>
            </div>
         </div>
      </div>
      <!-- <CoinAnalysisPatternsNoPatterns v-if="patternStat === null" /> -->
   </div>
</template>
<script lang='ts' setup>
import { useInstance } from '~/composables/_api/useInstance';
import type { EInterval } from '~/composables/_tv-tech-chart/_types';
import type { IPatternButton, IPatternStatInfoItem, PatternStatType } from '~/composables/coin/tv-tech-chart/services/_types';

const props = defineProps<{
   patternStat?: IPatternStatInfoItem;
   patternStatType: PatternStatType;
   changePatternStatType: (patternStatType: PatternStatType) => void;
   buttons: IPatternButton[];
   selectedButtonPatternId: number;
   setPatternId: (patternScanId: number) => void;
   interval: EInterval;
}>();

const { numberFormat } = useInstance();

function clickToogle() {
   props.patternStatType === 'crypto_currency' ? props.changePatternStatType('total') : props.changePatternStatType('crypto_currency');
}

const computedStandardDate = computed(() => props.patternStat ? Date.parseUtcToLocal(props.patternStat.standardDate).format('yyyy년 MM월 dd일') : '')

</script>
