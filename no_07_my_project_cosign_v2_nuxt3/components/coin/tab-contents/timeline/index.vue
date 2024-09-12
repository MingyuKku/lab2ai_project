<template>
    <div class="coin-detail-tab-contents-timeline pb-space-page-bottom cursor-pointer">
        <div v-for="item,idx in items" :key="item.timelineId" @click="clickTimelineItem(item)" 
            class="border-b border-border-gray-02 last:border-none"
        >
            <CoinTabContentsTimelineItemMarketSensing 
                v-if="item.mainCategory === 'MARKET_DETECT'" 
                :timeline-item="item"
            />
            <CoinTabContentsTimelineItemChartPattern 
                v-else-if="item.mainCategory === 'PATTERN_SCAN'" 
                :timeline-item="item"
            />
            <CoinTabContentsTimelineItemSign 
                v-else-if="item.mainCategory === 'SIGN'" 
                :timeline-item="item"
            />
            <CommonAd
                v-if="idx !== 0 && idx % 10 === 0"
                class="min-h-[100px] bg-bg-white"
                :adsense="{
                    slot: '5903359833',
                    format: 'fluid',
                    layoutKey: '-fb+5w+4e-db+86',
                    style: {
                        'display': 'block',
                    }
                }"
                :adfit="{
                    src: '//t1.daumcdn.net/kas/static/ba.min.js',
                    unit: 'DAN-ej63NXbyErxKNotK',
                    width: '320',
                    height: '100',
                }"
            />
        </div>
    </div>
    <div class="no-signlist bg-bg-white h-[240px] pb-[140px]" v-if="items.length === 0">
        <div class="flex items-center justify-center h-full">
            <div class="w-4 mr-1"><IconObjectInfo /></div>
            <p class="text-cap-1r text-font-dark-02">아직 이 코인에서는 이슈가 발견되지 않았습니다.</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ICryptoTimelineItem } from '~/composables/coin/tab-contents/service/_types';
import { CRYPTO_DETAIL_TIMELINE } from '~/composables/_app/asyncDataFetchKeys';
import { useFetchTimeline } from '~/composables/coin/tab-contents/service/useFetchTimeline';
import type { VisibleTimeRange } from '~/public/charting_library/charting_library';
import type { CryptoDetailPageQueryContentsType } from '~/composables/coin/tab-contents/business/_types';

const { 
    // updateAutoHeight, 
    moveBySeconds 
} = defineProps<{
    // updateAutoHeight: () => void,
    moveBySeconds: (time: number) => Promise<void>,
}>();

const { params, query, name } = useRoute();
const { cryptoid } = params;
const isNewPageLoading = ref<boolean>(false);

const { getCryptoTimeline, getCryptoTimelineNextPage, getCryptoTimelineDetail } = useFetchTimeline();
const dynamicKey = `${CRYPTO_DETAIL_TIMELINE}-${cryptoid}`;
const {
    data: timeline
} = await useAsyncData(
    dynamicKey,
    () => getCryptoTimeline(dynamicKey, cryptoid as string)
)

const items = ref<ICryptoTimelineItem[]>(timeline.value?.cryptoTimeline.cryptoTimelineItems ?? []);
const isLast = ref<boolean>(timeline.value?.cryptoTimeline.isLast ?? true);

watch(timeline, (newValue) => {
    if(newValue) {
        items.value = newValue.cryptoTimeline.cryptoTimelineItems;
        isLast.value = newValue.cryptoTimeline.isLast;
    }
})

const onScroll = async (e: Event) => {
    if(isNewPageLoading.value === false && e.type === "scroll" && isLast.value === false) {
        if(window.scrollY + window.innerHeight >= window.document.body.scrollHeight) {
            isNewPageLoading.value = true;

            const lastTimelineId = items.value[items.value.length - 1].timelineId;

            const newPage = await getCryptoTimelineNextPage(cryptoid as string, lastTimelineId)

            if(newPage) {
                items.value = [...items.value, ...newPage.cryptoTimeline.cryptoTimelineItems]
                isLast.value = newPage.cryptoTimeline.isLast;
            }

            await nextTick();

            // updateAutoHeight();

            isNewPageLoading.value = false;
        }
    }
}

onMounted(() => {
    window.addEventListener("scroll", onScroll);


    const { query } = useRoute();
    const { time } = query;

    console.log(time);
})

onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
})

const clickTimelineItem = async (item: ICryptoTimelineItem) => {
    const data = await getCryptoTimelineDetail(item.mainCategory, item.timelineId);

    if(data?.patternScanTimelineItem) {
        const { query, params: {cryptoid} } = useRoute();
        const { push } = useRouter();

        const tabIndex: CryptoDetailPageQueryContentsType = "pattern";
        const patternId = data.patternScanTimelineItem.patternScanId;

        push({params: {cryptoid, patternid: patternId}, query: {...query, tabIndex}});
        
    } else if(data?.signTimelineItem) {
        const { path } = useRoute();
        const { push } = useRouter();

        push({name: 'modelid-signid', params: {modelid: data?.signTimelineItem.modelId, signid: data?.signTimelineItem.signSubSeqId}});
    } else if(data?.marketDetectTimelineItem) {
        moveBySeconds(new Date(data.marketDetectTimelineItem.detectDateTime).getTime()/1000);
    }
}


</script>