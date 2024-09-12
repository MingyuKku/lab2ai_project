<template>
    <div class="discover-chart-report bg-bg-white pt-space-top-lg pb-space-bottom-lg">
        <div class="title flex items-center justify-between px-primary">
            <div class="left flex items-center">
                <h1 class="text-h2 leading-normal">{{ title }}</h1>
                <div class="relative group ml-1 cursor-pointer">
                    <div class="w-4"><IconObjectInfo /></div>
                    <div class="
                        absolute top-full left-0 w-[200px] bg-bg-white shadow-01 rounded-lg py-1.5 px-2
                        hidden group-hover:block z-10
                    ">
                        <p class="text-cap-1r leading-4 text-justify">최근 1시간 동안 시세나 거래대금의 변동이 큰 코인을 확인하실 수 있습니다. 약 1분 주기로 업데이트되므로 수시로 확인하시면 급변하는 코인 시장의 트랜드에 빠르게 대처하실 수 있습니다.</p>
                    </div>
                </div>
            </div>
            <div class="right text-cap-2m text-font-dark-03">
                {{ computedTime }} {{ navItems.activeFetchParamRankMetaType === 'RANK_META_MARKET_CAPITALIZATION' ? '기준' : '1시간 전 대비' }}
            </div>
        </div>
        <div class="swiper-nav">
            <DiscoverChartReportNav
                :items="navItems"
                :updateActiveIndex="updateActiveIndex"
                :swiperRef="swiperRef"
            />
        </div>
        <div class="swiper-wrap mt-space-top-md">
            <Swiper class="tab-contents-swiper"
                :speed="300"
                :threshold="1"
                @init="initSwiper"
                @slide-change="slideChange"
                @slide-change-transition-start="slideChangeStart"
                @slide-change-transition-end="slideChangeEnd"
            >
                <SwiperSlide
                    v-for="item,idx in navItems.items"
                    :key="idx"
                >
                    <DiscoverChartReportItem
                        v-if="navItems.activeFetchParamRankMetaType === item.fetchParamRankMetaType"
                        :items="rankList"
                        :fetchParamRankMetaType="item.fetchParamRankMetaType"
                        :imageBase="config.public.IMAGE_URL"
                        :numFormat="numberFormat"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useInstance } from '~/composables/_api/useInstance';
import { useFetchDiscoverChart } from '~/composables/discover/chart-report/service/useFetchDiscoverChart';
import { useTabValues } from '~/composables/discover/chart-report/business/useTabValues';
import { useSwiper } from '~/composables/discover/chart-report/business/useSwiper';


defineProps<{
    title: string;
}>();

const config = useRuntimeConfig();

const { rankList, getChartRankList } = useFetchDiscoverChart();
const { navItems, updateActiveIndex } = useTabValues();

const { numberFormat } = useInstance();


await getChartRankList(navItems.activeFetchParamRankMetaType);

const { swiperRef, initSwiper, slideChange, slideChangeStart, slideChangeEnd } = useSwiper({
    navItems,
    updateActiveIndex,
    getChartRankList
});


const computedTime = computed(() => rankList.value ? Date.parseUtcToLocal(rankList.value[0]?.createdAt).format('HH:mm') : undefined)

</script>